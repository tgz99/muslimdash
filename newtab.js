/**
 * The Muslim Way - New Tab Script
 * Features: Prayer times, Quotes, Todo, Clock, Internet status
 */

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// ==================== DATA & CONFIG ====================

const quotes = {
  id: [
    { text: "Sesungguhnya bersama kesulitan ada kemudahan.", source: "QS. Al-Insyirah: 6" },
    { text: "Dan Tuhanmu lebih baik bagimu (pada hari itu) daripada ibu-ibumu.", source: "QS. Ad-Duha: 9" },
    { text: "Barangsiapa yang bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya.", source: "QS. At-Talaq: 2" },
    { text: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.", source: "QS. Al-Baqarah: 286" },
    { text: "Hai orang-orang yang beriman, jadikanlah sabar dan sholat sebagai penolongmu.", source: "QS. Al-Baqarah: 153" },
    { text: "Berdoalah kepada-Ku, niscaya akan Kuperkenankan bagimu.", source: "QS. Ghafir: 60" },
    { text: "Dan sesiapa yang bertawakkal kepada Allah, maka Allah akan mencukupkan keperluannya.", source: "QS. At-Talaq: 3" },
    { text: "Janganlah kamu berduka cita, sesungguhnya Allah bersama kita.", source: "QS. At-Taubah: 40" },
    { text: "Sesungguhnya sholat itu mencegah dari perbuatan keji dan mungkar.", source: "QS. Al-Ankabut: 45" },
    { text: "Dan ridho-lah dengan apa yang telah Allah tetapkan bagimu, niscaya Allah akan mencukupkanmu.", source: "HR. Tirmidzi" },
    { text: "Orang yang paling sempurna imannya adalah yang paling baik akhlaknya.", source: "HR. Tirmidzi" },
    { text: "Tidak sempurna iman seseorang hingga ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri.", source: "HR. Bukhari" },
    { text: "Senyummu kepada saudaramu adalah sedekah.", source: "HR. Tirmidzi" },
    { text: "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia.", source: "HR. Ahmad" },
    { text: "Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan ke surga.", source: "HR. Muslim" }
  ],
  en: [
    { text: "Verily, with hardship comes ease.", source: "Quran 94:6" },
    { text: "And your Lord is going to give you, and you will be satisfied.", source: "Quran 93:5" },
    { text: "And whoever fears Allah - He will make for him a way out.", source: "Quran 65:2" },
    { text: "Allah does not burden a soul beyond that it can bear.", source: "Quran 2:286" },
    { text: "O you who have believed, seek help through patience and prayer.", source: "Quran 2:153" },
    { text: "Call upon Me; I will respond to you.", source: "Quran 40:60" },
    { text: "And whoever relies upon Allah - then He is sufficient for him.", source: "Quran 65:3" },
    { text: "Do not grieve; indeed Allah is with us.", source: "Quran 9:40" },
    { text: "Indeed, prayer prohibits immorality and wrongdoing.", source: "Quran 29:45" },
    { text: "Be content with what Allah has decreed for you, and He will suffice you.", source: "Sunan At-Tirmidhi" },
    { text: "The most perfect believer in faith is the one with the best character.", source: "Sunan At-Tirmidhi" },
    { text: "None of you truly believes until he loves for his brother what he loves for himself.", source: "Sahih Bukhari" },
    { text: "Your smile for your brother is a charity.", source: "Sunan At-Tirmidhi" },
    { text: "The best of people are those that bring most benefit to the rest of mankind.", source: "Musnad Ahmad" },
    { text: "Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.", source: "Sahih Muslim" }
  ],
  ar: [
    { text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", source: "سورة الشرح: ٦" },
    { text: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", source: "سورة الضحى: ٥" },
    { text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", source: "سورة الطلاق: ٢" },
    { text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", source: "سورة البقرة: ٢٨٦" },
    { text: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", source: "سورة البقرة: ١٥٣" },
    { text: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ", source: "سورة غافر: ٦٠" },
    { text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", source: "سورة الطلاق: ٣" },
    { text: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", source: "سورة التوبة: ٤٠" },
    { text: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ", source: "سورة العنكبوت: ٤٥" },
    { text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", source: "صحيح البخاري" },
    { text: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", source: "صحيح البخاري" },
    { text: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", source: "صحيح البخاري" },
    { text: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ", source: "سنن الترمذي" },
    { text: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ", source: "مسند أحمد" },
    { text: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ", source: "صحيح مسلم" }
  ]
};

// Weather code mapping (WMO)
// Prayer calculation methods
const prayerMethods = {
  local: { id: 'local', name: 'Algoritma Standar (Lokal)', nameEn: 'Standard Algorithm (Local)', nameAr: 'خوارزمية قياسية (محلية)' },
  20: { id: 20, name: 'Kemenag RI', nameEn: 'Kemenag RI', nameAr: 'وزارة الشؤون الإندونيسية' },
  3: { id: 3, name: 'Muslim World League', nameEn: 'Muslim World League', nameAr: 'رابطة العالم الإسلامي' },
  2: { id: 2, name: 'Islamic Society of North America (ISNA)', nameEn: 'ISNA', nameAr: 'الجمعية الإسلامية لأمريكا الشمالية' },
  5: { id: 5, name: 'Egyptian General Authority of Survey', nameEn: 'Egyptian General Authority', nameAr: 'الهيئة المصرية العامة للمساحة' },
  4: { id: 4, name: 'Umm al-Qura University, Makkah', nameEn: 'Umm al-Qura, Makkah', nameAr: 'جامعة أم القرى، مكة' },
  1: { id: 1, name: 'University of Islamic Sciences, Karachi', nameEn: 'Karachi University', nameAr: 'جامعة العلوم الإسلامية، كراتشي' },
  11: { id: 11, name: 'Majlis Ugama Islam Singapura (MUIS)', nameEn: 'MUIS Singapore', nameAr: 'مجلس علماء مسلمي سنغافورة' }
};

const weatherCodes = {
  0: { id: 'Cerah', en: 'Clear sky', ar: 'سماء صافية', icon: '☀️' },
  1: { id: 'Cerah Berawan', en: 'Mainly clear', ar: 'غائم جزئياً', icon: '🌤️' },
  2: { id: 'Berawan', en: 'Partly cloudy', ar: 'غائم', icon: '⛅' },
  3: { id: 'Mendung', en: 'Overcast', ar: 'ملبد بالغيوم', icon: '☁️' },
  45: { id: 'Berkabut', en: 'Foggy', ar: 'ضبابي', icon: '🌫️' },
  48: { id: 'Berkabut', en: 'Foggy', ar: 'ضبابي', icon: '🌫️' },
  51: { id: 'Gerimis', en: 'Drizzle', ar: 'رذاذ', icon: '🌦️' },
  53: { id: 'Gerimis', en: 'Drizzle', ar: 'رذاذ', icon: '🌦️' },
  55: { id: 'Gerimis', en: 'Drizzle', ar: 'رذاذ', icon: '🌦️' },
  56: { id: 'Gerimis Beku', en: 'Freezing drizzle', ar: 'رذاذ متجمد', icon: '🌨️' },
  57: { id: 'Gerimis Beku', en: 'Freezing drizzle', ar: 'رذاذ متجمد', icon: '🌨️' },
  61: { id: 'Hujan', en: 'Rain', ar: 'ممطر', icon: '🌧️' },
  63: { id: 'Hujan Lebat', en: 'Heavy rain', ar: 'مطر غزير', icon: '🌧️' },
  65: { id: 'Hujan Lebat', en: 'Heavy rain', ar: 'مطر غزير', icon: '🌧️' },
  66: { id: 'Hujan Beku', en: 'Freezing rain', ar: 'مطر متجمد', icon: '🌨️' },
  67: { id: 'Hujan Beku', en: 'Freezing rain', ar: 'مطر متجمد', icon: '🌨️' },
  71: { id: 'Salju', en: 'Snow', ar: 'مثلج', icon: '🌨️' },
  73: { id: 'Salju', en: 'Snow', ar: 'مثلج', icon: '🌨️' },
  75: { id: 'Salju', en: 'Snow', ar: 'مثلج', icon: '🌨️' },
  77: { id: 'Butir Salju', en: 'Snow grains', ar: 'حبات ثلج', icon: '🌨️' },
  80: { id: 'Hujan Ringan', en: 'Slight rain showers', ar: 'زخات مطر خفيفة', icon: '🌦️' },
  81: { id: 'Hujan Sedang', en: 'Moderate rain showers', ar: 'زخات مطر متوسطة', icon: '🌧️' },
  82: { id: 'Hujan Deras', en: 'Violent rain showers', ar: 'زخات مطر غزيرة', icon: '🌧️' },
  85: { id: 'Salju Ringan', en: 'Slight snow showers', ar: 'زخات ثلج خفيفة', icon: '🌨️' },
  86: { id: 'Salju Lebat', en: 'Heavy snow showers', ar: 'زخات ثلج غزيرة', icon: '🌨️' },
  95: { id: 'Petir', en: 'Thunderstorm', ar: 'عاصفة رعدية', icon: '⛈️' },
  96: { id: 'Petir & Hujan', en: 'Thunderstorm with hail', ar: 'عاصفة رعدية مع برد', icon: '⛈️' },
  99: { id: 'Petir & Hujan', en: 'Thunderstorm with hail', ar: 'عاصفة رعدية مع برد', icon: '⛈️' }
};

const translations = {
  id: {
    fajr: 'Subuh', sunrise: 'Terbit', dhuhr: 'Dzuhur', asr: 'Ashar', maghrib: 'Maghrib', isha: 'Isya',
    nextPrayer: 'Waktu sholat selanjutnya',
    in: 'dalam',
    locationLoading: 'Mendapatkan lokasi...',
    locationDenied: 'Lokasi tidak diizinkan (default: Jakarta)',
    todoPlaceholder: 'Tambahkan tugas...',
    online: 'Online',
    offline: 'Offline',
    greetingMorning: 'Selamat Pagi',
    greetingAfternoon: 'Selamat Siang',
    greetingEvening: 'Selamat Sore',
    greetingNight: 'Selamat Malam',
    prayerTime: 'Waktu Sholat',
    todoList: 'Todo List',
    prayerSource: 'Sumber',
    selectMethod: 'Metode',
    qibla: 'Kiblat',
    ramadan: 'Ramadan',
    imsak: 'Imsak',
    iftar: 'Buka Puasa',
    locationEditTitle: 'Atur lokasi manual',
    manualSave: 'Simpan',
    manualUseGps: 'Pakai GPS',
    manualLatPlaceholder: 'Lintang (mis. -8.0983)',
    manualLngPlaceholder: 'Bujur (mis. 112.4472)',
    manualInvalid: 'Lintang harus -90..90, Bujur harus -180..180',
    eventToday: 'Hari ini',
    eventDaysLeft: 'hari lagi',
    eventIsbatNote: 'estimasi, nunggu Sidang Isbat Kemenag',
    eventHisabNote: 'hasil hisab global',
    remindersTitle: '✨ Amalan Harian',
    reminderDzikirText: 'Dzikir Pagi & Petang',
    reminderQuranText: 'Tilawah Al-Qur\'an',
    reminderCheckTitle: 'Tandai selesai hari ini',
    reminderTimeTitle: 'Atur jam pengingat',
    reminderTimeSave: 'Simpan',
    locationRetryTitle: 'Coba lagi',
    prevQuoteTitle: 'Quote sebelumnya',
    nextQuoteTitle: 'Quote selanjutnya',
    exportTodoTitle: 'Export todo (JSON)',
    importTodoTitle: 'Import todo (JSON)',
    leadtimeTitle: 'Notifikasi sebelum waktu sholat',
    eventRefTitle: 'Referensi tanggal hari besar Islam',
    reportBugTitle: 'Laporkan masalah',
    settingsTitle: 'Pengaturan',
    settingsCloseTitle: 'Tutup',
    themeLabel: 'Tema',
    themeDark: 'Gelap',
    themeLight: 'Terang',
    locationPermLabel: 'Izin Lokasi',
    locationPermHint: 'Dipakai buat jadwal sholat, kiblat & cuaca',
    permGranted: '✓ Diizinkan',
    permDenied: '✕ Ditolak',
    permPrompt: '? Belum Diminta',
    permRequest: 'Minta Izin',
    permDeniedHint: 'Diblokir — klik ikon 🔒 di address bar buat izinin lagi',
    permUnknown: 'Tidak diketahui',
    prayerAlertLabel: 'Notifikasi Waktu Sholat',
    prayerAlertHint: 'Muncul tiap waktu sholat tiba',
    adhanLabel: 'Suara Adzan',
    adhanHint: 'Chrome saja — audio penuh saat waktu sholat tiba',
    reportBugLabel: 'Laporkan Masalah'
  },
  en: {
    fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha',
    nextPrayer: 'Next prayer',
    in: 'in',
    locationLoading: 'Getting location...',
    locationDenied: 'Location denied (default: Jakarta)',
    todoPlaceholder: 'Add a task...',
    online: 'Online',
    offline: 'Offline',
    greetingMorning: 'Good Morning',
    greetingAfternoon: 'Good Afternoon',
    greetingEvening: 'Good Evening',
    greetingNight: 'Good Night',
    prayerTime: 'Prayer Times',
    todoList: 'Todo List',
    prayerSource: 'Source',
    selectMethod: 'Method',
    qibla: 'Qibla',
    ramadan: 'Ramadan',
    imsak: 'Imsak',
    iftar: 'Iftar',
    locationEditTitle: 'Set location manually',
    manualSave: 'Save',
    manualUseGps: 'Use GPS',
    manualLatPlaceholder: 'Latitude (e.g. -8.0983)',
    manualLngPlaceholder: 'Longitude (e.g. 112.4472)',
    manualInvalid: 'Latitude must be -90..90, longitude -180..180',
    eventToday: 'Today',
    eventDaysLeft: 'days left',
    eventIsbatNote: 'estimate, pending official Kemenag (Indonesia) announcement',
    eventHisabNote: 'global hisab calculation, Umm al-Qura',
    remindersTitle: '✨ Daily Deeds',
    reminderDzikirText: 'Morning & Evening Dhikr',
    reminderQuranText: "Qur'an Reading",
    reminderCheckTitle: 'Mark done for today',
    reminderTimeTitle: 'Set reminder time',
    reminderTimeSave: 'Save',
    locationRetryTitle: 'Try again',
    prevQuoteTitle: 'Previous quote',
    nextQuoteTitle: 'Next quote',
    exportTodoTitle: "Export to-dos (JSON)",
    importTodoTitle: "Import to-dos (JSON)",
    leadtimeTitle: 'Notify before prayer time',
    eventRefTitle: 'Islamic date reference',
    reportBugTitle: 'Report a problem',
    settingsTitle: 'Settings',
    settingsCloseTitle: 'Close',
    themeLabel: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    locationPermLabel: 'Location Permission',
    locationPermHint: 'Used for prayer times, qibla & weather',
    permGranted: '✓ Allowed',
    permDenied: '✕ Blocked',
    permPrompt: '? Not asked yet',
    permRequest: 'Request Access',
    permDeniedHint: 'Blocked — click the 🔒 icon in the address bar to re-enable',
    permUnknown: 'Unknown',
    prayerAlertLabel: 'Prayer Time Alerts',
    prayerAlertHint: 'Shows a notification at each prayer time',
    adhanLabel: 'Adhan Sound',
    adhanHint: 'Chrome only — full audio at prayer time',
    reportBugLabel: 'Report a Problem'
  },
  ar: {
    fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء',
    nextPrayer: 'الصلاة القادمة',
    in: 'بعد',
    locationLoading: 'جاري تحديد الموقع...',
    locationDenied: 'الموقع مرفوض (افتراضي: جاكرتا)',
    todoPlaceholder: 'أضف مهمة...',
    online: 'متصل',
    offline: 'غير متصل',
    greetingMorning: 'صباح الخير',
    greetingAfternoon: 'مساء الخير',
    greetingEvening: 'مساء الخير',
    greetingNight: 'تصبح على خير',
    prayerTime: 'مواقيت الصلاة',
    todoList: 'قائمة المهام',
    prayerSource: 'المصدر',
    selectMethod: 'الطريقة',
    qibla: 'القبلة',
    ramadan: 'رمضان',
    imsak: 'الإمساك',
    iftar: 'الإفطار',
    locationEditTitle: 'تعيين الموقع يدويًا',
    manualSave: 'حفظ',
    manualUseGps: 'استخدام GPS',
    manualLatPlaceholder: 'خط العرض (مثال: -8.0983)',
    manualLngPlaceholder: 'خط الطول (مثال: 112.4472)',
    manualInvalid: 'خط العرض من -90 إلى 90، خط الطول من -180 إلى 180',
    eventToday: 'اليوم',
    eventDaysLeft: 'يوم متبقٍ',
    eventIsbatNote: 'تقديري، بانتظار إعلان وزارة الأديان الإندونيسية الرسمي',
    eventHisabNote: 'حساب فلكي عالمي (أم القرى)',
    remindersTitle: '✨ الأعمال اليومية',
    reminderDzikirText: 'أذكار الصباح والمساء',
    reminderQuranText: 'قراءة القرآن',
    reminderCheckTitle: 'تحديد كمنجز اليوم',
    reminderTimeTitle: 'تعيين وقت التذكير',
    reminderTimeSave: 'حفظ',
    locationRetryTitle: 'إعادة المحاولة',
    prevQuoteTitle: 'الاقتباس السابق',
    nextQuoteTitle: 'الاقتباس التالي',
    exportTodoTitle: 'تصدير المهام (JSON)',
    importTodoTitle: 'استيراد المهام (JSON)',
    leadtimeTitle: 'تنبيه قبل وقت الصلاة',
    eventRefTitle: 'مرجع تواريخ المناسبات الإسلامية',
    reportBugTitle: 'الإبلاغ عن مشكلة',
    settingsTitle: 'الإعدادات',
    settingsCloseTitle: 'إغلاق',
    themeLabel: 'المظهر',
    themeDark: 'داكن',
    themeLight: 'فاتح',
    locationPermLabel: 'إذن الموقع',
    locationPermHint: 'يُستخدم لمواقيت الصلاة والقبلة والطقس',
    permGranted: '✓ مسموح',
    permDenied: '✕ محظور',
    permPrompt: '؟ لم يُطلب بعد',
    permRequest: 'طلب الإذن',
    permDeniedHint: 'محظور — انقر أيقونة 🔒 في شريط العنوان لإعادة التفعيل',
    permUnknown: 'غير معروف',
    prayerAlertLabel: 'تنبيهات وقت الصلاة',
    prayerAlertHint: 'تظهر عند دخول كل وقت صلاة',
    adhanLabel: 'صوت الأذان',
    adhanHint: 'كروم فقط — أذان كامل عند دخول وقت الصلاة',
    reportBugLabel: 'الإبلاغ عن مشكلة'
  }
};

// ==================== STATE ====================

let currentLang = localStorage.getItem('muslimboard-lang') || 'id';
let currentMethod = localStorage.getItem('muslimboard-method') || '20'; // Default: Kemenag RI
let currentTheme = localStorage.getItem('muslimboard-theme') || 'dark';
let currentQuoteIndex = Math.floor(Math.random() * quotes[currentLang].length);
let prayerTimes = null;
let userLocation = null;
let prayerElsCache = null;

// ==================== UTILITY FUNCTIONS ====================

function $(selector) { return document.querySelector(selector); }
function pad(n) { return n < 10 ? '0' + n : n; }

function formatTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatCountdown(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  if (hours > 0) {
    return `${hours}j ${pad(minutes)}m`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

// ==================== PRAYER TIMES CALCULATION ====================

/**
 * Simplified prayer time calculation using standard formulas
 * This is a basic implementation - for production, consider using a proper library
 */
function calculatePrayerTimes(latitude, longitude, date = new Date()) {
  const times = {};
  
  // Julian date
  const jd = getJulianDate(date);
  
  // Sun declination and equation of time
  const sunPos = getSunPosition(jd);
  
  // Calculate prayer times
  times.fajr = calculatePrayerTime(latitude, sunPos.declination, -18, sunPos.eqTime, date, longitude);
  times.sunrise = calculatePrayerTime(latitude, sunPos.declination, -0.833, sunPos.eqTime, date, longitude);
  times.dhuhr = calculatePrayerTime(latitude, sunPos.declination, 0, sunPos.eqTime, date, longitude, true);
  times.asr = calculateAsr(latitude, sunPos.declination, sunPos.eqTime, date, longitude);
  times.maghrib = calculatePrayerTime(latitude, sunPos.declination, -0.833, sunPos.eqTime, date, longitude, false, true);
  times.isha = calculatePrayerTime(latitude, sunPos.declination, -17, sunPos.eqTime, date, longitude, false, true);
  // Imsak: conventional 10-minute margin before Fajr (no dedicated angle).
  times.imsak = fixHour(times.fajr - 10 / 60);

  return times;
}

function getJulianDate(date) {
  let a = Math.floor((14 - date.getMonth() - 1) / 12);
  let y = date.getFullYear() + 4800 - a;
  let m = date.getMonth() + 1 + 12 * a - 3;
  return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function getSunPosition(jd) {
  const d = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * d);
  const q = fixAngle(280.459 + 0.98564736 * d);
  const L = fixAngle(q + 1.915 * dsin(g) + 0.020 * dsin(2 * g));
  const e = 23.439 - 0.00000036 * d;
  const RA = darctan2(dcos(e) * dsin(L), dcos(L)) / 15;
  const declination = darcsin(dsin(e) * dsin(L));
  const eqTime = q / 15 - fixHour(RA);
  
  return { declination, eqTime };
}

function fixAngle(a) { return a - 360 * Math.floor(a / 360); }
function fixHour(a) { return a - 24 * Math.floor(a / 24); }
function dsin(d) { return Math.sin(degToRad(d)); }
function dcos(d) { return Math.cos(degToRad(d)); }
function darcsin(d) { return radToDeg(Math.asin(d)); }
function darctan2(y, x) { return radToDeg(Math.atan2(y, x)); }
function degToRad(d) { return d * Math.PI / 180; }
function radToDeg(r) { return r * 180 / Math.PI; }

function calculatePrayerTime(lat, decl, angle, eqTime, date, lng, isDhuhr = false, isMaghrib = false) {
  let time;
  
  if (isDhuhr) {
    time = 12 + (4 * -lng - eqTime) / 60;
  } else if (isMaghrib) {
    time = calculatePrayerTime(lat, decl, angle, eqTime, date, lng);
  } else {
    const D = darccos((dsin(angle) - dsin(lat) * dsin(decl)) / (dcos(lat) * dcos(decl)));
    time = 12 + (isMorningAngle(angle) ? -D : D) * 4 / 60 + (4 * -lng - eqTime) / 60;
  }
  
  // `time` above is a solar (longitude-based) local time, not the device's
  // civil timezone. Convert it to UTC using the true solar offset (lng/15),
  // then re-express it in the device's actual timezone so displayed times
  // match the clock, not the sun.
  const timezone = -date.getTimezoneOffset() / 60;
  const utcTime = time - timezone;
  const localTime = utcTime + (timezone + lng / 15);

  return fixHour(localTime);
}

function calculateAsr(lat, decl, eqTime, date, lng) {
  const shadow = 1; // Standard shadow ratio
  const angle = -darctan2(1, shadow + dtan(Math.abs(lat - decl)));
  return calculatePrayerTime(lat, decl, angle, eqTime, date, lng);
}

function dtan(d) { return Math.tan(degToRad(d)); }
function darccos(x) { return radToDeg(Math.acos(x)); }
function isMorningAngle(angle) { return angle < 0; }

function hourToTime(hour) {
  const h = Math.floor(hour);
  const m = Math.floor((hour - h) * 60);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date;
}

function timeToDecimal(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h + m / 60;
}

// ==================== PRAYER TIMES API ====================

async function fetchPrayerTimesFromAPI(lat, lng, method) {
  try {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=${method}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code === 200 && data.data && data.data.timings) {
      const t = data.data.timings;
      const sourceName = data.data.meta?.method?.name || prayerMethods[method]?.name;
      return {
        fajr: timeToDecimal(t.Fajr),
        sunrise: timeToDecimal(t.Sunrise),
        dhuhr: timeToDecimal(t.Dhuhr),
        asr: timeToDecimal(t.Asr),
        maghrib: timeToDecimal(t.Maghrib),
        isha: timeToDecimal(t.Isha),
        imsak: timeToDecimal(t.Imsak),
        source: sourceName
      };
    }
    throw new Error('Invalid API response');
  } catch (e) {
    console.log('API fetch failed, will fallback to local:', e);
    return null;
  }
}

async function loadPrayerTimes(lat, lng) {
  if (currentMethod !== 'local') {
    const apiTimes = await fetchPrayerTimesFromAPI(lat, lng, currentMethod);
    if (apiTimes) {
      prayerTimes = apiTimes;
      updatePrayerSource(apiTimes.source);
      updatePrayerTimes();
      updateRamadanBanner();
      scheduleNotifications();
      return;
    }
  }

  // Fallback to local calculation
  prayerTimes = calculatePrayerTimes(lat, lng);
  const methodInfo = prayerMethods[currentMethod] || prayerMethods.local;
  const sourceName = currentLang === 'ar' ? methodInfo.nameAr :
                     currentLang === 'en' ? methodInfo.nameEn : methodInfo.name;
  updatePrayerSource(sourceName);
  updatePrayerTimes();
  updateRamadanBanner();
  scheduleNotifications();
}

/**
 * Push the day's prayer times to the background script so it can fire
 * OS notifications via alarms, independent of this tab staying open.
 */
function scheduleNotifications() {
  if (!prayerTimes || !browserAPI.alarms) return;

  const leadMinutes = parseInt(localStorage.getItem('muslimboard-leadtime') || '10', 10);
  const now = new Date();
  const schedule = {};

  ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
    const prayerTime = hourToTime(prayerTimes[prayer]);
    let notifyAt = new Date(prayerTime.getTime() - leadMinutes * 60000);
    if (notifyAt <= now) {
      notifyAt = new Date(notifyAt.getTime() + 24 * 3600000);
    }
    schedule[prayer] = notifyAt.getTime();
  });

  browserAPI.runtime.sendMessage({
    type: 'SCHEDULE_PRAYER_ALARMS',
    schedule,
    lang: currentLang
  }).catch(() => {});
}

function updatePrayerSource(sourceName) {
  const sourceEl = $('#prayer-source');
  const t = translations[currentLang];
  const name = sourceName || (prayerMethods[currentMethod] || prayerMethods.local).name;
  if (sourceEl) {
    sourceEl.textContent = `${t.prayerSource}: ${name}`;
  }
}

// ==================== UI UPDATES ====================

function updateClock() {
  const now = new Date();
  $('#clock').textContent = formatTime(now);
  
  const hour = now.getHours();
  let greeting;
  const t = translations[currentLang];
  
  if (hour >= 5 && hour < 12) greeting = t.greetingMorning;
  else if (hour >= 12 && hour < 15) greeting = t.greetingAfternoon;
  else if (hour >= 15 && hour < 19) greeting = t.greetingEvening;
  else greeting = t.greetingNight;
  
  $('#greeting').textContent = `${greeting}, Muslim`;
}

function getPrayerEls() {
  if (!prayerElsCache) {
    prayerElsCache = {};
    ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
      prayerElsCache[prayer] = {
        time: $(`#${prayer}-time`),
        item: $(`.prayer-item[data-prayer="${prayer}"]`)
      };
    });
  }
  return prayerElsCache;
}

function updatePrayerTimes() {
  if (!prayerTimes || !userLocation) return;

  const prayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const els = getPrayerEls();

  let nextPrayer = null;
  let nextPrayerTime = null;
  let minDiff = Infinity;

  prayers.forEach(prayer => {
    const time = hourToTime(prayerTimes[prayer]);
    const { time: timeEl, item } = els[prayer];
    if (timeEl) timeEl.textContent = formatTime(time);

    if (item) {
      item.classList.remove('active', 'passed');
      const prayerMinutes = time.getHours() * 60 + time.getMinutes();

      if (prayerMinutes <= currentMinutes) {
        item.classList.add('passed');
      }

      const diff = prayerMinutes - currentMinutes;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        nextPrayer = prayer;
        nextPrayerTime = time;
      }
    }
  });

  // Find next prayer (wrap around to next day if needed)
  if (!nextPrayer) {
    nextPrayer = 'fajr';
    nextPrayerTime = hourToTime(prayerTimes.fajr);
    nextPrayerTime.setDate(nextPrayerTime.getDate() + 1);
  }

  // Highlight active prayer
  const activeItem = els[nextPrayer] && els[nextPrayer].item;
  if (activeItem) activeItem.classList.add('active');

  // Update countdown
  const diff = nextPrayerTime - now;
  const t = translations[currentLang];
  $('#next-prayer-name').textContent = t[nextPrayer] || nextPrayer;
  $('#next-prayer-countdown').textContent = formatCountdown(diff);
}

function updateQuote() {
  const quote = quotes[currentLang][currentQuoteIndex];
  const textEl = $('#quote-text');
  const sourceEl = $('#quote-source');
  
  // Fade out
  textEl.style.opacity = '0';
  sourceEl.style.opacity = '0';
  
  setTimeout(() => {
    textEl.textContent = quote.text;
    sourceEl.textContent = `— ${quote.source}`;
    
    if (currentLang === 'ar') {
      textEl.classList.add('arabic');
      textEl.dir = 'rtl';
    } else {
      textEl.classList.remove('arabic');
      textEl.dir = 'ltr';
    }
    
    // Fade in
    textEl.style.opacity = '1';
    sourceEl.style.opacity = '1';
  }, 300);
}

function updateInternetStatus() {
  const status = $('#internet-status');
  const dot = status.querySelector('.status-dot');
  const text = status.querySelector('.status-text');
  const t = translations[currentLang];
  
  if (navigator.onLine) {
    dot.className = 'status-dot online';
    text.textContent = t.online;
  } else {
    dot.className = 'status-dot offline';
    text.textContent = t.offline;
  }
}

function updateLanguageUI() {
  const t = translations[currentLang];
  
  // Update prayer names
  ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
    const el = $(`.prayer-item[data-prayer="${prayer}"] .prayer-name`);
    if (el) el.textContent = t[prayer];
  });
  
  // Update todo placeholder
  $('#todo-input').placeholder = t.todoPlaceholder;
  
  // Update section titles
  $('.prayer-times .card-header h2').textContent = `🕌 ${t.prayerTime}`;
  $('.todo-list .card-header h2').textContent = `📝 ${t.todoList}`;
  
  // Update method select label
  const methodLabel = $('.prayer-method-select label');
  if (methodLabel) methodLabel.textContent = t.selectMethod + ':';
  
  // Update prayer source with current method name
  const methodInfo = prayerMethods[currentMethod] || prayerMethods.local;
  const sourceName = currentLang === 'ar' ? methodInfo.nameAr : 
                     currentLang === 'en' ? methodInfo.nameEn : methodInfo.name;
  updatePrayerSource(sourceName);
  
  // Refresh quote, internet status, and hijri date
  updateQuote();
  updateInternetStatus();
  loadHijriDate();
  updateRamadanBanner();
  if (userLocation) updateQibla(userLocation.lat, userLocation.lng);

  $('#location-name').title = t.locationEditTitle;
  $('#manual-save').textContent = t.manualSave;
  $('#manual-use-gps').textContent = t.manualUseGps;
  $('#manual-lat').placeholder = t.manualLatPlaceholder;
  $('#manual-lng').placeholder = t.manualLngPlaceholder;

  $('#event-ref').style.display = currentLang === 'en' ? 'inline-block' : 'none';
  $('#event-ref').title = t.eventRefTitle;
  computeUpcomingEvents();

  renderReminders();
  scheduleDailyReminder();

  $('#next-prayer-label').textContent = t.nextPrayer;
  $('#next-prayer-in-label').textContent = t.in;
  $('#location-retry').title = t.locationRetryTitle;
  $('#prev-quote').title = t.prevQuoteTitle;
  $('#next-quote').title = t.nextQuoteTitle;
  $('#todo-export').title = t.exportTodoTitle;
  $('#todo-import-label').title = t.importTodoTitle;
  $('.leadtime-icon').title = t.leadtimeTitle;
  $('#report-bug').title = t.reportBugTitle;

  $('#settings-toggle').title = t.settingsTitle;
  $('#settings-close').title = t.settingsCloseTitle;
  $('#settings-panel-title').textContent = `⚙️ ${t.settingsTitle}`;
  $('#theme-label').textContent = t.themeLabel;
  $('#theme-dark-label').textContent = t.themeDark;
  $('#theme-light-label').textContent = t.themeLight;
  $('#location-perm-label').textContent = t.locationPermLabel;
  if ($('#settings-overlay').style.display === 'flex') refreshLocationPermissionUI();

  $('#prayer-alert-label').textContent = t.prayerAlertLabel;
  $('#prayer-alert-hint').textContent = t.prayerAlertHint;
  $('#adhan-label').textContent = t.adhanLabel;
  $('#adhan-hint').textContent = t.adhanHint;
  $('#report-bug-label').textContent = t.reportBugLabel;

  // Refresh weather description if data exists
  const weatherDesc = $('#weather-desc');
  const weatherTemp = $('#weather-temp');
  if (weatherTemp && weatherTemp.textContent !== '--°C' && weatherTemp.dataset.code) {
    const wmo = weatherCodes[parseInt(weatherTemp.dataset.code)] || weatherCodes[0];
    weatherDesc.textContent = wmo[currentLang] || wmo.id;
  }
}

// ==================== TODO LIST ====================

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('muslimboard-todos') || '[]');
  const container = $('#todo-items');
  container.innerHTML = '';
  
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = `todo-item${todo.completed ? ' completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <button class="todo-delete" data-index="${index}">×</button>
    `;
    container.appendChild(li);
  });
}

function addTodo() {
  const input = $('#todo-input');
  const text = input.value.trim();
  if (!text) return;
  
  const todos = JSON.parse(localStorage.getItem('muslimboard-todos') || '[]');
  todos.push({ text, completed: false });
  localStorage.setItem('muslimboard-todos', JSON.stringify(todos));
  
  input.value = '';
  loadTodos();
}

function toggleTodo(index) {
  const todos = JSON.parse(localStorage.getItem('muslimboard-todos') || '[]');
  todos[index].completed = !todos[index].completed;
  localStorage.setItem('muslimboard-todos', JSON.stringify(todos));
  loadTodos();
}

function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem('muslimboard-todos') || '[]');
  todos.splice(index, 1);
  localStorage.setItem('muslimboard-todos', JSON.stringify(todos));
  loadTodos();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function exportTodos() {
  const todos = localStorage.getItem('muslimboard-todos') || '[]';
  const blob = new Blob([todos], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `muslimdash-todos-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importTodosFromFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        localStorage.setItem('muslimboard-todos', JSON.stringify(imported));
        loadTodos();
      }
    } catch (err) {
      console.log('Todo import failed:', err);
    }
  };
  reader.readAsText(file);
}

// ==================== QIBLA DIRECTION ====================

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function calculateQiblaBearing(lat, lng) {
  const phi1 = degToRad(lat);
  const phi2 = degToRad(KAABA_LAT);
  const deltaLambda = degToRad(KAABA_LNG - lng);
  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  return (radToDeg(Math.atan2(y, x)) + 360) % 360;
}

function updateQibla(lat, lng) {
  const bearing = calculateQiblaBearing(lat, lng);
  const t = translations[currentLang];
  const info = $('#qibla-info');
  const arrow = $('#qibla-arrow');
  const text = $('#qibla-text');
  if (!info || !arrow || !text) return;

  info.style.display = 'flex';
  arrow.style.transform = `rotate(${bearing}deg)`;
  text.textContent = `${t.qibla}: ${Math.round(bearing)}°`;
}

// ==================== RAMADAN MODE ====================

let currentHijriMonth = null;
let currentHijriDay = null;
let currentHijriYear = null;

function updateRamadanBanner() {
  const banner = $('#ramadan-banner');
  if (!banner) return;

  const isRamadan = currentHijriMonth === 9 && prayerTimes && prayerTimes.imsak != null;
  banner.style.display = isRamadan ? 'flex' : 'none';
  if (!isRamadan) return;

  const t = translations[currentLang];
  $('#ramadan-label').textContent = t.ramadan;
  $('#imsak-label').textContent = t.imsak;
  $('#iftar-label').textContent = t.iftar;
  $('#imsak-time').textContent = formatTime(hourToTime(prayerTimes.imsak));
  $('#iftar-time').textContent = formatTime(hourToTime(prayerTimes.maghrib));
}

// ==================== UPCOMING ISLAMIC EVENTS ====================

/**
 * Fixed Hijri month/day for each event. All dates are computed via the
 * Aladhan hToG endpoint (Umm al-Qura based hisab) — the same source
 * already used for prayer times/Hijri date elsewhere in this app.
 *
 * IMPORTANT CAVEAT: Ramadhan/Idul Fitri/Idul Adha start dates in
 * Indonesia are only finalized by Kemenag's Sidang Isbat (moon-sighting
 * confirmation) 1 day before the event, and can shift by a day from any
 * calculated estimate. There is no public API for Kemenag's official
 * dates, so the "Indonesia (Kemenag)" reference below only changes the
 * disclaimer wording shown to the user — the underlying computed date is
 * identical either way.
 */
const ISLAMIC_EVENTS = [
  { key: 'muharram', month: 1, day: 1, id: 'Tahun Baru Islam', en: 'Islamic New Year', ar: 'رأس السنة الهجرية' },
  { key: 'maulid', month: 3, day: 12, id: 'Maulid Nabi Muhammad', en: "Mawlid (Prophet's Birthday)", ar: 'المولد النبوي' },
  { key: 'isramiraj', month: 7, day: 27, id: "Isra Mi'raj", en: "Isra and Mi'raj", ar: 'الإسراء والمعراج' },
  { key: 'ramadhan', month: 9, day: 1, id: 'Awal Ramadhan', en: 'Start of Ramadan', ar: 'بداية رمضان' },
  { key: 'nuzululquran', month: 9, day: 17, id: "Nuzulul Qur'an", en: 'Nuzul Al-Quran', ar: 'نزول القرآن' },
  { key: 'idulfitri', month: 10, day: 1, id: 'Idul Fitri', en: 'Eid al-Fitr', ar: 'عيد الفطر' },
  { key: 'arafah', month: 12, day: 9, id: 'Puasa Arafah', en: 'Day of Arafah', ar: 'يوم عرفة' },
  { key: 'iduladha', month: 12, day: 10, id: 'Idul Adha', en: 'Eid al-Adha', ar: 'عيد الأضحى' }
];

const BIG_THREE_EVENT_KEYS = ['ramadhan', 'idulfitri', 'iduladha'];

function getEventRef() {
  if (currentLang !== 'en') return 'id';
  return localStorage.getItem('muslimboard-event-ref') || 'id';
}

function parseDdMmYyyy(str) {
  const [d, m, y] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

async function computeUpcomingEvents() {
  if (currentHijriYear == null || currentHijriMonth == null || currentHijriDay == null) return;

  const cacheKey = 'muslimboard-islamic-events';
  const todayKey = new Date().toDateString();
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (cached && cached.date === todayKey && Array.isArray(cached.events)) {
      renderUpcomingEvent(cached.events);
      return;
    }
  } catch (e) {
    // ignore malformed cache
  }

  const results = await Promise.all(ISLAMIC_EVENTS.map(async (ev) => {
    const isLaterOrToday = ev.month > currentHijriMonth || (ev.month === currentHijriMonth && ev.day >= currentHijriDay);
    const targetYear = isLaterOrToday ? currentHijriYear : currentHijriYear + 1;

    try {
      const dateStr = `${pad(ev.day)}-${pad(ev.month)}-${targetYear}`;
      const res = await fetch(`https://api.aladhan.com/v1/hToG/${dateStr}`);
      const data = await res.json();
      const gregorian = data && data.data && data.data.gregorian && data.data.gregorian.date;
      if (!gregorian) return null;
      return { key: ev.key, gregorian };
    } catch (e) {
      return null;
    }
  }));

  const events = results.filter(Boolean);
  localStorage.setItem(cacheKey, JSON.stringify({ date: todayKey, events }));
  renderUpcomingEvent(events);
}

function renderUpcomingEvent(events) {
  const eventEl = $('#upcoming-event');
  const dividerEl = $('#event-divider');
  if (!eventEl || !dividerEl || !events || events.length === 0) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const withDays = events
    .map(e => {
      const eventDate = parseDdMmYyyy(e.gregorian);
      const daysUntil = Math.round((eventDate - today) / 86400000);
      return { ...e, eventDate, daysUntil };
    })
    .filter(e => e.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  if (withDays.length === 0) return;

  const next = withDays[0];
  const eventDef = ISLAMIC_EVENTS.find(ev => ev.key === next.key);
  if (!eventDef) return;

  const t = translations[currentLang];
  const label = eventDef[currentLang] || eventDef.id;
  const locale = currentLang === 'ar' ? 'ar-SA' : currentLang === 'en' ? 'en-US' : 'id-ID';
  const dateLabel = next.eventDate.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  const daysText = next.daysUntil === 0 ? t.eventToday : `${next.daysUntil} ${t.eventDaysLeft}`;

  eventEl.textContent = `🎉 ${label}: ${daysText}`;

  let tooltip = `${label} — ${dateLabel}`;
  if (BIG_THREE_EVENT_KEYS.includes(next.key)) {
    tooltip += getEventRef() === 'id' ? ` (${t.eventIsbatNote})` : ` (${t.eventHisabNote})`;
  }
  eventEl.title = tooltip;

  eventEl.style.display = 'inline';
  dividerEl.style.display = 'inline';
}

// ==================== DAILY REMINDERS (DZIKIR & TILAWAH) ====================

let reminderState = { date: '', dzikir: false, quran: false };

function loadReminderState() {
  const todayKey = new Date().toDateString();
  try {
    const saved = JSON.parse(localStorage.getItem('muslimboard-reminders') || 'null');
    if (saved && saved.date === todayKey) {
      reminderState = saved;
      return;
    }
  } catch (e) {
    // ignore malformed state
  }
  // New day (or first run) — reset both to not-done.
  reminderState = { date: todayKey, dzikir: false, quran: false };
  localStorage.setItem('muslimboard-reminders', JSON.stringify(reminderState));
}

function toggleReminder(key) {
  reminderState[key] = !reminderState[key];
  localStorage.setItem('muslimboard-reminders', JSON.stringify(reminderState));
  renderReminders();
}

function renderReminders() {
  const t = translations[currentLang];
  $('#reminders-title').textContent = t.remindersTitle;
  $('#reminder-time-toggle').title = t.reminderTimeTitle;
  $('#reminder-time-save').textContent = t.reminderTimeSave;
  $('#reminder-dzikir-text').textContent = t.reminderDzikirText;
  $('#reminder-quran-text').textContent = t.reminderQuranText;
  $('#reminder-dzikir-check').title = t.reminderCheckTitle;
  $('#reminder-quran-check').title = t.reminderCheckTitle;

  $('#reminder-dzikir').classList.toggle('done', !!reminderState.dzikir);
  $('#reminder-quran').classList.toggle('done', !!reminderState.quran);
  $('#reminder-dzikir-check').textContent = reminderState.dzikir ? '✓' : '';
  $('#reminder-quran-check').textContent = reminderState.quran ? '✓' : '';
}

/**
 * One gentle daily notification covering both dzikir & Qur'an reading —
 * deliberately a single nudge (not one alert per item) so it doesn't
 * feel naggy, unlike the 5x/day prayer alerts.
 */
function scheduleDailyReminder() {
  if (!browserAPI.alarms) return;
  const time = localStorage.getItem('muslimboard-reminder-time') || '20:00';
  const [hour, minute] = time.split(':').map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return;

  browserAPI.runtime.sendMessage({
    type: 'SCHEDULE_DAILY_REMINDER',
    hour,
    minute,
    lang: currentLang
  }).catch(() => {});
}

// ==================== ERROR LOG & BUG REPORT ====================

/**
 * Local-only ring buffer, capped at MAX_ERROR_LOG entries — only written
 * when an actual error fires, never a general activity log. Nothing here
 * ever leaves the device automatically; it's only read when the user
 * explicitly clicks "Report a problem", which opens a pre-filled mailto
 * link. No backend, no telemetry — keeps the privacy policy's "no
 * tracking" claim true.
 */
const MAX_ERROR_LOG = 20;

function logError(message, detail) {
  try {
    const log = JSON.parse(localStorage.getItem('muslimboard-errorlog') || '[]');
    log.push({
      time: new Date().toISOString(),
      message: String(message).slice(0, 300),
      detail: detail ? String(detail).split('\n')[0].slice(0, 300) : ''
    });
    while (log.length > MAX_ERROR_LOG) log.shift();
    localStorage.setItem('muslimboard-errorlog', JSON.stringify(log));
  } catch (e) {
    // localStorage full/unavailable — nothing more we can do
  }
}

window.addEventListener('error', (e) => {
  logError(e.message, e.error && e.error.stack ? e.error.stack : `${e.filename}:${e.lineno}:${e.colno}`);
});

window.addEventListener('unhandledrejection', (e) => {
  const reason = e.reason;
  const msg = reason && reason.message ? reason.message : String(reason);
  logError('Unhandled promise rejection: ' + msg, reason && reason.stack ? reason.stack : '');
});

function buildBugReportBody() {
  let log = [];
  try {
    log = JSON.parse(localStorage.getItem('muslimboard-errorlog') || '[]');
  } catch (e) {
    // ignore malformed log
  }
  const recent = log.slice(-5);
  const version = (browserAPI.runtime.getManifest && browserAPI.runtime.getManifest().version) || 'unknown';

  const lines = [
    `The Muslim Way v${version}`,
    `Bahasa: ${currentLang}`,
    `Browser: ${navigator.userAgent}`,
    '',
    'Error terakhir yang tercatat:'
  ];

  if (recent.length === 0) {
    lines.push('(tidak ada error tercatat)');
  } else {
    recent.forEach(entry => {
      lines.push(`- [${entry.time}] ${entry.message}${entry.detail ? ' — ' + entry.detail : ''}`);
    });
  }

  lines.push('', 'Ceritakan apa yang terjadi sebelum masalah ini muncul:', '');

  return lines.join('\n').slice(0, 1800);
}

function reportProblem() {
  const subject = encodeURIComponent('The Muslim Way - Laporan Masalah');
  const body = encodeURIComponent(buildBugReportBody());
  window.open(`mailto:kontak@tukangweb.id?subject=${subject}&body=${body}`, '_self');
}

// ==================== OPTIONS PANEL (Theme & Adhan) ====================

function applyTheme(theme) {
  currentTheme = theme;
  document.body.classList.toggle('theme-light', theme === 'light');
  localStorage.setItem('muslimboard-theme', theme);

  const darkBtn = $('#theme-dark-btn');
  const lightBtn = $('#theme-light-btn');
  if (darkBtn) darkBtn.classList.toggle('active', theme === 'dark');
  if (lightBtn) lightBtn.classList.toggle('active', theme === 'light');
}

function getAdhanEnabled() {
  return localStorage.getItem('muslimboard-adhan') === '1';
}

function setAdhanEnabled(enabled) {
  localStorage.setItem('muslimboard-adhan', enabled ? '1' : '0');
  browserAPI.runtime.sendMessage({ type: 'SET_ADHAN_ENABLED', enabled }).catch(() => {});
}

// Notifications have always fired by default, so absence of the key
// (new install, or set before this toggle existed) must mean "on".
function getPrayerAlertEnabled() {
  return localStorage.getItem('muslimboard-prayer-alert') !== '0';
}

function setPrayerAlertEnabled(enabled) {
  localStorage.setItem('muslimboard-prayer-alert', enabled ? '1' : '0');
  browserAPI.runtime.sendMessage({ type: 'SET_PRAYER_ALERT_ENABLED', enabled }).catch(() => {});
}

/**
 * The extension only ever asks for one real permission from the user:
 * location (everything else — notifications/storage/alarms — is granted
 * automatically at install since they're declared in the manifest).
 * navigator.permissions lets us show its actual current state instead of
 * guessing from whether we already have a location cached.
 */
async function refreshLocationPermissionUI() {
  const badge = $('#location-perm-badge');
  const btn = $('#location-perm-btn');
  if (!badge || !btn) return;
  const t = translations[currentLang];

  if (!navigator.permissions || !navigator.permissions.query) {
    badge.textContent = t.permUnknown;
    badge.className = 'perm-badge';
    btn.style.display = 'none';
    return;
  }

  try {
    const status = await navigator.permissions.query({ name: 'geolocation' });
    renderLocationPermState(status.state);
    status.onchange = () => renderLocationPermState(status.state);
  } catch (e) {
    badge.textContent = t.permUnknown;
    badge.className = 'perm-badge';
    btn.style.display = 'none';
  }
}

function renderLocationPermState(state) {
  const badge = $('#location-perm-badge');
  const hint = $('#location-perm-hint');
  const btn = $('#location-perm-btn');
  const t = translations[currentLang];

  badge.className = 'perm-badge perm-' + state;

  if (state === 'granted') {
    badge.textContent = t.permGranted;
    hint.textContent = t.locationPermHint;
    btn.style.display = 'none';
  } else if (state === 'denied') {
    badge.textContent = t.permDenied;
    hint.textContent = t.permDeniedHint;
    btn.style.display = 'none';
  } else {
    badge.textContent = t.permPrompt;
    hint.textContent = t.locationPermHint;
    btn.textContent = t.permRequest;
    btn.style.display = 'inline-block';
  }
}

/**
 * Only reachable while state is "prompt" (the button is hidden for
 * "granted"/"denied") — calling getCurrentPosition is what actually
 * triggers the browser's native permission dialog.
 */
function requestLocationPermission() {
  navigator.geolocation.getCurrentPosition(
    async () => {
      await refreshLocationPermissionUI();
      await useFreshGps();
    },
    () => refreshLocationPermissionUI()
  );
}

function openSettingsPanel() {
  $('#settings-overlay').style.display = 'flex';
  refreshLocationPermissionUI();
}

function closeSettingsPanel() {
  $('#settings-overlay').style.display = 'none';
}

// ==================== LOCATION & INIT ====================

function getManualLocation() {
  try {
    const raw = JSON.parse(localStorage.getItem('muslimboard-manual-location') || 'null');
    if (raw && typeof raw.lat === 'number' && typeof raw.lng === 'number') return raw;
  } catch (e) {
    // ignore malformed value
  }
  return null;
}

function saveManualLocation(lat, lng) {
  localStorage.setItem('muslimboard-manual-location', JSON.stringify({ lat, lng }));
}

function clearManualLocation() {
  localStorage.removeItem('muslimboard-manual-location');
}

/**
 * Ask the browser for one fresh GPS/network fix, ignoring any cached
 * position — used for explicit "retry" / "use GPS" actions so a bad
 * cached fix (common on desktops without GPS, relying on WiFi/IP
 * positioning) doesn't get handed back again.
 */
function fetchFreshGpsPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error('no geolocation')); return; }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      reject,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });
}

