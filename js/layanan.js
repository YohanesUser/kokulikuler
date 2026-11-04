/* =========================================================
   layanan.js — katalog layanan NETWARE
   Data layanan disimpan di satu tempat (array SERVICES) agar
   mudah diubah. Harga masih berupa placeholder: ganti sesuai
   daftar harga resmi NETWARE.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Data layanan (ubah di sini) ---------- */
  const CATEGORIES = {
    semua: "Semua",
    percetakan: "Percetakan",
    "servis-hp": "Servis HP",
    "servis-laptop": "Servis Laptop",
    teknologi: "Teknologi Lainnya",
  };

  const SERVICES = [
    {
      id: "cetak-dokumen",
      category: "percetakan",
      icon: "printer",
      title: "Cetak Dokumen Hitam Putih",
      description: "Cetak tugas, makalah, dan dokumen administrasi dengan hasil tajam dan cepat.",
      price: "Rp XX.000",
      unit: "/ lembar",
      details: ["Kertas HVS 70 gram", "Ukuran A4 dan F4", "Bisa cetak bolak-balik", "Estimasi selesai sesuai jumlah halaman"],
    },
    {
      id: "cetak-warna",
      category: "percetakan",
      icon: "palette",
      title: "Cetak Warna",
      description: "Cetak warna untuk presentasi, poster, dan materi promosi dengan warna yang konsisten.",
      price: "Rp XX.000",
      unit: "/ lembar",
      details: ["Kertas HVS atau glossy", "Ukuran A4, A3, dan custom", "Cek warna sebelum cetak massal"],
    },
    {
      id: "jilid",
      category: "percetakan",
      icon: "book",
      title: "Jilid & Laminating",
      description: "Jilid spiral, lakban, hardcover, serta laminating untuk dokumen yang lebih rapi dan awet.",
      price: "Rp XX.000",
      unit: "/ dokumen",
      details: ["Spiral, lakban, dan hardcover", "Laminating doff atau glossy", "Pilihan warna sampul"],
    },
    {
      id: "servis-hp-layar",
      category: "servis-hp",
      icon: "smartphone",
      title: "Ganti Layar HP",
      description: "Penggantian layar retak atau bergaris dengan suku cadang yang sesuai tipe perangkat.",
      price: "Mulai Rp XX.000",
      unit: "",
      details: ["Diagnosa awal gratis", "Suku cadang sesuai merek", "Garansi layanan sesuai ketentuan"],
    },
    {
      id: "servis-hp-baterai",
      category: "servis-hp",
      icon: "battery",
      title: "Ganti Baterai HP",
      description: "Baterai cepat habis atau tidak mengisi? Ganti baterai dengan pengerjaan yang aman.",
      price: "Mulai Rp XX.000",
      unit: "",
      details: ["Pengecekan kesehatan baterai", "Penggantian cepat", "Pengujian ulang perangkat"],
    },
    {
      id: "servis-laptop-software",
      category: "servis-laptop",
      icon: "monitor",
      title: "Install Ulang & Optimasi",
      description: "Instalasi sistem operasi, driver, dan aplikasi, serta optimasi agar laptop kembali lancar.",
      price: "Mulai Rp XX.000",
      unit: "",
      details: ["Backup data sesuai permintaan", "Instalasi driver lengkap", "Pembersihan program yang tidak perlu"],
    },
    {
      id: "servis-laptop-hardware",
      category: "servis-laptop",
      icon: "cpu",
      title: "Perbaikan Hardware Laptop",
      description: "Penanganan kipas, keyboard, engsel, hingga penggantian RAM dan SSD.",
      price: "Mulai Rp XX.000",
      unit: "",
      details: ["Pembersihan kipas dan pasta termal", "Penggantian RAM dan SSD", "Pengecekan komponen"],
    },
    {
      id: "jaringan",
      category: "teknologi",
      icon: "network",
      title: "Instalasi Jaringan",
      description: "Pemasangan dan konfigurasi jaringan LAN dan WiFi untuk rumah, toko, hingga kantor.",
      price: "Hubungi Kami",
      unit: "",
      details: ["Survei lokasi", "Konfigurasi router dan access point", "Pengujian kecepatan"],
    },
    {
      id: "cctv",
      category: "teknologi",
      icon: "camera",
      title: "Pemasangan CCTV",
      description: "Instalasi kamera pengawas beserta pengaturan akses jarak jauh melalui ponsel.",
      price: "Hubungi Kami",
      unit: "",
      details: ["Survei titik pemasangan", "Pengaturan akses jarak jauh", "Kabel dan instalasi rapi"],
    },
    {
      id: "pembuatan-web",
      category: "teknologi",
      icon: "globe",
      title: "Pembuatan Website",
      description: "Website profil, katalog, atau layanan yang responsif dan mudah dikelola.",
      price: "Hubungi Kami",
      unit: "",
      details: ["Desain responsif", "Optimasi kecepatan", "Panduan pengelolaan konten"],
    },
  ];

  /* ---------- 2. Ikon SVG (Lucide-style, ditulis manual) ---------- */
  const ICONS = {
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2a10 10 0 1 0 0 20 2 2 0 0 0 1.5-3.3 2 2 0 0 1 1.5-3.7H19a3 3 0 0 0 3-3c0-5.5-4.5-10-10-10z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    battery: '<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 11v2"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    network: '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
    camera: '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  };

  function iconSvg(name) {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.globe}</svg>`;
  }

  /* ---------- 3. Elemen DOM ---------- */
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

  /* ---------- 4. Render filter kategori ---------- */
  function renderFilters() {
    filterWrap.innerHTML = "";
    Object.entries(CATEGORIES).forEach(([key, label]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn" + (key === activeCategory ? " active" : "");
      btn.textContent = label;
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

  /* ---------- 5. Render kartu layanan (dengan pencarian + filter) ---------- */
  function matches(service) {
    const inCategory = activeCategory === "semua" || service.category === activeCategory;
    const q = keyword.trim().toLowerCase();
    const inKeyword =
      !q ||
      service.title.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      CATEGORIES[service.category].toLowerCase().includes(q);
    return inCategory && inKeyword;
  }

  function highlight(text) {
    const q = keyword.trim();
    if (!q) return escapeHtml(text);
    const safe = escapeRegExp(q);
    return escapeHtml(text).replace(new RegExp(`(${safe})`, "gi"), "<mark>$1</mark>");
  }

  function renderServices() {
    const visible = SERVICES.filter(matches);
    grid.innerHTML = "";

    visible.forEach((service, index) => {
      const card = document.createElement("article");
      card.className = `card service-card reveal visible`;
      card.style.transitionDelay = `${Math.min(index * 0.05, 0.4)}s`;
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Lihat detail ${service.title}`);
      card.innerHTML = `
        <div class="card-icon">${iconSvg(service.icon)}</div>
        <span class="tag">${escapeHtml(CATEGORIES[service.category])}</span>
        <h3>${highlight(service.title)}</h3>
        <p>${highlight(service.description)}</p>
        <div class="price">${escapeHtml(service.price)}${service.unit ? `<span>${escapeHtml(service.unit)}</span>` : ""}</div>
        <div class="detail-hint">Klik untuk detail &rarr;</div>`;

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
    resultCount.textContent = `Menampilkan ${visible.length} dari ${SERVICES.length} layanan`;
  }

  /* ---------- 6. Pencarian ---------- */
  let searchTimer = null;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      keyword = e.target.value;
      renderServices();
    }, 180); // debounce agar tidak render setiap ketukan
  });

  /* ---------- 7. Modal detail layanan ---------- */
  function openModal(service, trigger) {
    lastFocused = trigger || document.activeElement;
    document.getElementById("modal-title").textContent = service.title;
    document.getElementById("modal-category").textContent = CATEGORIES[service.category];
    document.getElementById("modal-desc").textContent = service.description;
    document.getElementById("modal-price").innerHTML =
      `${escapeHtml(service.price)}${service.unit ? ` <small>${escapeHtml(service.unit)}</small>` : ""}`;

    const list = document.getElementById("modal-list");
    list.innerHTML = service.details.map((d) => `<li>${escapeHtml(d)}</li>`).join("");

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

  /* ---------- 8. Utilitas keamanan teks ---------- */
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

  /* ---------- Inisialisasi ---------- */
  renderFilters();
  renderServices();
})();