/**
 * YouTube Player Configuration Utility
 * - Enforces Crystal Clear Full HD 1080p playback (vq=hd1080, hd=1, setPlaybackQuality)
 * - Disables automated Closed Captions (CC) / speech-to-text subtitles
 * - Zero lag, optimized and lightweight
 */

export function disableSubtitlesAndForceHd(iframeEl: HTMLIFrameElement | null) {
  if (!iframeEl) return;

  const sendCommands = () => {
    try {
      const cw = iframeEl.contentWindow;
      if (!cw) return;

      // 1. Force 1080p / highres Full HD stream quality
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['hd1080'] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['highres'] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQualityRange', args: ['hd1080', 'highres'] }), '*');

      // 2. Turn off automated Closed Captions / Subtitles
      cw.postMessage(JSON.stringify({ event: 'command', func: 'setOption', args: ['captions', 'track', {}] }), '*');
      cw.postMessage(JSON.stringify({ event: 'command', func: 'unloadModule', args: ['captions'] }), '*');
    } catch {
      // Cross-origin boundary safe
    }
  };

  // Dispatch on load and at 400ms / 1200ms when YouTube's internal player has ready listener
  sendCommands();
  setTimeout(sendCommands, 400);
  setTimeout(sendCommands, 1200);
}

/**
 * Builds an optimized YouTube embed URL:
 * - vq=hd1080 & hd=1 (forces crystal clear 1080p Full HD stream)
 * - cc_load_policy=0 (disables automated subtitles/captions)
 * - iv_load_policy=3 (disables annotations/prompts)
 * - playsinline=1 & modestbranding=1 (smooth inline playback)
 * - fs=1 (allows fullscreen)
 * - NO origin parameter (prevents black screen / CORS errors in iframe/preview environments)
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
  params.set('modestbranding', '1');
  params.set('iv_load_policy', '3'); // Turn off annotations
  params.set('cc_load_policy', '0'); // Turn OFF closed captions/subtitles by default
  params.set('fs', '1'); // Allow fullscreen
  params.set('enablejsapi', '1');
  params.set('vq', 'hd1080'); // Force crystal clear 1080p Full HD stream
  params.set('hd', '1');

  if (loop && id) {
    params.set('loop', '1');
    params.set('playlist', id);
  }

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}