async function applyLocation(lat, lng) {
  userLocation = { lat, lng };
  await Promise.all([
    getLocationName(lat, lng),
    loadWeather(lat, lng)
  ]);
  updateQibla(lat, lng);
  await loadPrayerTimes(lat, lng);
}

function getLocation() {
  return new Promise((resolve) => {
    const t = translations[currentLang];
    $('#location-name').textContent = t.locationLoading;
    $('#location-retry').style.display = 'none';

    const manual = getManualLocation();
    if (manual) {
      userLocation = manual;
      Promise.all([
        getLocationName(manual.lat, manual.lng),
        loadWeather(manual.lat, manual.lng)
      ]).then(() => resolve(userLocation));
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // Load weather and location name in parallel
          await Promise.all([
            getLocationName(userLocation.lat, userLocation.lng),
            loadWeather(userLocation.lat, userLocation.lng)
          ]);

          resolve(userLocation);
        },
        async () => {
          // Default to Jakarta
          userLocation = { lat: -6.2088, lng: 106.8456 };
          $('#location-name').textContent = t.locationDenied;
          $('#location-retry').style.display = 'inline-block';

          await Promise.all([
            getLocationName(userLocation.lat, userLocation.lng),
            loadWeather(userLocation.lat, userLocation.lng)
          ]);

          resolve(userLocation);
        },
        // maximumAge lets the browser reuse a recent GPS fix instead of
        // re-acquiring one on every new-tab open. Explicit retry bypasses
        // this via fetchFreshGpsPosition().
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 30 * 60 * 1000 }
      );
    } else {
      userLocation = { lat: -6.2088, lng: 106.8456 };
      $('#location-name').textContent = t.locationDenied;
      $('#location-retry').style.display = 'inline-block';

      Promise.all([
        getLocationName(userLocation.lat, userLocation.lng),
        loadWeather(userLocation.lat, userLocation.lng)
      ]).then(() => resolve(userLocation));
    }
  });
}

