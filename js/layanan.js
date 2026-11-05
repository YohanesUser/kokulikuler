/* =========================================================
   layanan.js — katalog layanan NETWARE (id & en)
   Data layanan ada di satu tempat (array SERVICES).
   Bahasa mengikuti pilihan di localStorage (netware-lang)
   dan diperbarui saat event "langchange" dari i18n.js.
   ========================================================= */

(function () {
  "use strict";

  const LANG_KEY = "netware-lang";

  /* ---------- 1. Teks antarmuka ---------- */
  const UI = {
    id: {
      all: "Semua",
      from: "Mulai",
      clickDetail: "Klik untuk detail",
      viewDetail: "Lihat detail",
      closeDetail: "Tutup detail",
      count: (n, total) => `Menampilkan ${n} dari ${total} layanan`,
    },
    en: {
      all: "All",
      from: "From",
      clickDetail: "Click for details",
      viewDetail: "View details of",
      closeDetail: "Close details",
      count: (n, total) => `Showing ${n} of ${total} services`,
    },
  };

  /* ---------- 2. Kategori ---------- */
  const CATEGORIES = {
    semua: { id: "Semua", en: "All" },
    percetakan: { id: "Percetakan", en: "Printing" },
    "servis-hp": { id: "Servis HP", en: "Phone Repair" },
    "servis-laptop": { id: "Servis Laptop", en: "Laptop Repair" },
    teknologi: { id: "Teknologi Lainnya", en: "Other Tech" },
  };

  /* ---------- 3. Data layanan (ubah di sini) ---------- */
  const SERVICES = [
    {
      id: "cetak-dokumen",
      category: "percetakan",
      icon: "printer",
      title: { id: "Cetak Dokumen Hitam Putih", en: "Black & White Document Printing" },
      description: {
        id: "Cetak tugas, makalah, dan dokumen administrasi dengan hasil tajam dan cepat.",
        en: "Print assignments, papers, and administrative documents with sharp results and fast turnaround.",
      },
      price: "Rp 500",
      unit: { id: "/ lembar", en: "/ sheet" },
      details: {
        id: ["Kertas HVS 70 gram", "Ukuran A4 dan F4", "Bisa cetak bolak-balik", "Estimasi selesai sesuai jumlah halaman"],
        en: ["HVS 70 gsm paper", "A4 and F4 sizes", "Double-sided printing available", "Completion time based on page count"],
      },
    },
    {
      id: "cetak-warna",
      category: "percetakan",
      icon: "palette",
      title: { id: "Cetak Warna", en: "Color Printing" },
      description: {
        id: "Cetak warna untuk presentasi, poster, dan materi promosi dengan warna yang konsisten.",
        en: "Color printing for presentations, posters, and promotional materials with consistent colors.",
      },
      price: "Rp 1.000",
      unit: { id: "/ lembar", en: "/ sheet" },
      details: {
        id: ["Kertas HVS atau glossy", "Ukuran A4, A3, dan custom", "Cek warna sebelum cetak massal"],
        en: ["HVS or glossy paper", "A4, A3, and custom sizes", "Color check before mass printing"],
      },
    },
    {
      id: "jilid",
      category: "percetakan",
      icon: "book",
      title: { id: "Jilid & Laminating", en: "Binding & Lamination" },
      description: {
        id: "Jilid spiral, lakban, hardcover, serta laminating untuk dokumen yang lebih rapi dan awet.",
        en: "Spiral binding, tape binding, hardcover, and lamination for neater, more durable documents.",
      },
      price: "Rp 5.000",
      unit: { id: "/ dokumen", en: "/ document" },
      details: {
        id: ["Jilid spiral, lakban, dan hardcover", "Laminating doff atau glossy", "Pilihan warna sampul"],
        en: ["Spiral, tape, and hardcover binding", "Matte or glossy lamination", "Cover color options"],
      },
    },
    {
      id: "servis-hp-layar-ip",
      category: "servis-hp",
      icon: "smartphone",
      title: { id: "Ganti LCD iPhone", en: "iPhone LCD Replacement" },
      description: {
        id: "Penggantian layar retak atau bergaris dengan suku cadang yang sesuai tipe perangkat.",
        en: "Replacing cracked or lined screens with parts matched to the device model.",
      },
      price: "Rp 150.000",
      from: true,
      unit: null,
      details: {
        id: ["Diagnosa awal gratis", "Suku cadang sesuai merek", "Garansi layanan sesuai ketentuan"],
        en: ["Free initial diagnosis", "Parts matched to brand", "Service warranty per terms"],
      },
    },
    {
      id: "servis-hp-layar-android",
      category: "servis-hp",
      icon: "smartphone",
      title: { id: "Ganti LCD Android", en: "Android LCD Replacement" },
      description: {
        id: "Penggantian layar retak atau bergaris dengan suku cadang yang sesuai tipe perangkat.",
        en: "Replacing cracked or lined screens with parts matched to the device model.",
      },
      price: "Rp 75.000",
      from: true,
      unit: null,
      details: {
        id: ["Diagnosa awal gratis", "Suku cadang sesuai merek", "Garansi layanan sesuai ketentuan"],
        en: ["Free initial diagnosis", "Parts matched to brand", "Service warranty per terms"],
      },
    },
    {
      id: "servis-hp-konnektor-charger",
      category: "servis-hp",
      icon: "smartphone",
      title: { id: "Ganti Konektor Board Charger Android", en: "Android Charger Board Connector Replacement" },
      description: {
        id: "Penggantian konektor charger yang rusak atau longgar.",
        en: "Replacing a damaged or loose charging connector.",
      },
      price: "Rp 75.000",
      from: true,
      unit: null,
      details: {
        id: ["Ganti konektor charger sesuai tipe perangkat", "Pengecekan fungsi pengisian daya", "Garansi layanan sesuai ketentuan"],
        en: ["Charger connector replacement matched to device type", "Charging function check", "Service warranty per terms"],
      },
    },
    {
      id: "servis-hp-baterai",
      category: "servis-hp",
      icon: "battery",
      title: { id: "Ganti Baterai HP", en: "Phone Battery Replacement" },
      description: {
        id: "Baterai cepat habis atau tidak mengisi? Ganti baterai dengan pengerjaan yang aman.",
        en: "Battery draining fast or not charging? Replace it with safe handling.",
      },
      price: "Rp 80.000",
      from: true,
      unit: null,
      details: {
        id: ["Pengecekan kesehatan baterai", "Penggantian cepat", "Pengujian ulang perangkat"],
        en: ["Battery health check", "Quick replacement", "Device retest"],
      },
    },
    {
      id: "servis-hp-flas",
      category: "servis-hp",
      icon: "smartphone",
      title: { id: "Jasa Flashing & Unlock HP", en: "Phone Flashing & Unlock Service" },
      description: {
        id: "Flashing dan unlock perangkat HP dengan layanan profesional.",
        en: "Professional phone flashing and unlocking.",
      },
      price: "Rp 100.000",
      from: true,
      unit: null,
      details: {
        id: ["Penghapusan virus dan malware", "Unlock jaringan sesuai permintaan", "Backup data sesuai permintaan"],
        en: ["Virus and malware removal", "Network unlock on request", "Data backup on request"],
      },
    },
    {
      id: "servis-laptop-software",
      category: "servis-laptop",
      icon: "monitor",
      title: { id: "Install Ulang & Optimasi", en: "Reinstall & Optimization" },
      description: {
        id: "Instalasi sistem operasi, driver, dan aplikasi, serta optimasi agar laptop kembali lancar.",
        en: "OS, driver, and app installation, plus optimization to make your laptop run smoothly again.",
      },
      price: "Rp 70.000",
      from: true,
      unit: null,
      details: {
        id: ["Backup data sesuai permintaan", "Instalasi driver lengkap", "Pembersihan program yang tidak perlu"],
        en: ["Data backup on request", "Full driver installation", "Removal of unnecessary programs"],
      },
    },
    {
      id: "servis-laptop-hardware",
      category: "servis-laptop",
      icon: "cpu",
      title: { id: "Perbaikan Hardware Laptop", en: "Laptop Hardware Repair" },
      description: {
        id: "Penanganan kipas, keyboard, engsel, hingga penggantian RAM dan SSD.",
        en: "Handling fans, keyboards, hinges, and RAM and SSD replacement.",
      },
      price: "Rp 350.000",
      from: true,
      unit: null,
      details: {
        id: ["Pembersihan kipas dan pasta termal", "Penggantian RAM dan SSD", "Pengecekan komponen"],
        en: ["Fan cleaning and thermal paste", "RAM and SSD replacement", "Component check"],
      },
    },
    {
      id: "servis-laptop-pasta",
      category: "servis-laptop",
      icon: "cpu",
      title: { id: "Pembersihan & Re-Pasta Laptop", en: "Laptop Cleaning & Re-Paste" },
      description: {
        id: "Repasta termal untuk mengatasi panas berlebih dan meningkatkan performa laptop, serta membersihkan kipas dari debu dan kotoran.",
        en: "Thermal paste replacement to fix overheating and improve performance, plus cleaning dust from the fan.",
      },
      price: "Rp 100.000",
      from: true,
      unit: null,
      details: {
        id: ["Pembersihan kipas dan pasta termal", "Pengecekan komponen"],
        en: ["Fan and thermal paste cleaning", "Component check"],
      },
    },
    {
      id: "instalasi-keyboard",
      category: "servis-laptop",
      icon: "keyboard",
      title: { id: "Pemasangan Keyboard Laptop / Optimalisasi Keyboard", en: "Laptop Keyboard Installation / Keyboard Optimization" },
      description: {
        id: "Instalasi ulang keyboard dengan konfigurasi optimal.",
        en: "Keyboard reinstallation with optimal configuration.",
      },
      price: "Rp 150.000",
      from: true,
      unit: null,
      details: {
        id: ["Penggantian keyboard sesuai tipe laptop", "Pengecekan fungsi tombol", "Kalibrasi backlight jika ada"],
        en: ["Keyboard replacement matched to laptop type", "Key function check", "Backlight calibration if available"],
      },
    },
    {
      id: "instalasi-hdd-ssd",
      category: "servis-laptop",
      icon: "cpu",
      title: { id: "Jasa Upgrade HDD/SSD Laptop", en: "Laptop HDD/SSD Upgrade" },
      description: {
        id: "Instalasi ulang HDD atau SSD dengan konfigurasi optimal.",
        en: "HDD or SSD reinstallation with optimal configuration.",
      },
      price: "Rp 150.000",
      from: true,
      unit: null,
      details: {
        id: ["Penggantian HDD/SSD sesuai tipe laptop", "Pengecekan deteksi drive", "Migrasi data sesuai permintaan"],
        en: ["HDD/SSD replacement matched to laptop type", "Drive detection check", "Data migration on request"],
      },
    },
    {
      id: "instalasi-ram",
      category: "servis-laptop",
      icon: "cpu",
      title: { id: "Pemasangan RAM Laptop / Optimalisasi RAM", en: "Laptop RAM Installation / RAM Optimization" },
      description: {
        id: "Instalasi ulang RAM dengan konfigurasi optimal.",
        en: "RAM reinstallation with optimal configuration.",
      },
      price: "Rp 50.000",
      from: true,
      unit: null,
      details: {
        id: ["Penggantian RAM sesuai tipe laptop", "Pengecekan deteksi memori", "Pengecekan performa"],
        en: ["RAM replacement matched to laptop type", "Memory detection check", "Performance check"],
      },
    },
    {
      id: "instalasi-lcd-laptop",
      category: "servis-laptop",
      icon: "monitor",
      title: { id: "Pemasangan LCD Laptop / Optimalisasi LCD", en: "Laptop LCD Installation / LCD Optimization" },
      description: {
        id: "Instalasi ulang LCD dengan konfigurasi optimal.",
        en: "LCD reinstallation with optimal configuration.",
      },
      price: "Rp 200.000",
      from: true,
      unit: null,
      details: {
        id: ["Penggantian LCD sesuai tipe laptop", "Pengecekan fungsi layar", "Kalibrasi backlight jika ada"],
        en: ["LCD replacement matched to laptop type", "Display function check", "Backlight calibration if available"],
      },
    },
  ];

  /* ---------- 4. Ikon SVG ---------- */
  const ICONS = {
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2a10 10 0 1 0 0 20 2 2 0 0 0 1.5-3.3 2 2 0 0 1 1.5-3.7H19a3 3 0 0 0 3-3c0-5.5-4.5-10-10-10z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    battery: '<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 11v2"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  };

  /* ---------- 5. Helper ---------- */
  function lang() {
    try {
      return localStorage.getItem(LANG_KEY) === "en" ? "en" : "id";
    } catch (e) {
      return "id";
    }
  }

  function L(value) {
    // value berupa objek { id, en } atau string biasa
    if (value && typeof value === "object") return value[lang()] || value.id;
    return value;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function iconSvg(name) {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.globe}</svg>`;
  }

  /* ---------- 6. Elemen DOM ---------- */
  const grid = document.getElementById("service-grid");
  if (!grid) return; // Skrip ini hanya untuk halaman layanan

  const searchInput = document.getElementById("service-search");
  const filterWrap = document.getElementById("service-filters");
  const emptyState = document.getElementById("service-empty");
  const resultCount = document.getElementById("service-count");
  const modal = document.getElementById("service-modal");

  let activeCategory = "semua";
  let keyword = "";
  let lastFocused = null;

  /* ---------- 7. Render filter kategori ---------- */
  function renderFilters() {
    filterWrap.innerHTML = "";
    Object.entries(CATEGORIES).forEach(([key, label]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn" + (key === activeCategory ? " active" : "");
      btn.textContent = L(label);
      btn.dataset.category = key;
      btn.setAttribute("aria-pressed", String(key === activeCategory));
      btn.addEventListener("click", () => {
        activeCategory = key;
        renderFilters();
        renderServices();
      });
      filterWrap.appendChild(btn);
    });
  }

  /* ---------- 8. Pencarian & kartu ---------- */
  function matches(service) {
    const inCategory = activeCategory === "semua" || service.category === activeCategory;
    const q = keyword.trim().toLowerCase();
    const inKeyword =
      !q ||
      L(service.title).toLowerCase().includes(q) ||
      L(service.description).toLowerCase().includes(q) ||
      L(CATEGORIES[service.category]).toLowerCase().includes(q);
    return inCategory && inKeyword;
  }

  function highlight(text) {
    const q = keyword.trim();
    if (!q) return escapeHtml(text);
    const safe = escapeRegExp(q);
    return escapeHtml(text).replace(new RegExp(`(${safe})`, "gi"), "<mark>$1</mark>");
  }

  function priceText(service) {
    const price = service.from ? `${L({ id: "Mulai", en: "From" })} ${service.price}` : service.price;
    return price;
  }

  function renderServices() {
    const visible = SERVICES.filter(matches);
    const ui = UI[lang()];
    grid.innerHTML = "";

    visible.forEach((service, index) => {
      const title = L(service.title);
      const card = document.createElement("article");
      card.className = "card service-card reveal visible";
      card.style.transitionDelay = `${Math.min(index * 0.05, 0.4)}s`;
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${ui.viewDetail} ${title}`);
      card.innerHTML = `
        <div class="card-icon">${iconSvg(service.icon)}</div>
        <span class="tag">${escapeHtml(L(CATEGORIES[service.category]))}</span>
        <h3>${highlight(title)}</h3>
        <p>${highlight(L(service.description))}</p>
        <div class="price">${escapeHtml(priceText(service))}${service.unit ? `<span>${escapeHtml(L(service.unit))}</span>` : ""}</div>
        <div class="detail-hint">${escapeHtml(ui.clickDetail)} &rarr;</div>`;

      card.addEventListener("click", () => openModal(service, card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(service, card);
        }
      });
      grid.appendChild(card);
    });

    emptyState.classList.toggle("show", visible.length === 0);
    resultCount.textContent = ui.count(visible.length, SERVICES.length);
  }

  /* ---------- 9. Pencarian dengan debounce ---------- */
  let searchTimer = null;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      keyword = e.target.value;
      renderServices();
    }, 180);
  });

  /* ---------- 10. Modal detail ---------- */
  function openModal(service, trigger) {
    lastFocused = trigger || document.activeElement;
    document.getElementById("modal-title").textContent = L(service.title);
    document.getElementById("modal-category").textContent = L(CATEGORIES[service.category]);
    document.getElementById("modal-desc").textContent = L(service.description);
    document.getElementById("modal-price").innerHTML =
      `${escapeHtml(priceText(service))}${service.unit ? ` <small>${escapeHtml(L(service.unit))}</small>` : ""}`;

    const list = document.getElementById("modal-list");
    list.innerHTML = L(service.details).map((d) => `<li>${escapeHtml(d)}</li>`).join("");

    const orderLink = document.getElementById("modal-order");
    orderLink.href = `kontak.html?layanan=${encodeURIComponent(service.id)}`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest(".modal-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  /* ---------- 11. Ganti bahasa saat tombol EN/ID ditekan ---------- */
  document.addEventListener("langchange", () => {
    renderFilters();
    renderServices();
  });

  /* ---------- Inisialisasi ---------- */
  renderFilters();
  renderServices();
})();