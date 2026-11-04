/* =========================================================
   main.js — fungsi umum seluruh halaman NETWARE
   Meliputi: menu responsif, tema gelap/terang, progress scroll,
   tombol kembali ke atas, notifikasi (toast), validasi formulir.
   ========================================================= */

(function () {
  "use strict";

  const THEME_KEY = "netware-theme";
  const root = document.documentElement;
  const header = document.querySelector(".site-header");

  /* ---------- 1. Notifikasi (toast) ---------- */
  // Dipakai global oleh halaman lain: window.showToast(pesan, tipe)
  function showToast(message, type = "info", duration = 3500) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("hide");
      toast.addEventListener("animationend", () => toast.remove(), { once: true });
    }, duration);
  }
  window.showToast = showToast;

  /* ---------- 2. Tema gelap / terang ---------- */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      const isDark = theme === "dark";
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute("aria-label", isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
    }
  }

  function initTheme() {
    let saved = null;
    try {
      // Hanya menyimpan preferensi tampilan, bukan data penting.
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {
      saved = null;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));

    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* abaikan */ }
      showToast(next === "dark" ? "Mode gelap aktif" : "Mode terang aktif", "success", 2000);
    });
  }

  /* ---------- 3. Menu navigasi responsif ---------- */
  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      toggle.querySelector(".icon-menu").classList.toggle("hidden", open);
      toggle.querySelector(".icon-close").classList.toggle("hidden", !open);
    };

    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 860) setOpen(false); });
  }

  // Tandai tautan yang sesuai dengan halaman aktif
  function markActiveLink() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      const target = link.getAttribute("href");
      if (target === current) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- 4. Header, progress bar & tombol kembali ke atas ---------- */
  function initScrollEffects() {
    const progress = document.querySelector(".scroll-progress");
    const backTop = document.querySelector(".back-to-top");

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progress) progress.style.width = `${percent}%`;
      if (header) header.classList.toggle("scrolled", scrollTop > 10);
      if (backTop) backTop.classList.toggle("show", scrollTop > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backTop) {
      backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }

  /* ---------- 5. Validasi formulir kontak ---------- */
  const validators = {
    nama: (v) => (v.trim().length >= 3 ? "" : "Nama minimal 3 karakter."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Masukkan alamat email yang valid."),
    telepon: (v) => (/^(\+62|62|0)[0-9]{8,13}$/.test(v.replace(/[\s-]/g, "")) ? "" : "Nomor telepon tidak valid (contoh: 0812xxxxxxx)."),
    layanan: (v) => (v ? "" : "Pilih jenis layanan."),
    pesan: (v) => (v.trim().length >= 10 ? "" : "Pesan minimal 10 karakter."),
  };

  function validateField(field) {
    const group = field.closest(".form-group");
    const rule = validators[field.name];
    if (!rule || !group) return true;

    const message = rule(field.value);
    const errorEl = group.querySelector(".error-msg");
    group.classList.toggle("invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (errorEl) errorEl.textContent = message;
    return !message;
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    // Isi otomatis jenis layanan jika datang dari tombol "Pesan Layanan" (kontak.html?layanan=id)
    const presetService = new URLSearchParams(window.location.search).get("layanan");
    const serviceSelect = form.querySelector("#layanan");
    if (presetService && serviceSelect && [...serviceSelect.options].some((o) => o.value === presetService)) {
      serviceSelect.value = presetService;
      showToast("Layanan dipilih otomatis. Lengkapi data Anda di bawah.", "info", 3000);
    }

    // Validasi saat pengguna meninggalkan kolom isian
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".form-group").classList.contains("invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll("input, select, textarea")];
      const results = fields.map(validateField);
      const firstInvalid = fields.find((f) => f.closest(".form-group").classList.contains("invalid"));

      if (results.every(Boolean)) {
        const btn = form.querySelector('button[type="submit"]');
        const label = btn.querySelector(".btn-label");
        btn.disabled = true;
        label.textContent = "Mengirim...";

        // Simulasi pengiriman (tanpa backend). Ganti dengan integrasi sesuai kebutuhan.
        setTimeout(() => {
          showToast("Pesan Anda berhasil dikirim. Tim NETWARE akan segera menghubungi Anda.", "success", 4500);
          form.reset();
          fields.forEach((f) => f.closest(".form-group").classList.remove("invalid"));
          btn.disabled = false;
          label.textContent = "Kirim Pesan";
        }, 1200);
      } else {
        showToast("Mohon periksa kembali isian formulir.", "error");
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  /* ---------- 6. Tahun otomatis di footer ---------- */
  function setYear() {
    document.querySelectorAll(".current-year").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Inisialisasi ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMenu();
    markActiveLink();
    initScrollEffects();
    initContactForm();
    setYear();
  });
})();