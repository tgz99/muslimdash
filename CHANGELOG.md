# Changelog

Semua perubahan penting extension ini dari versi 1.2.1 sampai sekarang.

## 1.6.5

**Diperbaiki**
- Suara adzan cuma bunyi sekali abis extension/browser start, abis itu bisu terus. Dokumen offscreen (tempat audio diputar) gak pernah ditutup, jadi panggilan berikutnya buat prayer selanjutnya gagal diem-diem (dibatasi 1 dokumen offscreen aktif per waktu). Sekarang ditutup otomatis begitu audio selesai/gagal diputar.

**Diubah**
- Privacy policy (PRIVACY.md & privacy.html) diupdate: Google Fonts (dimuat tiap buka tab baru) sekarang didisclose sebagai pihak ketiga yang dikontak, sebelumnya kelewat kesebut.

## 1.6.4

**Diubah**
- Repo GitHub & GitHub Pages dipindah dari `muslimdash` jadi `themuslimway`, samain sama nama extension yang udah diganti sejak 1.5.0. Link "Kunjungi Website" di panel Pengaturan diupdate ke `tgz99.github.io/themuslimway`.

## 1.6.3

**Diperbaiki**
- Notifikasi/adzan yang jadwalnya udah lewat gak lagi nongol pas browser baru dibuka lagi (misal komputer mati pas waktu Maghrib). `chrome.alarms` tetap nge-fire alarm yang telat begitu browser nyala — sekarang alarm yang telat >1 menit dari jadwal aslinya di-skip.

## 1.6.2

**Ditambahkan**
- Footer di panel Pengaturan: nomor versi (dibaca langsung dari manifest, jadi gak pernah ketinggalan) + link ke landing page (tgz99.github.io/muslimdash).

## 1.6.1

**Diubah**
- Author di manifest diganti jadi "Mas Gun".

## 1.6.0

**Diubah**
- Tombol Export/Import todo (JSON) diganti jadi ▲/▼ **Move Up/Down**. Nonaktif secara default, aktif begitu ada item todo yang dicentang. Item yang dicentang bisa dipindah naik/turun urutannya; beberapa item yang dicentang berdekatan bakal gerak bareng sebagai satu grup.

## 1.5.5

**Diubah**
- Ukuran judul "Amalan Harian" disamain sama judul card lain ("Jadwal Sholat", "Todo List") — sebelumnya lebih kecil, sekarang konsisten.

## 1.5.4

**Diperbaiki (bug kalkulasi jadwal sholat — fallback lokal)**
- Perhitungan jadwal sholat lokal (dipakai kalau API Aladhan gak bisa diakses, atau user pilih metode "Algoritma Standar/Lokal" manual) punya 3 bug numpuk:
  1. Penyesuaian timezone device kebatalin sendiri secara aljabar — DST (Daylight Saving Time) dihitung tapi gak pernah kepake di hasil akhir.
  2. Arah pagi/sore buat Asr, Maghrib, Isya salah ketebak dari tanda plus/minus sudut.
  3. Maghrib & Isya kena penyesuaian dobel akibat pemanggilan fungsi rekursif.
- Sebelum fix: Maghrib bisa keluar jam 13:10, Isya jam 12:03 (harusnya ~17:54 dan ~19:05) — meleset sampai 7 jam.
- Setelah fix: divalidasi ke Aladhan API buat Jakarta, semua 6 waktu sholat cuma beda 3-8 menit (wajar, beda metode kalkulasi).
- Jalur API (metode default, Kemenag RI dkk) tidak terdampak — ini murni bug di fallback lokal.

## 1.5.3

**Diubah**
- Palet warna tema Terang diganti dari putih/abu-abu polos jadi warm parchment/sand — kartu, teks, border, shadow semua pakai tint coklat hangat yang konsisten (bukan filter abu-abu di atas dasar terang).

## 1.5.2

**Diubah**
- Dropdown pilihan referensi tanggal hari besar Islam (Indonesia/Kemenag vs Global/Hisab) sekarang muncul juga buat bahasa Arab, tidak cuma Inggris. Bahasa Indonesia tetap otomatis ikut Kemenag tanpa nanya.
- Teks opsi dropdown itu sendiri ("Indonesia (Kemenag)" / "Global (Hisab)") dilokalin ke 3 bahasa — sebelumnya hardcode Inggris terus.

