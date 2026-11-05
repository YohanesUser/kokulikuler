/* =========================================================
   main.js — fungsi umum seluruh halaman NETWARE
   Meliputi: tema terang/gelap (default terang), loader halaman,
   menu responsif, progress scroll, tombol kembali ke atas,
   notifikasi (toast), dan tahun otomatis.
   Form kontak ditangani sepenuhnya oleh kontak.js.
   Palet: #167D94 · #266594 · #335095
   ========================================================= */

(function () {
  "use strict";

  const THEME_KEY = "netware-theme";
  const root = document.documentElement;
  const header = document.querySelector(".site-header");

  /* ---------- 1. Notifikasi (toast) ---------- */
  // Dipakai global oleh halaman lain: window.showToast(pesan, tipe, durasi)
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

  /* ---------- 2. Tema: default terang (palet NETWARE) ---------- */
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
    // Default selalu terang. Mode gelap hanya aktif jika pengguna memilihnya sendiri.
    applyTheme(saved === "dark" ? "dark" : "light");

    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* abaikan */ }
      showToast(next === "dark" ? "Mode gelap aktif" : "Mode terang aktif", "success", 2000);
    });
  }

  /* ---------- 3. Loader halaman ---------- */
  function initLoader() {
    const loader = document.querySelector(".page-loader");
    if (!loader) return;
    const hide = () => setTimeout(() => loader.classList.add("done"), 300);
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);
  }

  /* ---------- 4. Menu navigasi responsif ---------- */
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
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- 5. Header, progress bar & tombol kembali ke atas ---------- */
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

  /* ---------- 6. Tahun otomatis di footer ---------- */
  function setYear() {
    document.querySelectorAll(".current-year").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Inisialisasi ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLoader();
    initMenu();
    markActiveLink();
    initScrollEffects();
    setYear();
  });
})();