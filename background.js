/**
 * Muslim Dashboard - Background Script
 * Handles prayer time notifications and alarms
 */

// Check if browser API is available (Firefox)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Prayer names in different languages
const prayerNames = {
  id: { fajr: 'Subuh', sunrise: 'Terbit', dhuhr: 'Dzuhur', asr: 'Ashar', maghrib: 'Maghrib', isha: 'Isya' },
  en: { fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
  ar: { fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء' }
};

/**
 * Show browser notification for prayer time
 */
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
    browserAPI.notifications.create(`prayer-${prayerKey}-${Date.now()}`, {
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: title,
      message: message
    });
  }
}

/**
 * Handle notification clicks
 */
if (browserAPI.notifications && browserAPI.notifications.onClicked) {
  browserAPI.notifications.onClicked.addListener((notificationId) => {
    if (notificationId.startsWith('prayer-')) {
      // Close the notification
      browserAPI.notifications.clear(notificationId);
    }
  });
}

/**
 * Listen for messages from content script
 */
if (browserAPI.runtime && browserAPI.runtime.onMessage) {
  browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'PRAYER_NOTIFICATION') {
      showPrayerNotification(message.prayer, message.lang);
    }
    return true;
  });
}

/**
 * Initialize extension
 */
browserAPI.runtime.onInstalled.addListener(() => {
  console.log('Muslim Dashboard installed');
});

// Log when background script starts
console.log('Muslim Dashboard background script loaded');
