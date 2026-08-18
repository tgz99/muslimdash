# Muslim Dashboard 🕌

Extension browser untuk Firefox yang menampilkan dashboard Islami saat membuka tab baru. Terinspirasi oleh MuslimBoard.

## Fitur

- **Jadwal Sholat** - Perhitungan waktu sholat berdasarkan lokasi pengguna
- **Quotes Islami** - Kutipan dari Al-Quran dan Hadits yang berganti secara otomatis
- **Todo List** - Catatan tugas dengan local storage
- **Status Internet** - Indikator online/offline
- **Notifikasi Sholat** - Pemberitahuan saat waktu sholat tiba
- **Multi Bahasa** - Bahasa Indonesia, English, dan Arabic
- **Wallpaper Random** - Gambar latar baru dari Picsum Photos setiap buka tab
- **Sumber Waktu Sholat** - Menampilkan metode perhitungan yang digunakan
- **Lokasi & Tanggal Hijriah** - Nama kota dan tanggal Hijriah di bottom bar
- **Prakiraan Cuaca** - Cuaca real-time dari Open-Meteo di bawah todo list
- **Arah Kiblat** - Bearing ke Ka'bah dihitung dari lokasi pengguna
- **Mode Ramadan** - Banner Imsak & waktu Buka Puasa otomatis muncul saat bulan Ramadan
- **Export/Import Todo** - Backup dan restore todo list sebagai file JSON
- **Notifikasi via Alarm** - Pengingat waktu sholat tetap muncul walau tab dashboard tertutup, dengan lead-time yang bisa diatur (1/5/10/15/30 menit)

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
├── manifest.json      # Konfigurasi extension
├── newtab.html        # Halaman dashboard
├── newtab.css         # Styling
├── newtab.js          # Logika utama
├── background.js      # Background script untuk notifikasi
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Teknologi

- **WebExtension API** (Manifest V2)
- **Vanilla JavaScript** (ES6+)
- **CSS Grid & Flexbox**
- **Local Storage** untuk data persisten

## Privacy Policy

Lihat [PRIVACY.md](PRIVACY.md) untuk detail data apa yang diproses dan ke mana data itu mengalir.

## Catatan

- Perhitungan jadwal sholat menggunakan algoritma standar (metode umum)
- Untuk hasil yang lebih akurat, izinkan akses lokasi saat diminta
- Data todo tersimpan secara lokal di browser

---

Dibuat dengan ❤️ untuk umat Muslim
