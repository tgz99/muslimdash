# Privacy Policy — The Muslim Way

_Terakhir diperbarui: 2026-08-19_

The Muslim Way adalah extension browser (Firefox & Chrome) yang menampilkan dashboard Islami saat membuka tab baru. Kami sangat menghargai privasi pengguna. Kebijakan ini menjelaskan data apa yang diproses extension ini dan ke mana data tersebut mengalir.

## Ringkasan

- **Tidak ada server milik kami.** Extension ini tidak memiliki backend sendiri. Semua data disimpan secara lokal di browser pengguna (`localStorage`).
- **Tidak ada akun, tracking, atau iklan.** Tidak ada pendaftaran, analytics, atau iklan pihak ketiga.
- **Data lokasi hanya dipakai untuk fitur, dikirim langsung ke API pihak ketiga yang relevan** — bukan ke server kami, karena kami tidak punya server.

## Data yang Diproses

### 1. Lokasi (Latitude/Longitude)
Dipakai untuk menghitung jadwal sholat, arah kiblat, cuaca, dan nama lokasi. Diperoleh dari:
- **Geolocation API browser** (dengan izin eksplisit dari pengguna), atau
- **Input manual** yang pengguna ketik sendiri di form "Atur lokasi manual"

Lokasi disimpan lokal di `localStorage` (untuk mode manual) dan dikirim ke API eksternal berikut setiap kali dashboard dibuka:

| Layanan | Tujuan | Data yang dikirim |
|---|---|---|
| `api.aladhan.com` | Jadwal sholat & tanggal Hijriah | latitude, longitude, metode perhitungan |
| `api.open-meteo.com` | Prakiraan cuaca | latitude, longitude |
| `api.bigdatacloud.net` | Nama kota/lokasi (reverse geocoding) | latitude, longitude |

Kami tidak mengontrol kebijakan privasi masing-masing layanan di atas — silakan cek kebijakan privasi mereka masing-masing untuk detail penanganan data di sisi mereka.

### 2. Wallpaper
Setiap buka tab baru, extension mengambil gambar latar dari **Bing Image of the Day** (`bing.com`) atau, jika gagal, dari **Picsum Photos** (`picsum.photos`). Tidak ada data pribadi yang dikirim ke layanan ini — hanya permintaan gambar biasa.

### 3. Data Tersimpan Lokal (`localStorage`)
Semua di bawah ini **tidak pernah meninggalkan browser pengguna**, kecuali koordinat lokasi yang memang dikirim ke API pada tabel di atas:

- Todo list
- Bahasa & metode perhitungan sholat pilihan
- Lead-time notifikasi
- Lokasi manual (jika diisi)
- Cache wallpaper harian
- Log error (maksimal 20 entri terakhir, hanya ditulis saat benar-benar terjadi error — bukan log aktivitas umum)
- Preferensi tema (gelap/terang), notifikasi waktu sholat (aktif/nonaktif), dan suara adzan (aktif/nonaktif)

### 4. Notifikasi
Notifikasi waktu sholat dijadwalkan secara lokal melalui `alarms` API browser dan ditampilkan lewat `notifications` API browser. Tidak ada data yang dikirim keluar untuk fitur ini.

### 5. Laporan Masalah (opsional, manual)
Tombol 🐛 di dashboard (dalam menu ⚙️ Pengaturan) membuka email (`mailto:`) berisi beberapa error terakhir yang tercatat lokal, versi extension, dan info browser — ditujukan ke kontak@tukangweb.id. **Tidak ada yang terkirim otomatis**: draft email hanya terbuka kalau pengguna sendiri yang klik tombolnya, dan pengguna bebas mengedit atau membatalkan sebelum benar-benar mengirim.

### 6. Suara Adzan (opsional, Chrome saja)
Kalau diaktifkan lewat menu ⚙️ Pengaturan, file audio adzan (dibundel di dalam extension, bukan di-stream dari internet) diputar otomatis saat waktu sholat tiba. Di Chrome, ini memakai fitur `offscreen document` (bagian resmi Manifest V3) supaya suara tetap terputar walau tab dashboard sedang ditutup. Tidak ada data yang dikirim ke mana pun untuk fitur ini — murni pemutaran file lokal.