async function useFreshGps() {
  clearManualLocation();
  const t = translations[currentLang];
  $('#location-name').textContent = t.locationLoading;
  $('#location-retry').style.display = 'none';

  try {
    const fresh = await fetchFreshGpsPosition();
    await applyLocation(fresh.lat, fresh.lng);
  } catch (e) {
    $('#location-name').textContent = t.locationDenied;
    $('#location-retry').style.display = 'inline-block';
    await applyLocation(-6.2088, 106.8456);
  }
}

function updateDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const locale = currentLang === 'ar' ? 'ar-SA' : currentLang === 'id' ? 'id-ID' : 'en-US';
  $('#current-date').textContent = now.toLocaleDateString(locale, options);
}

// ==================== WEATHER ====================

async function loadWeather(lat, lng) {
  const weatherIcon = $('#weather-icon');
  const weatherTemp = $('#weather-temp');
  const weatherDesc = $('#weather-desc');
  
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );
    const data = await response.json();
    
    if (data.current_weather) {
      const code = data.current_weather.weathercode;
      const temp = Math.round(data.current_weather.temperature);
      const wmo = weatherCodes[code] || weatherCodes[0];
      
      weatherIcon.textContent = wmo.icon;
      weatherTemp.textContent = `${temp}°C`;
      weatherTemp.dataset.code = code;
      weatherDesc.textContent = wmo[currentLang] || wmo.id;
    }
  } catch (e) {
    console.log('Weather load failed:', e);
    weatherDesc.textContent = currentLang === 'id' ? 'Gagal memuat cuaca' : 
                               currentLang === 'ar' ? 'فشل تحميل الطقس' : 'Failed to load weather';
  }
}

