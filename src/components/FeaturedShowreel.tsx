import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, Play, Pause, ExternalLink, RotateCcw } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function FeaturedShowreel() {
  const { siteData } = useSiteData();
  const showreel = siteData.showreel;
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bgStyle = showreel.bgStyle || 'matte-black';
  const showGlow = showreel.showGlow ?? false;

  // Extract YouTube ID cleanly
  const extractVideoId = (rawUrl?: string): string => {
    if (!rawUrl) return '1FXnOfA_uuM';
    if (rawUrl.includes('shorts/')) {
      return rawUrl.split('shorts/')[1]?.split('?')[0]?.split('&')[0] || '1FXnOfA_uuM';
    }
    if (rawUrl.includes('v=')) {
      return rawUrl.split('v=')[1]?.split('&')[0] || '1FXnOfA_uuM';
    }
    if (rawUrl.includes('youtu.be/')) {
      return rawUrl.split('youtu.be/')[1]?.split('?')[0] || '1FXnOfA_uuM';
    }
    if (rawUrl.includes('youtube.com/embed/')) {
      return rawUrl.split('youtube.com/embed/')[1]?.split('?')[0]?.split('&')[0] || '1FXnOfA_uuM';
    }
    return '1FXnOfA_uuM';
  };

  const videoId = extractVideoId(showreel.youtubeUrl);

  // Clean Full HD embed URL with playsinline and enablejsapi for highest quality playback
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&playsinline=1&controls=1&iv_load_policy=3&vq=hd1080&hd=1&enablejsapi=1&fs=1`;

  // Master Full HD / 8K thumbnail with dedicated high-res cover from user's enhanced image
  const initialThumb = videoId === '1FXnOfA_uuM'
    ? '/featured_showreel_thumb_8k.jpg?v=2'
    : `https://i.ytimg.com/vi/${videoId}/hq720_3.jpg`;

  const fullUrl = showreel.youtubeUrl || `https://youtube.com/shorts/${videoId}`;

  const containerBgClass = bgStyle === 'matte-black'
    ? 'bg-black border-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,1)]'
    : 'bg-[#070B14] border-slate-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]';

  return (
    <motion.section
      id="featured-showreel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[30px] overflow-hidden ${containerBgClass} p-4 sm:p-8 md:p-12 ${isMobile ? '' : 'backdrop-blur-xl'} transition-all duration-300 transform-gpu w-full max-w-full`}
    >
      {/* GLOWING DUAL-TONE EDGE HIGHLIGHT BORDER - ONLY SHOWN IF GRADIENT OPTION ACTIVE */}
      {showGlow && (
        <div className="absolute inset-0 rounded-[30px] pointer-events-none p-[1px] bg-gradient-to-r from-cyan-500/40 via-fuchsia-400/25 to-purple-500/40 [mask-image:linear-gradient(white,white)] z-10" />
      )}

      {/* BACKGROUND AMBIENT GLOW ORBS - STATIC ELEGANT AMBIENCE */}
      {showGlow && (
        <>
          {/* Left side soft cyan glow */}
          <div
            className={`absolute -top-10 -left-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none z-0 ${isMobile ? 'blur-2xl opacity-25' : 'blur-3xl opacity-40 shadow-[0_0_60px_rgba(0,229,255,0.25)]'}`}
            style={{ background: 'radial-gradient(circle, rgba(0, 229, 255, 0.35) 0%, transparent 70%)' }}
          />

          {/* Top-Right soft purple glow */}
          <div
            className={`absolute -top-10 -right-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none z-0 ${isMobile ? 'blur-2xl opacity-25' : 'blur-3xl opacity-40 shadow-[0_0_60px_rgba(124,58,237,0.25)]'}`}
            style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 70%)' }}
          />
        </>
      )}

      {/* SECTION CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10">
        
        {/* SECTION HEADING */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {/* Small Label (Cyan) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              {showreel.label || 'MY CREATIVE JOURNEY'}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            {showreel.heading || 'MY CREATIVE JOURNEY'}
          </h2>
        </div>

        {/* MAIN VIDEO DISPLAY AREA WITH ATTENTION INDICATORS */}
        <div className="w-full flex items-center justify-center gap-4 lg:gap-12 py-2">
          
          {/* LEFT SIDE ANIMATED ATTENTION ARROWS (DESKTOP/TABLET) */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 text-cyan-400">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`left-arrow-${i}`}
                animate={{
                  x: [0, 12, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.25,
                }}
                className="p-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <ChevronRight className="w-5 h-5 lg:w-7 lg:h-7 stroke-[2.5]" />
              </motion.div>
            ))}
          </div>

          {/* CENTER 9:16 VERTICAL VIDEO CARD WRAPPER WITH AURORA GLOW */}
          <div className="relative w-full max-w-[290px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[360px] aspect-[9/16] flex items-center justify-center">
            
            {/* LAYER 1: MULTI-COLOR AURORA BLOOM (STATIONARY STILL BEAUTIFUL GRADIENT) */}
            <div
              className={`absolute -inset-6 sm:-inset-12 rounded-[40px] bg-[conic-gradient(from_130deg_at_50%_50%,#06b6d4_0deg,#a855f7_90deg,#38bdf8_180deg,#c084fc_270deg,#06b6d4_360deg)] pointer-events-none z-0 transform-gpu ${isMobile ? 'blur-xl opacity-40' : 'blur-3xl opacity-75'}`}
            />

            {/* LAYER 2: SOFT NEON RADIAL AURA (STATIC BEAUTIFUL GRADIENT) */}
            {!isMobile && (
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.65)_0%,rgba(168,85,247,0.55)_50%,rgba(56,189,248,0.4)_80%,transparent_100%)] blur-2xl pointer-events-none z-0 opacity-70"
              />
            )}

            {/* LAYER 3: CINEMATIC ACCENT LIGHT BLOOMS (STATIC) */}
            {!isMobile && (
              <>
                <div
                  className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 blur-2xl pointer-events-none z-0 opacity-60"
                />
                <div
                  className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-tl from-purple-500 to-fuchsia-600 blur-2xl pointer-events-none z-0 opacity-60"
                />
              </>
            )}

            {/* VIDEO CARD CONTAINER */}
            <motion.div
              whileHover={isMobile ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              className="relative z-10 w-full h-full rounded-[24px] overflow-hidden bg-slate-950 border border-cyan-500/40 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.9)] shadow-cyan-500/20 group transition-all duration-300 hover:border-cyan-300/80 hover:shadow-[0_25px_60px_rgba(34,211,238,0.4)] transform-gpu"
            >
              {/* INNER CONTAINER WITH CRYSTAL-CLEAR 8K THUMBNAIL OR EMBEDDED PLAYER */}
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-black flex items-center justify-center">
                {isPlaying ? (
                  <>
                    <iframe
                      id="showreel-youtube-iframe"
                      title="Featured Showreel"
                      src={embedUrl}
                      className="w-full h-full border-0 rounded-[20px]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                      onLoad={(e) => {
                        try {
                          const cw = e.currentTarget.contentWindow;
                          if (cw) {
                            cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['hd2160'] }), '*');
                            cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['highres'] }), '*');
                            cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQualityRange', args: ['hd1080', 'highres'] }), '*');
                          }
                        } catch {}
                      }}
                    />
                    {/* FLOATING TOP-RIGHT BUTTON TO SWITCH BACK TO 8K COVER */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(false);
                      }}
                      className="absolute top-2.5 right-2.5 z-30 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black/95 text-[10px] font-mono font-bold text-cyan-300 hover:text-white border border-cyan-500/40 shadow-lg backdrop-blur-md transition flex items-center gap-1"
                      title="Return to 8K Cover"
                    >
                      <RotateCcw size={10} />
                      <span>8K COVER</span>
                    </button>
                  </>
                ) : (
                  /* 100% CLEAN UNTOUCHED THUMBNAIL PREVIEW (JUST LIKE FAVORITE VIDEO PROJECTS, NO ICONS OR ROUND SYMBOLS) */
                  <div
                    onClick={() => setIsPlaying(true)}
                    className="relative w-full h-full cursor-pointer overflow-hidden group/cover"
                  >
                    <img
                      src={initialThumb}
                      alt="My Creative Journey"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/cover:scale-105"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        if (img.src.includes('featured_showreel_thumb_8k.jpg')) {
                          img.src = 'https://i.postimg.cc/dVNPzRfS/Screenshot-2026-09-04-120915.png';
                        } else if (img.src.includes('Screenshot-2026-09-04-120915.png')) {
                          img.src = `https://i.ytimg.com/vi/${videoId}/hq720_3.jpg`;
                        } else if (img.src.includes('hq720_3.jpg')) {
                          img.src = `https://i.ytimg.com/vi/${videoId}/maxres3.jpg`;
                        } else if (img.src.includes('maxres3.jpg')) {
                          img.src = `https://i.ytimg.com/vi/${videoId}/sd3.jpg`;
                        } else if (img.src.includes('sd3.jpg')) {
                          img.src = `https://i.ytimg.com/vi/${videoId}/hq3.jpg`;
                        } else if (img.src.includes('hq3.jpg')) {
                          img.src = `https://img.youtube.com/vi/${videoId}/3.jpg`;
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE ANIMATED ATTENTION ARROWS (DESKTOP/TABLET) */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 text-cyan-400">
            {[2, 1, 0].map((i) => (
              <motion.div
                key={`right-arrow-${i}`}
                animate={{
                  x: [0, -12, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.25,
                }}
                className="p-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <ChevronLeft className="w-5 h-5 lg:w-7 lg:h-7 stroke-[2.5]" />
              </motion.div>
            ))}
          </div>

        </div>

        {/* BOTTOM STATUS & CONTROL BAR FOR 8K PLAYBACK */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-1">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 font-mono text-xs font-bold transition shadow-lg shadow-cyan-950/40"
          >
            {isPlaying ? (
              <>
                <RotateCcw size={13} className="text-cyan-400" />
                <span>Show Cover</span>
              </>
            ) : (
              <>
                <Play size={13} className="fill-cyan-400 text-cyan-400" />
                <span>Play Video</span>
              </>
            )}
          </button>

          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white font-mono text-xs font-semibold transition"
          >
            <span>Open in YouTube</span>
            <ExternalLink size={12} className="text-slate-400" />
          </a>
        </div>

      </div>
    </motion.section>
  );
}