## Permission yang Diminta

| Permission | Alasan |
|---|---|
| `notifications` | Menampilkan notifikasi waktu sholat |
| `storage` | Menyimpan todo, preferensi, dan cache secara lokal |
| `alarms` | Menjadwalkan notifikasi waktu sholat agar tetap berjalan walau tab ditutup |
| `offscreen` | Memutar file audio adzan dari background service worker (Chrome), karena service worker tidak punya akses ke elemen `<audio>` secara langsung |

Extension ini **tidak meminta** permission `geolocation` di manifest — akses lokasi memakai Geolocation API standar browser yang meminta izin langsung ke pengguna seperti situs web pada umumnya, dan bisa ditolak/dicabut kapan saja lewat pengaturan browser.

## Sumber Konten & Atribusi

Semua konten yang ditampilkan di dashboard berasal dari sumber berikut. Tidak ada konten yang di-hosting, disimpan permanen, atau diklaim sebagai milik kami — semua diambil real-time (kecuali quotes yang memang di-embed statis di kode) dan ditampilkan apa adanya.

| Konten | Sumber | Keterangan |
|---|---|---|
| Kutipan Al-Quran & Hadits | Di-embed statis di `newtab.js` | Teks umum publik, tiap kutipan dicantumkan sumbernya langsung (nama Surah/ayat atau perawi Hadits) |
| Jadwal sholat | `api.aladhan.com` (Al Adhan API) | Bisa pilih 7 metode perhitungan (Kemenag RI, MWL, ISNA, dll). Fallback: perhitungan astronomi lokal di `newtab.js` kalau API gagal diakses |
| Tanggal Hijriah | `api.aladhan.com/gToH` | Konversi tanggal Masehi → Hijriah |
| Prakiraan cuaca | `api.open-meteo.com` | Data cuaca real-time berbasis koordinat |
| Nama kota/lokasi | `api.bigdatacloud.net` | Reverse geocoding dari koordinat ke nama lokasi |
| Wallpaper latar | Bing Image of the Day (`bing.com`), fallback Picsum Photos (`picsum.photos`) | Gambar diambil real-time via endpoint publik, ditampilkan sementara di background tab pengguna sendiri — tidak diunduh permanen, disimpan ulang, atau didistribusikan ke pihak lain oleh extension |
| Arah Kiblat | Dihitung lokal di `newtab.js` | Formula great-circle bearing ke koordinat Ka'bah (21.4225, 39.8262), bukan dari API eksternal |
| Ikon extension | Dibuat sendiri (`icons/icon*.png`) | Bukan hasil dari layanan pihak ketiga |
| Audio Adzan | [Internet Archive — "Adhan Recordings from Doha, Qatar"](https://archive.org/details/adhan.recordings.from.doha.qatar) | Lisensi **Public Domain Mark 1.0**, dibundel di dalam extension (`audio/adhan.mp3`, `audio/adhan-fajr.mp3`), bukan di-stream dari internet |

Extension ini **tidak memodifikasi, menyimpan permanen, atau mengklaim hak cipta** atas konten dari layanan pihak ketiga di atas. Semua request dilakukan langsung dari browser pengguna (client-side), bukan lewat server kami.

## Hak Pengguna

- Hapus semua data lokal kapan saja lewat: uninstall extension, atau clear browser data untuk extension ini.
- Cabut izin lokasi kapan saja lewat pengaturan browser (⚙️ Site settings → Location).
- Gunakan lokasi manual sebagai alternatif GPS.

## Kontak

Pertanyaan seputar kebijakan ini bisa dikirim ke kontak@tukangweb.id.

---

## English Summary

The Muslim Way is a browser extension with no backend server of its own. All data is stored locally in the browser (`localStorage`). Location coordinates (from the Geolocation API or manual entry) are sent directly to three third-party APIs to power prayer times (`api.aladhan.com`), weather (`api.open-meteo.com`), and location name lookup (`api.bigdatacloud.net`) — never to any server operated by us, since none exists. Wallpaper images are fetched from Bing and Picsum with no personal data attached. To-dos, preferences, and cached data stay in local browser storage and are never transmitted anywhere. The extension collects no accounts, analytics, or advertising data.
