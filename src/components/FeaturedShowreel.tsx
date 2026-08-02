import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, Play, Edit3 } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function FeaturedShowreel() {
  const { siteData, openEditorTo } = useSiteData();
  const showreel = siteData.showreel;

  const bgStyle = showreel.bgStyle || 'matte-black';
  const showGlow = showreel.showGlow ?? false;

  // Format YouTube URL into proper embed URL with modestbranding to hide YouTube logos/branding
  const getEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return 'https://www.youtube-nocookie.com/embed/fFwFhNc523M?autoplay=0&rel=0&modestbranding=1&playsinline=1&controls=1&iv_load_policy=3&color=white';
    
    // Extract ID from shorts link, standard link or embed link
    let videoId = '';
    if (rawUrl.includes('youtube.com/embed/')) {
      const parts = rawUrl.split('youtube.com/embed/');
      videoId = parts[1]?.split('?')[0]?.split('&')[0] || '';
    } else if (rawUrl.includes('shorts/')) {
      const parts = rawUrl.split('shorts/');
      videoId = parts[1]?.split('?')[0]?.split('&')[0] || '';
    } else if (rawUrl.includes('v=')) {
      const parts = rawUrl.split('v=');
      videoId = parts[1]?.split('&')[0] || '';
    } else if (rawUrl.includes('youtu.be/')) {
      const parts = rawUrl.split('youtu.be/');
      videoId = parts[1]?.split('?')[0] || '';
    }

    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1&controls=1&iv_load_policy=3&color=white`;
    }

    return rawUrl;
  };

  const embedUrl = getEmbedUrl(showreel.youtubeUrl);

  const containerBgClass = bgStyle === 'matte-black'
    ? 'bg-black border-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,1)]'
    : 'bg-[#050812] border-slate-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]';

  return (
    <motion.section
      id="featured-showreel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[30px] overflow-hidden ${containerBgClass} p-6 md:p-12 backdrop-blur-xl transition-all duration-300`}
    >
      {/* GLOWING DUAL-TONE EDGE HIGHLIGHT BORDER - ONLY SHOWN IF GRADIENT OPTION ACTIVE */}
      {showGlow && (
        <div className="absolute inset-0 rounded-[30px] pointer-events-none p-[1px] bg-gradient-to-r from-cyan-500/40 via-fuchsia-400/25 to-purple-500/40 [mask-image:linear-gradient(white,white)] z-10" />
      )}

      {/* BACKGROUND AMBIENT GLOW ORBS - ONLY SHOWN IF GLOW IS EXPLICITLY TURNED ON */}
      {showGlow && (
        <>
          {/* Left side soft cyan glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-10 -left-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/30 via-teal-400/20 to-transparent blur-3xl pointer-events-none z-0 shadow-[0_0_60px_rgba(34,211,238,0.25)]"
          />

          {/* Top-Right soft purple glow */}
          <motion.div
            animate={{
              scale: [1.15, 0.95, 1.15],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-10 -right-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-bl from-purple-600/30 via-fuchsia-500/20 to-transparent blur-3xl pointer-events-none z-0 shadow-[0_0_60px_rgba(168,85,247,0.25)]"
          />
        </>
      )}

      {/* SECTION CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-10">
        
        {/* SECTION HEADING */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {/* Small Label (Cyan) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              {showreel.label || 'LATEST SHOWREEL'}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            {showreel.heading || 'WATCH MY SHOWREEL'}
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
            
            {/* LAYER 1: ROTATING MULTI-COLOR AURORA CONIC BLOOM (CYAN & PURPLE & FUCHSIA) */}
            <motion.div
              animate={{
                rotate: [0, 180, 360],
                scale: [0.95, 1.05, 0.95],
                opacity: [0.65, 0.85, 0.65],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-8 sm:-inset-12 rounded-[40px] bg-[conic-gradient(from_0deg_at_50%_50%,#06b6d4_0deg,#a855f7_90deg,#38bdf8_180deg,#c084fc_270deg,#06b6d4_360deg)] blur-3xl pointer-events-none opacity-75 z-0"
            />

            {/* LAYER 2: PULSING SOFT NEON RADIAL AURA */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.55, 0.85, 0.55],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-4 sm:-inset-6 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.65)_0%,rgba(168,85,247,0.55)_50%,rgba(56,189,248,0.4)_80%,transparent_100%)] blur-2xl pointer-events-none z-0"
            />

            {/* LAYER 3: CINEMATIC ACCENT LIGHT BLOOMS (TOP-LEFT & BOTTOM-RIGHT) */}
            <motion.div
              animate={{
                scale: [0.9, 1.2, 0.9],
                opacity: [0.5, 0.85, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 blur-2xl pointer-events-none z-0 opacity-60"
            />
            <motion.div
              animate={{
                scale: [1.2, 0.9, 1.2],
                opacity: [0.5, 0.85, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-tl from-purple-500 to-fuchsia-600 blur-2xl pointer-events-none z-0 opacity-60"
            />

            {/* VIDEO CARD CONTAINER */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10 w-full h-full rounded-[24px] overflow-hidden bg-slate-950 border border-cyan-500/40 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.9)] shadow-cyan-500/20 group transition-all duration-300 hover:border-cyan-300/80 hover:shadow-[0_25px_60px_rgba(34,211,238,0.4)]"
            >
              {/* INNER CONTAINER WITH EMBEDDED PLAYER */}
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-black">
                <iframe
                  id="showreel-youtube-iframe"
                  title="Featured Showreel"
                  src={embedUrl}
                  className="w-full h-full border-0 rounded-[20px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
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

      </div>
    </motion.section>
  );
}
