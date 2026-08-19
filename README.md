# The Muslim Way 🕌

Extension browser untuk Firefox & Chrome yang menampilkan dashboard Islami saat membuka tab baru. Terinspirasi oleh MuslimBoard.

## Fitur

- **Jadwal Sholat** - 7 metode perhitungan (termasuk Kemenag RI), berdasarkan lokasi pengguna
- **Arah Kiblat** - Bearing ke Ka'bah dihitung dari lokasi pengguna
- **Event Islam Terdekat** - Countdown ke Ramadhan, Idul Fitri, Idul Adha, dan hari besar Islam lainnya
- **Amalan Harian** - Checklist dzikir & tilawah Al-Qur'an, plus pengingat sekali sehari di jam yang bisa diatur
- **Suara Adzan** (Chrome) - Audio adzan penuh saat waktu sholat tiba, tetap terputar walau tab dashboard ditutup
- **Quotes Islami** - Kutipan dari Al-Quran dan Hadits yang berganti secara otomatis
- **Todo List** - Catatan tugas dengan local storage, item yang dicentang bisa dipindah naik/turun urutannya
- **Status Internet** - Indikator online/offline
- **Notifikasi via Alarm** - Notifikasi sholat & amalan harian tetap muncul walau tab dashboard tertutup, lead-time bisa diatur (1/5/10/15/30 menit)
- **Multi Bahasa** - Bahasa Indonesia, English, dan Arabic
- **Tema Gelap & Terang** - Bisa diganti dari menu ⚙️ Pengaturan
- **Wallpaper Harian** - Gambar latar dari Bing Image of the Day (fallback Picsum Photos), di-cache per hari
- **Sumber Waktu Sholat** - Menampilkan metode perhitungan yang digunakan
- **Lokasi Manual** - Alternatif kalau GPS/geolocation browser kurang akurat
- **Lokasi & Tanggal Hijriah** - Nama kota dan tanggal Hijriah di bottom bar
- **Prakiraan Cuaca** - Cuaca real-time dari Open-Meteo di bawah todo list
- **Mode Ramadan** - Banner Imsak & waktu Buka Puasa otomatis muncul saat bulan Ramadan
- **Laporan Masalah** - Tombol di menu ⚙️ Pengaturan buat kirim error log lokal ke developer (opsional, manual)

## Cara Install

### Method 1: Temporary Loading (Development)

1. Buka Firefox dan ketik `about:debugging` di address bar
2. Klik **"This Firefox"** di sidebar kiri
3. Klik **"Load Temporary Add-on..."**
4. Pilih file `manifest.json` di folder ini
5. Extension akan aktif dan muncul saat membuka tab baru

### Method 2: Packaged Extension

1. Zip seluruh file di folder ini (termasuk folder `icons/`)
2. Ganti ekstensi `.zip` menjadi `.xpi`
3. Drag and drop file `.xpi` ke jendela Firefox
4. Klik **"Add"** saat diminta konfirmasi

## Struktur File

```
muslimdash/
├── manifest.json      # Konfigurasi extension (Manifest V3)
├── newtab.html         # Halaman dashboard
├── newtab.css          # Styling (dark & light theme)
├── newtab.js           # Logika utama
├── background.js       # Service worker: notifikasi, alarm, adzan
├── offscreen.html       # Halaman tersembunyi buat mutar audio (Chrome)
├── offscreen.js
├── audio/
│   ├── adhan.mp3        # Dzuhur/Ashar/Maghrib/Isya (Public Domain)
│   └── adhan-fajr.mp3   # Subuh, lafal beda (Public Domain)
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Teknologi

- **WebExtension API** (Manifest V3, kompatibel Firefox & Chrome)
- **Vanilla JavaScript** (ES6+)
- **CSS Grid & Flexbox**
- **Local Storage** untuk data persisten
- **chrome.offscreen** buat pemutaran audio dari service worker (Chrome saja)

## Privacy Policy

Lihat [PRIVACY.md](PRIVACY.md) untuk detail data apa yang diproses dan ke mana data itu mengalir.

## Changelog

Lihat [CHANGELOG.md](CHANGELOG.md) untuk riwayat perubahan tiap versi.

## Catatan

- Perhitungan jadwal sholat menggunakan algoritma standar (metode umum)
- Untuk hasil yang lebih akurat, izinkan akses lokasi saat diminta
- Data todo tersimpan secara lokal di browser

---

Dibuat dengan ❤️ untuk umat Muslim
