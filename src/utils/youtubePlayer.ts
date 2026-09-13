/**
 * YouTube Player Configuration Utility
 * - Enforces Crystal Clear Full HD 1080p playback
 * - Strictly strips and disables automated Closed Captions (CC), 
 *   English live speech-to-text translations, and subtitle overlays.
 */

export function disableSubtitlesAndForceHd(iframeEl: HTMLIFrameElement | null) {
  if (!iframeEl) return;

  const sendCommands = () => {
    try {
      const cw = iframeEl.contentWindow;
      if (!cw) return;

      // Handshake first to register postMessage listener
      cw.postMessage(JSON.stringify({ event: 'listening' }), '*');

      // 1. Force 1080p / high-res bitrate stream
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['hd1080'] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['highres'] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQualityRange', args: ['hd1080', 'highres'] }), '*');

      // 2. Explicitly unload and purge Closed Captions / Auto-translation modules
      cw.postMessage(JSON.stringify({ event: 'command', func: 'unloadModule', args: ['captions'] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'unloadModule', args: ['cc'] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setOption', args: ['captions', 'track', {}] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setOption', args: ['cc', 'track', {}] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setOption', args: ['captions', 'reload', false] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setOption', args: ['captions', 'fontSize', -1] }), '*');
    } catch {
      // Ignore cross-origin issues safely
    }
  };

  // Dispatch immediately and across key playback milestones
  sendCommands();
  const intervals = [50, 150, 300, 600, 1200, 2000, 3500, 5000];
  intervals.forEach((delay) => setTimeout(sendCommands, delay));
}

// Global active suppressor: automatically strips captions whenever any YouTube iframe starts playback
if (typeof window !== 'undefined') {
  const purgeAllCaptionsAndBoostHd = () => {
    const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube"]');
    iframes.forEach((iframe) => {
      disableSubtitlesAndForceHd(iframe);
    });
  };

  window.addEventListener('message', (event) => {
    try {
      if (typeof event.data === 'string' && (
        event.data.includes('onStateChange') || 
        event.data.includes('infoDelivery') ||
        event.data.includes('initialDelivery') ||
        event.data.includes('ready')
      )) {
        purgeAllCaptionsAndBoostHd();
      }
    } catch {}
  });

  // Re-apply whenever fullscreen mode changes
  document.addEventListener('fullscreenchange', purgeAllCaptionsAndBoostHd);
  document.addEventListener('webkitfullscreenchange', purgeAllCaptionsAndBoostHd);
}

/**
 * Builds an optimized YouTube embed URL:
 * - cc_load_policy=0 & cc_lang_pref=none (ensures closed captions / translations are not loaded)
 * - iv_load_policy=3 (disables annotations/prompts)
 * - vq=hd1080 & hd=1 (high-definition stream)
 * - playsinline=1 & enablejsapi=1 (seamless mobile & API hooks)
 */
export function buildCleanYouTubeEmbedUrl(
  id: string,
  options: {
    autoplay?: number;
    mute?: number;
    controls?: number;
    loop?: number;
  } = {}
): string {
  const { autoplay = 1, mute = 0, controls = 1, loop = 0 } = options;

  const params = new URLSearchParams();
  params.set('autoplay', autoplay.toString());
  params.set('mute', mute.toString());
  params.set('controls', controls.toString());
  params.set('playsinline', '1');
  params.set('rel', '0');
  params.set('iv_load_policy', '3'); // Turn off annotations
  params.set('cc_load_policy', '0'); // Turn OFF closed captions/subtitles
  params.set('cc_lang_pref', 'none'); // Do not pre-select translation languages
  params.set('hl', 'en');
  params.set('vq', 'hd1080'); // Force 1080p stream
  params.set('hd', '1');
  params.set('enablejsapi', '1');
  params.set('fs', '1');
  params.set('modestbranding', '1');

  if (loop && id) {
    params.set('loop', '1');
    params.set('playlist', id);
  }

  // NOTE: do NOT use encodeURIComponent here because URLSearchParams.set already handles encoding!
  if (typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file://')) {
    params.set('origin', window.location.origin);
  }

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