// ==================== HIJRI DATE ====================

async function loadHijriDate() {
  const hijriEl = $('#hijri-date');
  
  try {
    const now = new Date();
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    
    const response = await fetch(
      `https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`
    );
    const data = await response.json();
    
    if (data.code === 200 && data.data && data.data.hijri) {
      const hijri = data.data.hijri;
      const monthName = currentLang === 'ar' ? hijri.month.ar : hijri.month.en;
      hijriEl.textContent = `${hijri.day} ${monthName} ${hijri.year} AH`;
      currentHijriDay = parseInt(hijri.day, 10);
      currentHijriMonth = parseInt(hijri.month.number, 10);
      currentHijriYear = parseInt(hijri.year, 10);
      updateRamadanBanner();
      computeUpcomingEvents();
    }
  } catch (e) {
    console.log('Hijri date load failed:', e);
    hijriEl.textContent = '-';
  }
}

// ==================== REVERSE GEOCODING ====================

async function getLocationName(lat, lng) {
  const locEl = $('#current-location');
  const prayerLocEl = $('#location-name');
  
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`
    );
    const data = await response.json();
    
    const city = data.city || data.locality || '';
    const country = data.countryName || '';
    let displayName;
    
    if (city && country) {
      displayName = `${city}, ${country}`;
    } else if (city) {
      displayName = city;
    } else {
      displayName = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    }
    
    locEl.textContent = displayName;
    prayerLocEl.textContent = displayName;
  } catch (e) {
    console.log('Geocoding failed:', e);
    const fallback = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    locEl.textContent = fallback;
    prayerLocEl.textContent = fallback;
  }
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
  // Quote navigation
  $('#prev-quote').addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex - 1 + quotes[currentLang].length) % quotes[currentLang].length;
    updateQuote();
  });
  
  $('#next-quote').addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes[currentLang].length;
    updateQuote();
  });
  
  // Todo
  $('#add-todo').addEventListener('click', addTodo);
  $('#todo-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
  
  $('#todo-items').addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
      toggleTodo(parseInt(e.target.dataset.index));
    }
    if (e.target.classList.contains('todo-delete')) {
      deleteTodo(parseInt(e.target.dataset.index));
    }
  });

  // Daily reminders (dzikir & Qur'an)
  $('#reminder-dzikir-check').addEventListener('click', () => toggleReminder('dzikir'));
  $('#reminder-quran-check').addEventListener('click', () => toggleReminder('quran'));

  $('#reminder-time-toggle').addEventListener('click', () => {
    const form = $('#reminder-time-form');
    const showing = form.style.display === 'flex';
    form.style.display = showing ? 'none' : 'flex';
    if (!showing) {
      $('#reminder-time-input').value = localStorage.getItem('muslimboard-reminder-time') || '20:00';
    }
  });

  $('#reminder-time-save').addEventListener('click', () => {
    const value = $('#reminder-time-input').value;
    if (!value) return;
    localStorage.setItem('muslimboard-reminder-time', value);
    $('#reminder-time-form').style.display = 'none';
    scheduleDailyReminder();
  });

  $('#todo-export').addEventListener('click', exportTodos);
  $('#todo-import-file').addEventListener('change', (e) => {
    if (e.target.files[0]) importTodosFromFile(e.target.files[0]);
    e.target.value = '';
  });

  // Location retry (forces a fresh GPS fix, ignoring cache/manual override)
  $('#location-retry').addEventListener('click', useFreshGps);

  // Manual location override — click the location name itself, like a link
  $('#location-name').addEventListener('click', () => {
    const form = $('#location-manual-form');
    const showing = form.style.display === 'flex';
    form.style.display = showing ? 'none' : 'flex';
    $('#location-manual-error').classList.remove('visible');
    if (!showing && userLocation) {
      $('#manual-lat').value = userLocation.lat.toFixed(4);
      $('#manual-lng').value = userLocation.lng.toFixed(4);
    }
  });

  $('#manual-save').addEventListener('click', async () => {
    const errEl = $('#location-manual-error');
    const t = translations[currentLang];
    // Accept comma as decimal separator too (common in id-ID input habits).
    const lat = parseFloat($('#manual-lat').value.trim().replace(',', '.'));
    const lng = parseFloat($('#manual-lng').value.trim().replace(',', '.'));

    if (Number.isNaN(lat) || Number.isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      errEl.textContent = t.manualInvalid;
      errEl.classList.add('visible');
      return;
    }

    errEl.classList.remove('visible');
    saveManualLocation(lat, lng);
    $('#location-manual-form').style.display = 'none';
    $('#location-retry').style.display = 'none';
    await applyLocation(lat, lng);
  });

  $('#manual-use-gps').addEventListener('click', () => {
    $('#location-manual-form').style.display = 'none';
    useFreshGps();
  });

  // Notification lead time
  const savedLeadTime = localStorage.getItem('muslimboard-leadtime') || '10';
  $('#notif-leadtime').value = savedLeadTime;
  $('#notif-leadtime').addEventListener('change', (e) => {
    localStorage.setItem('muslimboard-leadtime', e.target.value);
    scheduleNotifications();
  });

  // Prayer method
  $('#prayer-method').value = currentMethod;
  $('#prayer-method').addEventListener('change', async (e) => {
    currentMethod = e.target.value;
    localStorage.setItem('muslimboard-method', currentMethod);
    if (userLocation) {
      await loadPrayerTimes(userLocation.lat, userLocation.lng);
    }
  });
  
  // Language
  $('#language-select').value = currentLang;
  $('#language-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('muslimboard-lang', currentLang);
    currentQuoteIndex = Math.floor(Math.random() * quotes[currentLang].length);
    updateLanguageUI();
    updateDate();
  });

  // Islamic event date reference (only meaningful/shown for English UI)
  $('#event-ref').value = localStorage.getItem('muslimboard-event-ref') || 'id';
  $('#event-ref').addEventListener('change', (e) => {
    localStorage.setItem('muslimboard-event-ref', e.target.value);
    computeUpcomingEvents();
  });

  // Internet status
  window.addEventListener('online', updateInternetStatus);
  window.addEventListener('offline', updateInternetStatus);

  // Bug report
  $('#report-bug').addEventListener('click', reportProblem);

  // Options panel
  $('#settings-toggle').addEventListener('click', openSettingsPanel);
  $('#settings-close').addEventListener('click', closeSettingsPanel);
  $('#settings-overlay').addEventListener('click', (e) => {
    if (e.target === $('#settings-overlay')) closeSettingsPanel();
  });

  $('#location-perm-btn').addEventListener('click', requestLocationPermission);

  $('#theme-dark-btn').addEventListener('click', () => applyTheme('dark'));
  $('#theme-light-btn').addEventListener('click', () => applyTheme('light'));

  $('#prayer-alert-toggle').checked = getPrayerAlertEnabled();
  $('#prayer-alert-toggle').addEventListener('change', (e) => setPrayerAlertEnabled(e.target.checked));

  $('#adhan-toggle').checked = getAdhanEnabled();
  $('#adhan-toggle').addEventListener('change', (e) => setAdhanEnabled(e.target.checked));
}

// ==================== INIT ====================

/**
 * Safe curated Picsum photo IDs (nature/landscape/architecture only)
 * These IDs are known to be scenic photos without people
 */
const safePicsumIds = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  28, 29, 37, 38, 42, 43, 44, 45, 47, 48,
  54, 55, 56, 57, 60, 61, 62, 63, 65, 66,
  67, 68, 74, 75, 76, 77, 78, 80, 82, 83,
  84, 85, 86, 87, 88, 101, 103, 104, 105, 106,
  107, 108, 110, 112, 113, 115, 116, 119, 120, 122,
  123, 124, 125, 126, 127, 128, 129, 130, 132, 133,
  134, 135, 136, 137, 139, 140, 142, 143, 144, 145,
  146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
  157, 158, 159, 160, 161, 162, 163, 164, 165, 166,
  167, 168, 169, 170, 171, 172, 173, 174, 175, 176,
  177, 178, 179, 180, 181, 182, 183, 184, 185, 186,
  187, 188, 189, 190, 191, 192, 193, 194, 195, 196,
  197, 198, 199
];

/**
 * Bing's Image of the Day only changes once every 24h, so cache the picked
 * URL for the day and skip the API call on every subsequent new-tab open.
 */
function getCachedWallpaperUrl() {
  try {
    const cached = JSON.parse(localStorage.getItem('muslimboard-wallpaper') || 'null');
    if (cached && cached.date === new Date().toDateString() && cached.url) {
      return cached.url;
    }
  } catch (e) {
    // ignore malformed cache
  }
  return null;
}

function cacheWallpaperUrl(url) {
  localStorage.setItem('muslimboard-wallpaper', JSON.stringify({ url, date: new Date().toDateString() }));
}

/**
 * Load wallpaper from Bing Image of the Day (curated, generally safe)
 */
async function loadBingWallpaper() {
  const cachedUrl = getCachedWallpaperUrl();
  if (cachedUrl) {
    const cachedImg = new Image();
    cachedImg.onload = () => document.body.style.setProperty('--bg-image', `url(${cachedUrl})`);
    cachedImg.onerror = () => loadPicsumWallpaper();
    cachedImg.src = cachedUrl;
    return;
  }

  try {
    const response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=en-US');
    const data = await response.json();

    if (data.images && data.images.length > 0) {
      const randomImage = data.images[Math.floor(Math.random() * data.images.length)];
      const imageUrl = `https://www.bing.com${randomImage.urlbase}_1920x1080.jpg`;

      const img = new Image();
      img.onload = () => {
        document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
        cacheWallpaperUrl(imageUrl);
      };
      img.onerror = () => {
        loadPicsumWallpaper();
      };
      img.src = imageUrl;
      return;
    }
  } catch (e) {
    console.log('Bing wallpaper failed:', e);
  }
  loadPicsumWallpaper();
}

