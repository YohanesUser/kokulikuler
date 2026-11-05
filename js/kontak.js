(function () {
  'use strict';

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKfmfe6TSc8CsMvxY7KLxo--_dsWO3AVC2SUCSM1vnyqWUVIJRramgSUqA6YPlCzxNoQ/exec';
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  // Nilai harus sama persis dengan atribut value="..." di <option> pada kontak.html
    // Hanya layanan percetakan dan kategori "Lainnya" yang boleh upload file
  const LAYANAN_FILE = [
    'Cetak Dokumen Hitam Putih', 'Cetak Warna', 'Jilid & Laminating',
    'Konsultasi Kebutuhan IT'
  ];

  // Layanan yang file-nya boleh kosong
  const FILE_OPSIONAL = ['Konsultasi Kebutuhan IT'];

  const TEKS = {
    id: {
      nameErr: 'Nama minimal 3 karakter.',
      emailErr: 'Masukkan alamat email yang valid.',
      phoneErr: 'Nomor telepon tidak valid.',
      serviceErr: 'Pilih jenis layanan.',
      msgErr: 'Pesan minimal 10 karakter.',
      fileErr: 'File tidak valid atau lebih dari 5 MB.',
      checkForm: 'Periksa kembali kolom yang belum sesuai.',
      sending: 'Mengirim...',
      send: 'Kirim Pesan',
      success: 'Terima kasih! Pesan dan file Anda sudah terkirim.',
      fail: 'Maaf, pesan gagal dikirim. Silakan coba lagi atau hubungi kami lewat WhatsApp.',
    },
    en: {
      nameErr: 'Name must be at least 3 characters.',
      emailErr: 'Please enter a valid email address.',
      phoneErr: 'Invalid phone number.',
      serviceErr: 'Please select a service.',
      msgErr: 'Message must be at least 10 characters.',
      fileErr: 'Invalid file or larger than 5 MB.',
      checkForm: 'Please check the fields that need attention.',
      sending: 'Sending...',
      send: 'Send Message',
      success: 'Thank you! Your message and file have been sent.',
      fail: 'Sorry, the message could not be sent. Please try again or contact us via WhatsApp.',
    },
  };

  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const statusEl = document.getElementById('form-status');
  const label = submitBtn.querySelector('.btn-label');
  const grupFile = document.getElementById('grup-file');
  const inputFile = document.getElementById('file');
  const selectLayanan = document.getElementById('layanan');

    // Peta dari id layanan (layanan.js) ke value <option> di kontak.html
    const PETA_LAYANAN = {
    'cetak-dokumen': 'Cetak Dokumen Hitam Putih',
    'cetak-warna': 'Cetak Warna',
    'jilid': 'Jilid & Laminating',
    'servis-hp-layar-ip': 'Ganti LCD Iphone',
    'servis-hp-layar-android': 'Ganti LCD Android',
    'servis-hp-konnektor-charger': 'Ganti Konnektor Board Charger Android',
    'servis-hp-baterai': 'Ganti Baterai HP',
    'servis-hp-flas': 'Jasa Flashing & Unlock HP',
    'servis-laptop-software': 'Install Ulang & Optimasi',
    'servis-laptop-hardware': 'Perbaikan Hardware Laptop',
    'servis-laptop-pasta': 'Pembersihan dan Re-Pasta Laptop',
    'instalasi-keyboard': 'Pemasangan Keyboard Laptop',
    'instalasi-hdd-ssd': 'Upgrade HDD/SSD Laptop',
    'instalasi-ram': 'Pemasangan RAM Laptop',
    'instalasi-lcd-laptop': 'Pemasangan LCD Laptop',
    'konsultasi-it': 'Konsultasi Kebutuhan IT',
    'topup-dana': 'Top Up E-Wallet',
    'topup-ovo': 'Top Up E-Wallet',
    'topup-gopay': 'Top Up E-Wallet',
    'topup-shopeepay': 'Top Up E-Wallet'
  };
  // Isi otomatis jenis layanan dari parameter URL (?layanan=...)
    // Tampilkan notifikasi singkat (toast) di pojok layar
  function tampilkanToast(pesan) {
    const toast = document.createElement('div');
    toast.textContent = pesan;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: 'var(--primary, #2563eb)',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '10px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      fontSize: '0.93rem',
      zIndex: '9999',
      opacity: '0',
      transition: 'opacity .3s ease, transform .3s ease',
      maxWidth: '90vw',
      textAlign: 'center'
    });
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Isi otomatis jenis layanan dari parameter URL (?layanan=...)
  function isiLayananDariUrl() {
    const idLayanan = new URLSearchParams(window.location.search).get('layanan');
    const nilai = PETA_LAYANAN[idLayanan];
    if (!nilai) return;

    const opsi = Array.from(selectLayanan.options).some(o => o.value === nilai);
    if (!opsi) return;

    selectLayanan.value = nilai;
    setFieldError(selectLayanan, true);
    perbaruiGrupFile();

    const teksLayanan = selectLayanan.options[selectLayanan.selectedIndex].text;
    const pesan = lang() === 'en'
      ? `Service selected: ${teksLayanan}`
      : `Layanan dipilih otomatis: ${teksLayanan}`;

    if (typeof window.showToast === 'function') {
      window.showToast(pesan, 'success', 3500);
    }
  }
  isiLayananDariUrl();

  function lang() {
    try {
      return localStorage.getItem('netware-lang') === 'en' ? 'en' : 'id';
    } catch (e) {
      return 'id';
    }
  }
  function T(key) { return TEKS[lang()][key]; }

    const rules = {
    nama:    { test: v => v.trim().length >= 3, msg: () => T('nameErr') },
    email:   { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: () => T('emailErr') },
    telepon: { test: v => /^[0-9+\- ]{9,20}$/.test(v.trim()), msg: () => T('phoneErr') },
    layanan: { test: v => v !== '', msg: () => T('serviceErr') },
    pesan:   { test: v => true, msg: () => T('msgErr') }
  };

  function perbaruiGrupFile() {
    const perluFile = LAYANAN_FILE.includes(selectLayanan.value);
    grupFile.hidden = !perluFile;
    if (!perluFile) {
      inputFile.value = '';
      grupFile.classList.remove('has-error');
    }
  }
  selectLayanan.addEventListener('change', perbaruiGrupFile);

  function setFieldError(field, isValid) {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.toggle('has-error', !isValid);
    field.setAttribute('aria-invalid', String(!isValid));
    const errEl = group.querySelector('.error-msg');
    if (errEl && !isValid && rules[field.name]) errEl.textContent = rules[field.name].msg();
  }

  function validateField(name) {
    const field = form.elements[name];
    const valid = rules[name].test(field.value);
    setFieldError(field, valid);
    return valid;
  }

  function validateFile() {
    if (grupFile.hidden) return true;
    const file = inputFile.files[0];
    const wajib = !FILE_OPSIONAL.includes(selectLayanan.value);
    const valid = file ? file.size <= MAX_SIZE : !wajib;
    grupFile.classList.toggle('has-error', !valid);
    if (!valid) grupFile.querySelector('.error-msg').textContent = T('fileErr');
    return valid;
  }

  function validateAll() {
    const hasilField = Object.keys(rules).map(validateField).every(Boolean);
    return hasilField && validateFile();
  }

  Object.keys(rules).forEach(name => {
    const field = form.elements[name];
    field.addEventListener('blur', () => validateField(name));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('has-error')) validateField(name);
    });
  });

  inputFile.addEventListener('change', validateFile);

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.style.color = type === 'error' ? '#c0392b' : 'var(--text-muted)';
  }

  function bacaFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function kecilkanGambar(file) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) return resolve(file);

      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const MAX = 1600;
        const skala = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * skala);
        canvas.height = Math.round(img.height * skala);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob(blob => {
          if (!blob) return reject(new Error('Gagal memproses gambar'));
          const namaBaru = file.name.replace(/\.\w+$/, '') + '.jpg';
          resolve(new File([blob], namaBaru, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.85);
      };
      img.onerror = () => reject(new Error('Gambar tidak bisa dibaca'));
      img.src = url;
    });
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    setStatus('');

    if (!validateAll()) {
      setStatus(T('checkForm'), 'error');
      return;
    }

    submitBtn.disabled = true;
    label.textContent = T('sending');

    try {
      const data = new URLSearchParams(new FormData(form));
      data.delete('file');

      const file = inputFile.files[0];
      if (file && !grupFile.hidden) {
        const siap = await kecilkanGambar(file);
        data.append('file_nama', siap.name);
        data.append('file_tipe', siap.type || 'application/octet-stream');
        data.append('file_data', await bacaFile(siap));
      }

      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: data });

      form.reset();
      perbaruiGrupFile();
      Object.keys(rules).forEach(name => setFieldError(form.elements[name], true));
      setStatus(T('success'));
            if (typeof window.showToast === 'function') {
        window.showToast(
          lang() === 'en'
            ? 'Message sent! The NETWARE team will contact you shortly.'
            : 'Pesan Anda berhasil dikirim. Tim NETWARE akan segera menghubungi Anda.',
          'success',
          4500
        );
      }
    } catch (err) {
      setStatus(T('fail'), 'error');
            if (typeof window.showToast === 'function') {
        window.showToast(T('fail'), 'error', 4500);
      }
    } finally {
      submitBtn.disabled = false;
      label.textContent = T('send');
    }
  });

  // Ganti bahasa pesan validasi dan tombol saat EN/ID ditekan
  document.addEventListener('langchange', () => {
    label.textContent = T('send');
    statusEl.textContent = '';
  });
})();