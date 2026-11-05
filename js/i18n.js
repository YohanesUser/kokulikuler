/* =========================================================
   i18n.js — pilihan bahasa Indonesia (id) dan English (en)
   Teks diganti berdasarkan atribut data-i18n di HTML.
   Pilihan bahasa disimpan di localStorage (netware-lang).
   Mengirim event "langchange" agar layanan.js dan kontak.js ikut berganti.
   ========================================================= */

(function () {
  "use strict";

  const LANG_KEY = "netware-lang";

  const DICT = {
    id: {
      "brand.sub": "Unit Produksi TKJ SMKN 1 Bantul",
      "nav.home": "Beranda",
      "nav.profile": "Profil",
      "nav.services": "Layanan",
      "nav.partner": "Kerja Sama",
      "nav.contact": "Kontak",
      "lang.toggle": "Ganti ke English",
      "common.skip": "Lewati ke konten",
      "common.toTop": "Kembali ke atas",
      "footer.desc": "Unit Produksi Teknik Komputer dan Jaringan, SMK Negeri 1 Bantul, Daerah Istimewa Yogyakarta.",
      "footer.menu": "Menu",
      "footer.other": "Lainnya",
      "footer.rights": "Hak cipta dilindungi.",
      "hero.eyebrow": "Unit Produksi Teknik Komputer & Jaringan",
      "hero.title": 'Solusi Teknologi <span>Terpercaya</span> dari Siswa TKJ',
      "hero.desc": "NETWARE melayani percetakan, servis HP, servis laptop, hingga instalasi jaringan dan CCTV, dikerjakan dengan standar profesional oleh tim SMK Negeri 1 Bantul.",
      "hero.btn.services": "Lihat Layanan",
      "hero.btn.contact": "Hubungi Kami",
      "hero.card.phone": '<strong>Servis HP</strong><span>Layar &amp; baterai</span>',
      "hero.card.laptop": '<strong>Servis Laptop</strong><span>Install ulang &amp; upgrade</span>',
      "hero.card.print": '<strong>Percetakan</strong><span>Cetak &amp; jilid dokumen</span>',
      "cta.send": "Kirim Pesan",
      "intro.eyebrow": "Tentang NETWARE",
      "intro.title": "Belajar Sambil Melayani",
      "intro.desc": "NETWARE adalah unit produksi di bawah program keahlian Teknik Komputer dan Jaringan. Di sini, siswa menerapkan ilmu yang dipelajari di kelas untuk melayani kebutuhan nyata masyarakat.",
      "intro.c1.title": "Kualitas Terjaga",
      "intro.c1.desc": "Setiap pekerjaan dikerjakan dengan prosedur yang jelas dan diperiksa sebelum diserahkan.",
      "intro.c2.title": "Pengerjaan Cepat",
      "intro.c2.desc": "Estimasi waktu disampaikan sejak awal sehingga Anda tahu kapan barang siap diambil.",
      "intro.c3.title": "Melayani dengan Hati",
      "intro.c3.desc": "Penjelasan yang jujur dan ramah, tanpa tekanan untuk membeli layanan yang tidak Anda butuhkan.",
      "feat.eyebrow": "Layanan Unggulan",
      "feat.title": "Apa yang Bisa Kami Bantu?",
      "feat.desc": "Pilihan layanan utama NETWARE TKJ. Lihat katalog lengkap untuk daftar harga dan detailnya.",
      "feat.c1.tag": "Percetakan",
      "feat.c1.title": "Cetak & Jilid Dokumen",
      "feat.c1.desc": "Cetak tugas, presentasi, poster, serta jilid spiral, lakban, dan laminating.",
      "feat.c2.tag": "Servis HP",
      "feat.c2.title": "Ganti Layar & Baterai",
      "feat.c2.desc": "Perbaikan layar retak dan baterai boros dengan suku cadang yang sesuai tipe perangkat.",
      "feat.c3.tag": "Servis Laptop",
      "feat.c3.title": "Install Ulang & Upgrade",
      "feat.c3.desc": "Instalasi sistem operasi, driver, optimasi, serta penggantian RAM dan SSD.",
      "feat.more": "Lihat detail",
      "stat.1": "Pelanggan Terlayani",
      "stat.2": "Perangkat Diperbaiki",
      "stat.3": "Pelanggan Puas",
      "cta.title": "Butuh Bantuan Teknologi?",
      "cta.desc": "Ceritakan kebutuhan Anda. Tim NETWARE siap membantu memberikan solusi yang tepat.",

      "prof.hero.title": 'Mengenal <span class="text-gradient" style="color:#fff">NETWARE</span>',
      "prof.hero.desc": "Unit produksi yang menjadi wadah praktik nyata bagi siswa Teknik Komputer dan Jaringan SMK Negeri 1 Bantul.",
      "prof.about.eyebrow": "Tentang Kami",
      "prof.about.title": "Tempat Siswa Menjadi Profesional",
      "prof.about.p1": "NETWARE lahir dari kebutuhan untuk menghubungkan teori yang diajarkan di kelas dengan pekerjaan nyata. Setiap layanan yang kami tawarkan dikerjakan oleh siswa di bawah bimbingan guru pembimbing, sehingga kualitas dan tanggung jawab tetap terjaga.",
      "prof.about.p2": "Kami percaya keterampilan terbaik tumbuh ketika dipakai untuk membantu orang lain, dari cetak dokumen sederhana hingga instalasi jaringan yang kompleks.",
      "prof.c1.title": "Pembelajaran",
      "prof.c1.desc": "Praktik langsung untuk siswa TKJ.",
      "prof.c2.title": "Keterampilan",
      "prof.c2.desc": "Perbaikan, instalasi, dan konfigurasi.",
      "prof.c3.title": "Tim",
      "prof.c3.desc": "Siswa dan guru pembimbing yang kompak.",
      "prof.c4.title": "Pertumbuhan",
      "prof.c4.desc": "Terus berkembang mengikuti kebutuhan.",
      "prof.hist.eyebrow": "Sejarah",
      "prof.hist.title": "Perjalanan NETWARE",
      "prof.hist.desc": "Lengkapi tahun dan tonggak sejarah sesuai data resmi sekolah.",
      "prof.h1.year": "[2023]",
      "prof.h1.title": "Awal Berdiri",
      "prof.h1.desc": "NETWARE dibentuk sebagai unit produksi Program Keahlian Teknik Komputer dan Jaringan.",
      "prof.h2.year": "[5 Tahun yang lalu]",
      "prof.h2.title": "Perluasan Layanan",
      "prof.h2.desc": "Layanan diperluas dari percetakan ke servis perangkat dan instalasi jaringan.",
      "prof.h3.title": "Kerja Sama Mitra",
      "prof.h3.desc": "Menjalin kerja sama dengan kafetaria, toko, dan agen Laku Pandai BPD DIY.",
      "prof.vision.tag": "Visi",
      "prof.vision.title": "Visi",
      "prof.vision.desc": "Menjadi unit produksi TKJ yang unggul dalam melahirkan teknisi muda yang kompeten, berintegritas, dan siap bersaing di dunia kerja.",
      "prof.mission.tag": "Misi",
      "prof.mission.title": "Misi",
      "prof.mission.1": "Memberikan layanan teknologi yang berkualitas dan terjangkau.",
      "prof.mission.2": "Menjadi sarana praktik kerja nyata bagi siswa TKJ.",
      "prof.mission.3": "Membangun kepercayaan melalui kejujuran dan ketepatan waktu.",
      "prof.g1.cap": "TKJ netware store",
      "prof.g2.cap": "Barang yang tersedia dan dijual di Tefa TKJ",
      "prof.g3.cap": "Peralatan dan barang barang di Tefa TKJ",
      "prof.g4.cap": "Proses Editing",
      "prof.g5.cap": "Transaksi dan Pembayaran",

      "lay.hero.title": "Katalog Layanan",
      "lay.hero.desc": "Cari layanan yang Anda butuhkan, saring berdasarkan kategori, lalu klik kartu untuk melihat detail.",
      "lay.search.label": "Cari layanan",
      "lay.search.placeholder": "Cari layanan, mis. baterai HP",
      "lay.filter.aria": "Filter kategori layanan",
      "lay.empty.title": "Layanan tidak ditemukan",
      "lay.empty.desc": "Coba kata kunci lain atau pilih kategori “Semua”.",
      "lay.cta.title": "Tidak Menemukan yang Dicari?",
      "lay.cta.desc": "Hubungi kami untuk konsultasi kebutuhan khusus atau pekerjaan dalam jumlah besar.",
      "lay.modal.close": "Tutup detail",
      "lay.modal.order": "Pesan Layanan",

      "ct.hero.title": "Hubungi Kami",
      "ct.hero.desc": "Punya pertanyaan, ingin memesan layanan, atau berminat bekerja sama? Kirim pesan dan kami akan segera merespons.",
      "ct.loc.title": "Lokasi",
      "ct.loc.region": "Daerah Istimewa Yogyakarta 55715",
      "ct.wa.hours": "Senin–Jumat, 07.30–14.45 WIB",
      "ct.map.title": "Peta lokasi SMK Negeri 1 Bantul",
      "ct.form.title": "Kirim Pesan",
      "ct.form.note": "Semua kolom bertanda wajib diisi.",
      "ct.f.name": "Nama Lengkap *",
      "ct.f.name.ph": "Nama Anda",
      "ct.f.name.err": "Nama minimal 3 karakter.",
      "ct.f.email": "Email *",
      "ct.f.email.ph": "nama@email.com",
      "ct.f.email.err": "Masukkan alamat email yang valid.",
      "ct.f.phone": "Nomor Telepon / WhatsApp *",
      "ct.f.phone.err": "Nomor telepon tidak valid.",
      "ct.f.service": "Jenis Layanan *",
      "ct.f.service.pick": "— Pilih layanan —",
      "ct.f.service.err": "Pilih jenis layanan.",
      "ct.g.print": "Percetakan",
      "ct.g.hp": "Servis HP",
      "ct.g.laptop": "Servis Laptop",
      "ct.g.other": "Lainnya",
      "ct.f.msg": "Pesan *",
      "ct.f.msg.ph": "Jelaskan kebutuhan Anda secara singkat",
      "ct.f.msg.err": "Pesan minimal 10 karakter.",
      "ct.f.file": "Upload Dokumen / Foto",
      "ct.f.file.hint": "(PDF, DOC, DOCX, JPG, PNG, maks 5 MB)",
      "ct.f.file.err": "File tidak valid atau lebih dari 5 MB.",
    },
    en: {
      "brand.sub": "TKJ Production Unit SMKN 1 Bantul",
      "nav.home": "Home",
      "nav.profile": "Profile",
      "nav.services": "Services",
      "nav.partner": "Partnership",
      "nav.contact": "Contact",
      "lang.toggle": "Switch to Bahasa Indonesia",
      "common.skip": "Skip to content",
      "common.toTop": "Back to top",
      "footer.desc": "Computer and Network Engineering Production Unit, SMK Negeri 1 Bantul, Special Region of Yogyakarta.",
      "footer.menu": "Menu",
      "footer.other": "Other",
      "footer.rights": "All rights reserved.",
      "hero.eyebrow": "Computer & Network Engineering Production Unit",
      "hero.title": 'Trusted Tech Solutions from <span>TKJ Students</span>',
      "hero.desc": "NETWARE provides printing, phone repair, laptop repair, and network and CCTV installation, handled to professional standards by the SMK Negeri 1 Bantul team.",
      "hero.btn.services": "View Services",
      "hero.btn.contact": "Contact Us",
      "hero.card.phone": '<strong>Phone Repair</strong><span>Screen &amp; battery</span>',
      "hero.card.laptop": '<strong>Laptop Repair</strong><span>Reinstall &amp; upgrade</span>',
      "hero.card.print": '<strong>Printing</strong><span>Print &amp; binding</span>',
      "cta.send": "Send Message",
      "intro.eyebrow": "About NETWARE",
      "intro.title": "Learning While Serving",
      "intro.desc": "NETWARE is a production unit under the Computer and Network Engineering program. Here, students apply what they learn in class to meet real needs in the community.",
      "intro.c1.title": "Consistent Quality",
      "intro.c1.desc": "Every job follows clear procedures and is checked before it is handed over.",
      "intro.c2.title": "Fast Turnaround",
      "intro.c2.desc": "We give a time estimate from the start so you know when your item is ready.",
      "intro.c3.title": "Service with Care",
      "intro.c3.desc": "Honest, friendly advice, with no pressure to buy services you do not need.",
      "feat.eyebrow": "Featured Services",
      "feat.title": "How Can We Help?",
      "feat.desc": "NETWARE's main services. Browse the full catalog for prices and details.",
      "feat.c1.tag": "Printing",
      "feat.c1.title": "Printing & Binding",
      "feat.c1.desc": "Printing for assignments and presentations, posters, spiral binding, lamination, and tape binding.",
      "feat.c2.tag": "Phone Repair",
      "feat.c2.title": "Screen & Battery Replacement",
      "feat.c2.desc": "Cracked screen and battery replacement with parts matched to your device model.",
      "feat.c3.tag": "Laptop Repair",
      "feat.c3.title": "Reinstall & Upgrade",
      "feat.c3.desc": "OS installation, drivers, optimization, and RAM and SSD replacement.",
      "feat.more": "View details",
      "stat.1": "Service Types",
      "stat.2": "Service Categories",
      "stat.3": "Partnership Types",
      "cta.title": "Need Tech Help?",
      "cta.desc": "Tell us what you need. The NETWARE team is ready to help find the right solution.",

      "prof.hero.title": 'Get to Know <span class="text-gradient" style="color:#fff">NETWARE</span>',
      "prof.hero.desc": "A production unit where Computer and Network Engineering students at SMK Negeri 1 Bantul gain real hands-on experience.",
      "prof.about.eyebrow": "About Us",
      "prof.about.title": "Where Students Become Professionals",
      "prof.about.p1": "NETWARE was born from the need to connect classroom theory with real work. Every service we offer is carried out by students under the guidance of their supervising teachers, so quality and responsibility are maintained.",
      "prof.about.p2": "We believe skills grow best when they are used to help others, from simple document printing to complex network installations.",
      "prof.c1.title": "Learning",
      "prof.c1.desc": "Direct practice for TKJ students.",
      "prof.c2.title": "Skills",
      "prof.c2.desc": "Repair, installation, and configuration.",
      "prof.c3.title": "Team",
      "prof.c3.desc": "A close-knit group of students and supervising teachers.",
      "prof.c4.title": "Growth",
      "prof.c4.desc": "Continuously developing to meet needs.",
      "prof.hist.eyebrow": "History",
      "prof.hist.title": "The NETWARE Journey",
      "prof.hist.desc": "Milestones and years based on the school's official records.",
      "prof.h1.year": "[2023]",
      "prof.h1.title": "Founded",
      "prof.h1.desc": "NETWARE was established as a production unit of the Computer and Network Engineering program.",
      "prof.h2.year": "[5 Years Ago]",
      "prof.h2.title": "Expanded Services",
      "prof.h2.desc": "Services expanded from printing to device repair and network installation.",
      "prof.h3.title": "Partner Collaborations",
      "prof.h3.desc": "Partnerships with a cafeteria, shops, and Laku Pandai BPD DIY agents.",
      "prof.vision.tag": "Vision",
      "prof.vision.title": "Vision",
      "prof.vision.desc": "To be a leading TKJ production unit in producing young technicians who are competent, full of integrity, and ready to compete in the workforce.",
      "prof.mission.tag": "Mission",
      "prof.mission.title": "Mission",
      "prof.mission.1": "Provide technology services that are high quality and affordable.",
      "prof.mission.2": "Serve as a real work-practice venue for TKJ students.",
      "prof.mission.3": "Build trust through honesty and punctuality.",
      "prof.g1.cap": "TKJ NETWARE store",
      "prof.g2.cap": "Items available for sale at Tefa TKJ",
      "prof.g3.cap": "Equipment and goods at Tefa TKJ",
      "prof.g4.cap": "Editing process",
      "prof.g5.cap": "Transactions and payment",

      "lay.hero.title": "Service Catalog",
      "lay.hero.desc": "Search for the service you need, filter by category, then click a card to see details.",
      "lay.search.label": "Search services",
      "lay.search.placeholder": "Search services, e.g. phone battery",
      "lay.filter.aria": "Filter service categories",
      "lay.empty.title": "No services found",
      "lay.empty.desc": "Try another keyword or select the “All” category.",
      "lay.cta.title": "Can't find what you're looking for?",
      "lay.cta.desc": "Contact us for consultations on special needs or large orders.",
      "lay.modal.close": "Close details",
      "lay.modal.order": "Order Service",

      "ct.hero.title": "Contact Us",
      "ct.hero.desc": "Have a question, want to order a service, or interested in partnering with us? Send a message and we will respond shortly.",
      "ct.loc.title": "Location",
      "ct.loc.region": "Special Region of Yogyakarta 55715",
      "ct.wa.hours": "Monday–Friday, 07.30–14.45 WIB",
      "ct.map.title": "Map of SMK Negeri 1 Bantul",
      "ct.form.title": "Send a Message",
      "ct.form.note": "All fields marked with * are required.",
      "ct.f.name": "Full Name *",
      "ct.f.name.ph": "Your name",
      "ct.f.name.err": "Name must be at least 3 characters.",
      "ct.f.email": "Email *",
      "ct.f.email.ph": "name@email.com",
      "ct.f.email.err": "Please enter a valid email address.",
      "ct.f.phone": "Phone Number / WhatsApp *",
      "ct.f.phone.err": "Invalid phone number.",
      "ct.f.service": "Service Type *",
      "ct.f.service.pick": "— Select a service —",
      "ct.f.service.err": "Please select a service.",
      "ct.g.print": "Printing",
      "ct.g.hp": "Phone Repair",
      "ct.g.laptop": "Laptop Repair",
      "ct.g.other": "Other",
      "ct.f.msg": "Message *",
      "ct.f.msg.ph": "Briefly describe what you need",
      "ct.f.msg.err": "Message must be at least 10 characters.",
      "ct.f.file": "Upload Document / Photo",
      "ct.f.file.hint": "(PDF, DOC, DOCX, JPG, PNG, max 5 MB)",
      "ct.f.file.err": "Invalid file or larger than 5 MB.",
    },
  };

  function currentLang() {
    try {
      return localStorage.getItem(LANG_KEY) === "en" ? "en" : "id";
    } catch (e) {
      return "id";
    }
  }

  function t(lang, key) {
    const val = (DICT[lang] && DICT[lang][key]) || DICT.id[key];
    return val === undefined ? "" : val;
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(lang, el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(lang, el.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(lang, el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(lang, el.dataset.i18nAria));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.setAttribute("title", t(lang, el.dataset.i18nTitle));
    });
    document.querySelectorAll("[data-i18n-label]").forEach((el) => {
      el.label = t(lang, el.dataset.i18nLabel);
    });

    const btn = document.querySelector(".lang-toggle");
    if (btn) {
      btn.textContent = lang === "id" ? "EN" : "ID";
      btn.setAttribute("aria-label", t(lang, "lang.toggle"));
      btn.title = t(lang, "lang.toggle");
    }

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  function injectToggle() {
    const actions = document.querySelector(".nav-actions");
    if (!actions || actions.querySelector(".lang-toggle")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "icon-btn lang-toggle";
    btn.addEventListener("click", () => {
      const next = currentLang() === "id" ? "en" : "id";
      try { localStorage.setItem(LANG_KEY, next); } catch (e) { /* abaikan */ }
      applyLang(next);
    });
    actions.insertBefore(btn, actions.firstChild);
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectToggle();
    applyLang(currentLang());
  });
})();