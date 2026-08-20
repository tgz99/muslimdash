/**
 * Offscreen document — the only place in a Manifest V3 extension that can
 * play <audio>, since the background service worker has no DOM. Created
 * on demand by background.js when a prayer alarm fires with adhan sound
 * enabled, reads which file to play from its own URL. Only one offscreen
 * document is allowed at a time, and Chrome does NOT auto-close it — this
 * script must close it itself once playback ends (or fails), otherwise
 * the next prayer's createDocument() throws and the adhan silently stops
 * working for the rest of the day.
 */
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const params = new URLSearchParams(location.search);
const prayer = params.get('prayer');

const file = prayer === 'fajr' ? 'audio/adhan-fajr.mp3' : 'audio/adhan.mp3';

const player = document.getElementById('player');
player.src = file;
player.volume = 1.0;
player.addEventListener('ended', () => browserAPI.offscreen.closeDocument());
player.addEventListener('error', () => browserAPI.offscreen.closeDocument());
player.play().catch(() => {
  browserAPI.offscreen.closeDocument();
});