/**
 * Load wallpaper from curated Picsum IDs (nature/landscape only)
 */
function loadPicsumWallpaper() {
  const randomId = safePicsumIds[Math.floor(Math.random() * safePicsumIds.length)];
  const imageUrl = `https://picsum.photos/id/${randomId}/1920/1080`;
  
  const img = new Image();
  img.onload = () => {
    document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
  };
  img.onerror = () => {
    // Ultimate fallback: solid gradient
    document.body.style.setProperty('--bg-image', 'none');
  };
  img.src = imageUrl;
}

/**
 * Load safe wallpaper
 * Priority: Bing (curated) → Picsum curated IDs → solid gradient
 */
function loadWallpaper() {
  loadBingWallpaper();
}

async function init() {
  setupEventListeners();
  applyTheme(currentTheme);
  $('#event-ref').style.display = currentLang === 'en' ? 'inline-block' : 'none';
  loadTodos();
  loadReminderState();
  renderReminders();
  scheduleDailyReminder();
  // HTML ships hardcoded in Indonesian; if a returning user's saved
  // language differs, apply translations now instead of waiting for
  // them to touch the language dropdown again.
  if (currentLang !== 'id') updateLanguageUI();
  loadWallpaper();
  updateDate();
  updateClock();
  updateQuote();
  updateInternetStatus();
  loadHijriDate(); // Load hijri date independently
  
  // Get location and load prayer times (also loads weather & location name)
  await getLocation();
  updateQibla(userLocation.lat, userLocation.lng);
  await loadPrayerTimes(userLocation.lat, userLocation.lng);
  
  // Update intervals
  setInterval(updateClock, 1000);
  setInterval(updatePrayerTimes, 1000);
  setInterval(updateDate, 60000);
  
  // Auto-rotate quotes every 30 seconds
  setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes[currentLang].length;
    updateQuote();
  }, 30000);
  
  // Add fade transition to quote elements
  $('#quote-text').style.transition = 'opacity 0.3s ease';
  $('#quote-source').style.transition = 'opacity 0.3s ease';
}

// Start
document.addEventListener('DOMContentLoaded', init);
