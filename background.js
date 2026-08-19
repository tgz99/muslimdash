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

/**
 * Settings live in chrome.storage.local rather than plain variables —
 * a service worker can be torn down and woken again purely by an alarm
 * event, which would silently reset any in-memory state back to defaults
 * before the notification/adhan logic runs.
 */
async function getSettings() {
  const stored = await browserAPI.storage.local.get(['notifLang', 'reminderLang', 'adhanEnabled']);
  return {
    notifLang: stored.notifLang || 'id',
    reminderLang: stored.reminderLang || 'id',
    adhanEnabled: stored.adhanEnabled === true
  };
}

function showDailyReminderNotification(lang = 'id') {
  const title = lang === 'ar' ? 'الأعمال اليومية' : lang === 'en' ? 'Daily Deeds' : 'Amalan Harian';
  const message = lang === 'ar'
    ? 'وقت لطيف لأذكارك وتلاوة القرآن اليوم 🌙'
    : lang === 'en'
    ? "A gentle nudge for today's dhikr & Qur'an reading 🌙"
    : 'Waktu buat dzikir & tilawah Al-Qur\'an hari ini 🌙';

  if (browserAPI.notifications) {
    browserAPI.notifications.create(`daily-reminder-notif-${Date.now()}`, {
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: title,
      message: message
    });
  }
}

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
 * Play the adhan through an offscreen document — the only place in MV3
 * that has a DOM/<audio> element, since the service worker itself
 * doesn't. Firefox has no chrome.offscreen equivalent, so this is a
 * Chrome-only enhancement; browserAPI.offscreen is simply undefined
 * there and this becomes a no-op.
 */
async function playAdhan(prayerKey) {
  if (!browserAPI.offscreen) return;
  try {
    await browserAPI.offscreen.createDocument({
      url: `offscreen.html?prayer=${encodeURIComponent(prayerKey)}`,
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Play adhan (call to prayer) audio at prayer time'
    });
  } catch (e) {
    // Most likely "single offscreen document" already exists — with
    // prayers hours apart and auto-close after 30s of silence, this is
    // not expected in practice, so just skip this occurrence.
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

/**
 * Schedule (or reschedule) the once-daily dzikir/Qur'an reminder at the
 * given local hour:minute. periodInMinutes makes it repeat every 24h on
 * its own — no need for the page to re-send this every day.
 */
async function rescheduleDailyReminder(hour, minute) {
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  if (target.getTime() <= Date.now()) {
    target.setDate(target.getDate() + 1);
  }
  await browserAPI.alarms.clear('daily-reminder');
  browserAPI.alarms.create('daily-reminder', { when: target.getTime(), periodInMinutes: 24 * 60 });
}

browserAPI.alarms.onAlarm.addListener(async (alarm) => {
  const settings = await getSettings();

  if (alarm.name === 'daily-reminder') {
    showDailyReminderNotification(settings.reminderLang);
    return;
  }

  if (!alarm.name.startsWith('prayer-')) return;
  const prayerKey = alarm.name.slice('prayer-'.length);
  showPrayerNotification(prayerKey, settings.notifLang);
  if (settings.adhanEnabled) {
    playAdhan(prayerKey);
  }
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
    browserAPI.storage.local.set({ notifLang: message.lang || 'id' });
    rescheduleAlarms(message.schedule);
  }
  if (message.type === 'SCHEDULE_DAILY_REMINDER') {
    browserAPI.storage.local.set({ reminderLang: message.lang || 'id' });
    rescheduleDailyReminder(message.hour, message.minute);
  }
  if (message.type === 'SET_ADHAN_ENABLED') {
    browserAPI.storage.local.set({ adhanEnabled: !!message.enabled });
  }
});

browserAPI.runtime.onInstalled.addListener(() => {
  console.log('Muslim Dashboard installed');
});

console.log('Muslim Dashboard background script loaded');
