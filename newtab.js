/**
 * Muslim Dashboard - New Tab Script
 * Features: Prayer times, Quotes, Todo, Clock, Internet status
 */

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
    selectMethod: 'Metode'
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
    selectMethod: 'Method'
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
    selectMethod: 'الطريقة'
  }
};

// ==================== STATE ====================

let currentLang = localStorage.getItem('muslimboard-lang') || 'id';
let currentMethod = localStorage.getItem('muslimboard-method') || '20'; // Default: Kemenag RI
let currentQuoteIndex = Math.floor(Math.random() * quotes[currentLang].length);
let prayerTimes = null;
let userLocation = null;

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
  
  // Adjust for timezone (simplified - using system timezone)
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

function updatePrayerTimes() {
  if (!prayerTimes || !userLocation) return;
  
  const prayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  let nextPrayer = null;
  let nextPrayerTime = null;
  let minDiff = Infinity;
  
  prayers.forEach(prayer => {
    const time = hourToTime(prayerTimes[prayer]);
    const timeStr = formatTime(time);
    const el = $(`#${prayer}-time`);
    if (el) el.textContent = timeStr;
    
    // Update item styling
    const item = $(`.prayer-item[data-prayer="${prayer}"]`);
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
  const activeItem = $(`.prayer-item[data-prayer="${nextPrayer}"]`);
  if (activeItem) activeItem.classList.add('active');
  
  // Update countdown
  const diff = nextPrayerTime - now;
  const t = translations[currentLang];
  $('#next-prayer-name').textContent = t[nextPrayer] || nextPrayer;
  $('#next-prayer-countdown').textContent = formatCountdown(diff);
  
  // Send notification if prayer time is near (1 minute before)
  if (diff <= 60000 && diff > 0 && !window.prayerNotified) {
    window.prayerNotified = true;
    showNotification(t[nextPrayer] || nextPrayer);
    setTimeout(() => { window.prayerNotified = false; }, 120000);
  }
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
  
  // Refresh weather description if data exists
  const weatherDesc = $('#weather-desc');
  const weatherTemp = $('#weather-temp');
  if (weatherTemp && weatherTemp.textContent !== '--°C' && weatherTemp.dataset.code) {
    const wmo = weatherCodes[parseInt(weatherTemp.dataset.code)] || weatherCodes[0];
    weatherDesc.textContent = wmo[currentLang] || wmo.id;
  }
}

function showNotification(prayerName) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Waktu Sholat', {
      body: `Saatnya sholat ${prayerName}`,
      icon: 'icons/icon128.png'
    });
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

// ==================== LOCATION & INIT ====================

function getLocation() {
  return new Promise((resolve) => {
    const t = translations[currentLang];
    $('#location-name').textContent = t.locationLoading;
    
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
          
          await Promise.all([
            getLocationName(userLocation.lat, userLocation.lng),
            loadWeather(userLocation.lat, userLocation.lng)
          ]);
          
          resolve(userLocation);
        },
        { timeout: 10000 }
      );
    } else {
      userLocation = { lat: -6.2088, lng: 106.8456 };
      $('#location-name').textContent = t.locationDenied;
      
      Promise.all([
        getLocationName(userLocation.lat, userLocation.lng),
        loadWeather(userLocation.lat, userLocation.lng)
      ]).then(() => resolve(userLocation));
    }
  });
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
  
  // Internet status
  window.addEventListener('online', updateInternetStatus);
  window.addEventListener('offline', updateInternetStatus);
  
  // Notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
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
 * Load wallpaper from Bing Image of the Day (curated, generally safe)
 */
async function loadBingWallpaper() {
  try {
    const response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=en-US');
    const data = await response.json();
    
    if (data.images && data.images.length > 0) {
      const randomImage = data.images[Math.floor(Math.random() * data.images.length)];
      const imageUrl = `https://www.bing.com${randomImage.urlbase}_1920x1080.jpg`;
      
      const img = new Image();
      img.onload = () => {
        document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
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
  loadTodos();
  loadWallpaper();
  updateDate();
  updateClock();
  updateQuote();
  updateInternetStatus();
  loadHijriDate(); // Load hijri date independently
  
  // Get location and load prayer times (also loads weather & location name)
  await getLocation();
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
