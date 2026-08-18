/**
 * Muslim Dashboard - Background Script
 * Schedules prayer-time notifications via the alarms API so they still
 * fire when the new-tab page isn't open.
 */

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const prayerNames = {
  id: { fajr: 'Subuh', sunrise: 'Terbit', dhuhr: 'Dzuhur', asr: 'Ashar', maghrib: 'Maghrib', isha: 'Isya' },
  en: { fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
  ar: { fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء' }
};

let notifLang = 'id';

function showPrayerNotification(prayerKey, lang = 'id') {
  const names = prayerNames[lang] || prayerNames.id;
  const prayerName = names[prayerKey] || prayerKey;

  const title = lang === 'ar' ? 'حان وقت الصلاة' : lang === 'en' ? 'Prayer Time' : 'Waktu Sholat';
  const message = lang === 'ar'
    ? `حان وقت صلاة ${prayerName}`
    : lang === 'en'
    ? `It's time for ${prayerName} prayer`
    : `Saatnya sholat ${prayerName}`;

  if (browserAPI.notifications) {
    browserAPI.notifications.create(`prayer-notif-${prayerKey}-${Date.now()}`, {
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: title,
      message: message
    });
  }
}

/**
 * Replace all scheduled prayer alarms with a fresh set.
 * Called whenever the new-tab page recomputes prayer times
 * (on load, method change, or lead-time change).
 */
async function rescheduleAlarms(schedule) {
  const alarms = await browserAPI.alarms.getAll();
  await Promise.all(
    alarms.filter(a => a.name.startsWith('prayer-')).map(a => browserAPI.alarms.clear(a.name))
  );
  for (const [prayer, when] of Object.entries(schedule)) {
    if (when > Date.now()) {
      browserAPI.alarms.create(`prayer-${prayer}`, { when });
    }
  }
}

browserAPI.alarms.onAlarm.addListener((alarm) => {
  if (!alarm.name.startsWith('prayer-')) return;
  const prayerKey = alarm.name.slice('prayer-'.length);
  showPrayerNotification(prayerKey, notifLang);
});

if (browserAPI.notifications && browserAPI.notifications.onClicked) {
  browserAPI.notifications.onClicked.addListener((notificationId) => {
    if (notificationId.startsWith('prayer-notif-')) {
      browserAPI.notifications.clear(notificationId);
    }
  });
}

// No sendResponse is used, so the listener must NOT return true — doing so
// would keep the message port open (MV3 service worker) waiting for a
// reply that never comes, logging a spurious "message port closed" error.
browserAPI.runtime.onMessage.addListener((message) => {
  if (message.type === 'SCHEDULE_PRAYER_ALARMS') {
    notifLang = message.lang || 'id';
    rescheduleAlarms(message.schedule);
  }
});

browserAPI.runtime.onInstalled.addListener(() => {
  console.log('Muslim Dashboard installed');
});

console.log('Muslim Dashboard background script loaded');
