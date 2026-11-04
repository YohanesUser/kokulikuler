/* =========================================================
   animasi.js — animasi NETWARE
   Meliputi: loader halaman, animasi reveal saat digulir,
   penghitung angka statistik, dan efek ripple pada tombol.
   ========================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Loader halaman ---------- */
  function hideLoader() {
    const loader = document.querySelector(".page-loader");
    if (!loader) return;
    loader.classList.add("done");
    loader.addEventListener("transitionend", () => loader.remove(), { once: true });
  }

  /* ---------- 2. Reveal saat digulir ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animasi hanya sekali
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- 3. Penghitung angka statistik ---------- */
  // Penanda: <span class="stat-number" data-count="12">0</span>
  function animateCount(el) {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easing out cubic
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ---------- 4. Efek ripple pada tombol ---------- */
  function initRipple() {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (prefersReducedMotion) return;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
      });
    });
  }

  /* ---------- Inisialisasi ---------- */
  window.addEventListener("load", hideLoader);
  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initCounters();
    initRipple();
    // Jika loader belum tertutup setelah 2 detik (mis. resource lambat), tutup paksa
    setTimeout(hideLoader, 2000);
  });
})();