## 1.5.1

**Diperbaiki**
- Suara adzan sebelumnya numpang di alarm notifikasi yang punya offset lead-time — kalau lead-time diset 10 menit, adzan ikut bunyi 10 menit lebih awal dari waktu sholat sebenarnya. Sekarang dipisah jadi alarm terpisah (`adhan-*` selalu tepat di waktu sholat, `prayer-*` tetap ngikut lead-time buat notifikasi).
- Tombol "Minta Izin" lokasi di panel Pengaturan sebelumnya query GPS dua kali per klik (boros). Sekarang cuma sekali.
- Dibersihin: 1 CSS selector mati di tema Terang yang gak pernah match apa pun.

## 1.5.0

**Diubah**
- Nama extension diganti dari "Muslim Dashboard" jadi **"The Muslim Way"** — manifest, judul halaman, landing page, dokumen privasi. Nama folder/repo GitHub, URL GitHub Pages, dan key `localStorage` internal sengaja tidak diubah (biar link yang udah disubmit ke Chrome Web Store gak putus, dan preferensi user lama gak ke-reset).

## 1.4.2

**Ditambahkan**
- Status Izin Lokasi di panel Pengaturan — badge (Diizinkan/Ditolak/Belum Diminta) + tombol "Minta Izin" yang cuma muncul kalau status masih "belum diminta" (browser tidak mengizinkan re-trigger prompt izin yang sudah eksplisit ditolak).

## 1.4.1

**Ditambahkan**
- Toggle "Notifikasi Waktu Sholat" on/off di panel Pengaturan, default **ON** (sama seperti perilaku sebelumnya). Independen dari toggle suara adzan.

## 1.4.0

**Ditambahkan**
- **Suara Adzan** (Chrome saja) — audio adzan asli (bukan cuma alert teks) diputar saat waktu sholat tiba, tetap jalan walau tab dashboard ditutup, pakai `chrome.offscreen` (API resmi Manifest V3). Audio bersumber dari Internet Archive, lisensi Public Domain Mark 1.0, dibundel di dalam extension. Ada file terpisah buat Subuh (lafalnya beda dari 4 sholat lain).
- **Panel Pengaturan** (gear ⚙️) — menggantikan tombol lapor bug yang berdiri sendiri. Isinya: toggle tema, toggle suara adzan, dan tombol lapor bug (dipindah ke dalam panel).
- **Tema Terang** — palet kedua yang genuine (bukan cuma invert warna), bisa dipilih dari panel Pengaturan.
- Perbaikan arsitektur: state notifikasi (`notifLang`, `reminderLang`, `adhanEnabled`) dipindah dari variable biasa ke `chrome.storage.local`, karena service worker MV3 bisa mati dan hidup lagi cuma dari event alarm — variable biasa bakal ke-reset diam-diam ke default sebelum notifikasi sempat kekirim.

## 1.3.1

**Diubah**
- Styling tombol lapor bug disederhanain — hapus background/border, jadi ikon polos yang nyatu sama ikon lain di settings bar.

## 1.3.0

**Ditambahkan**
- Log error lokal (ring buffer, maksimal 20 entri, cuma nulis pas ada error beneran — bukan log aktivitas umum) + tombol 🐛 "Laporkan Masalah" yang buka draft email (`mailto:`) ke developer, isinya error terakhir + versi extension + info browser. Tidak ada yang terkirim otomatis — murni manual, sesuai kebijakan privasi "no tracking".

## 1.2.1

**Diperbaiki**
- Beberapa teks statis (label "Waktu sholat selanjutnya", "dalam", dan sejumlah tooltip) gak pernah tersambung ke sistem terjemahan — tetap Bahasa Indonesia walau UI di-set ke English/Arabic.
- Bug lebih besar di baliknya: kalau bahasa tersimpan dari sesi sebelumnya bukan default (Indonesia), terjemahan gak otomatis diterapin pas buka tab baru — baru kepasang setelah user oprek dropdown bahasa lagi. Sekarang diterapin langsung saat init kalau bahasa tersimpan bukan Indonesia.
- Update alamat kontak jadi kontak@tukangweb.id di semua tempat (landing page, privacy policy).
