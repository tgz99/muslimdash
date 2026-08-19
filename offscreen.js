/**
 * Offscreen document — the only place in a Manifest V3 extension that can
 * play <audio>, since the background service worker has no DOM. Created
 * on demand by background.js when a prayer alarm fires with adhan sound
 * enabled, reads which file to play from its own URL, then Chrome
 * auto-closes it 30s after playback ends (reasons: ['AUDIO_PLAYBACK']).
 */
const params = new URLSearchParams(location.search);
const prayer = params.get('prayer');

const file = prayer === 'fajr' ? 'audio/adhan-fajr.mp3' : 'audio/adhan.mp3';

const player = document.getElementById('player');
player.src = file;
player.volume = 1.0;
player.play().catch(() => {
  // Playback can fail silently (e.g. no audio device) — nothing to recover from here.
});
