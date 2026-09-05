import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, Paintbrush, Sliders, MapPin, CheckCircle2, ChevronRight, 
  Sparkles, Instagram, Github, Youtube, FileText, Send, Phone, 
  MessageSquare, Star, ArrowUpRight, Award, Layers, ExternalLink, HelpCircle, Edit3, Play,
  Maximize2, X
} from 'lucide-react';
import ShowreelSandbox from './components/ShowreelSandbox';
import DesignSandbox from './components/DesignSandbox';
import AboutContact from './components/AboutContact';
import CustomMouseEffects from './components/CustomMouseEffects';
import WaterRippleCanvas from './components/WaterRippleCanvas';
import HeroBanner3D from './components/HeroBanner3D';
import FeaturedShowreel from './components/FeaturedShowreel';
import FavoriteYouTubeProjects from './components/FavoriteYouTubeProjects';
import Navbar from './components/Navbar';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { 
  CONTACT_INFO, SOFTWARES, 
  VIDEO_CATEGORIES, DESIGN_CATEGORIES, TESTIMONIALS 
} from './data';

const HERO_BANNER = '/src/assets/images/portfolio_hero_banner_1784532214740.jpg';
const DESIGN_ARTWORK = '/src/assets/images/bangladesh_art_showcase_1784532243275.jpg';
const AVATAR = 'https://i.postimg.cc/c1w4wVvH/Chat-GPT-Image-Jul-29-2026-06-18-33-PM.png';

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  if (url.includes('shorts/')) {
    return url.split('shorts/')[1]?.split('?')[0]?.split('&')[0] || null;
  }
  if (url.includes('v=')) {
    return url.split('v=')[1]?.split('&')[0] || null;
  }
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1]?.split('?')[0] || null;
  }
  if (url.includes('youtube.com/embed/')) {
    return url.split('youtube.com/embed/')[1]?.split('?')[0] || null;
  }
  return null;
}

function getCleanVideoThumbnail(youtubeUrl?: string, customThumbUrl?: string): string {
  if (customThumbUrl && customThumbUrl.trim().length > 0 && !customThumbUrl.includes('placeholder')) {
    return customThumbUrl;
  }
  const ytId = extractYouTubeId(youtubeUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
  }
  return HERO_BANNER;
}

function getCleanYouTubeEmbedUrl(youtubeUrl?: string, autoplay = 1, mute = 0, controls = 1): string {
  const ytId = extractYouTubeId(youtubeUrl);
  const id = ytId || '1FXnOfA_uuM';
  // Reliable Full HD 1080p stream parameters with enablejsapi and playsinline
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay}&mute=${mute}&controls=${controls}&playsinline=1&loop=1&playlist=${id}&rel=0&iv_load_policy=3&vq=hd1080&hd=1&enablejsapi=1&fs=1`;
}

function MainPortfolioContent() {
  const { t } = useLanguage();
  const { siteData, openEditorTo } = useSiteData();
  const [activeConsoleTab, setActiveConsoleTab] = useState<'video' | 'design'>('video');

  const videoProjects = siteData.videoProjects || [];
  const designProjects = siteData.designProjects || [];

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [activePlayingVideo, setActivePlayingVideo] = useState<{ name: string; url: string } | null>(null);
  const [playingInlineId, setPlayingInlineId] = useState<string | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const modalPlayerRef = useRef<HTMLDivElement>(null);

  const selectedVideo = videoProjects.find((p) => p.id === selectedVideoId) || videoProjects[0];
  const selectedDesign = designProjects.find((p) => p.id === selectedDesignId) || designProjects[0];

  useEffect(() => {
    if (!activePlayingVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePlayingVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePlayingVideo]);

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-[#00E5FF] selection:text-slate-950 relative overflow-x-hidden">
      {/* ULTRA-MODERN DARK UI RADIAL GRADIENT BACKGROUND (#070B14, #00E5FF, #7C3AED) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070B14]">
        {/* Soft Blended Radial Gradients */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              radial-gradient(circle at 10% 20%, rgba(0, 229, 255, 0.18) 0%, transparent 55%),
              radial-gradient(circle at 90% 20%, rgba(124, 58, 237, 0.22) 0%, transparent 55%),
              radial-gradient(circle at 15% 70%, rgba(0, 229, 255, 0.14) 0%, transparent 50%),
              radial-gradient(circle at 85% 70%, rgba(124, 58, 237, 0.18) 0%, transparent 50%)
            `
          }}
        />

        {/* TOP LEFT GLOW: #00E5FF (Cyan) */}
        <div 
          className="absolute -top-20 -left-20 w-64 h-64 sm:w-[700px] sm:h-[700px] rounded-full blur-2xl sm:blur-[130px] opacity-25 animate-pulse-slow pointer-events-none transform-gpu"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
        />

        {/* TOP RIGHT GLOW: #7C3AED (Purple) */}
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 sm:w-[700px] sm:h-[700px] rounded-full blur-2xl sm:blur-[130px] opacity-30 animate-pulse-slow pointer-events-none transform-gpu"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />

        {/* LOWER LEFT GLOW: #00E5FF (Cyan) */}
        <div 
          className="absolute top-[50%] -left-24 w-72 h-72 sm:w-[750px] sm:h-[750px] rounded-full blur-2xl sm:blur-[150px] opacity-20 pointer-events-none transform-gpu"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
        />

        {/* LOWER RIGHT GLOW: #7C3AED (Purple) */}
        <div 
          className="absolute top-[55%] -right-24 w-72 h-72 sm:w-[750px] sm:h-[750px] rounded-full blur-2xl sm:blur-[150px] opacity-25 pointer-events-none transform-gpu"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />
      </div>

      <CustomMouseEffects />
      <WaterRippleCanvas />
      
      {/* PREVIEWS & STICKY NAVIGATION BAR */}
      <Navbar />

      {/* MAIN LAYOUT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 md:px-8 py-4 pt-20 md:pt-28 space-y-12 md:space-y-16 relative z-10 overflow-x-hidden">
        
        {/* HERO BANNER SECTION (#home) */}
        <HeroBanner3D avatarUrl={AVATAR} />

        {/* FEATURED SHOWREEL (SECOND SECTION) */}
        <FeaturedShowreel />

        {/* PORTFOLIO SHOWCASE SECTION (#portfolio) */}
        <section id="portfolio" className="scroll-mt-24 space-y-8 relative">
          {/* BACKGROUND AMBIENT GLOW DECORATION */}
          <div 
            className="absolute -top-10 -left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-25"
            style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
          />
          <div 
            className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-30"
            style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
          />

          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-5 relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-mono text-xs font-bold">
                <Video size={13} className="text-yellow-400" />
                <span>FEATURED VIDEO PROJECTS</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                Favorite Video Projects
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Explore high-tempo vertical edits and creative video projects. Watch directly inline or expand to full-screen HD playback.
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => openEditorTo('portfolio', 'video')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-yellow-500/30 hover:border-yellow-400 text-yellow-300 font-mono text-xs font-bold transition shadow"
            >
              <Edit3 size={12} className="text-yellow-400" />
              <span>Edit Videos & Thumbnails</span>
            </button>
          </div>

          {/* 9-ITEM REELS GRID: 2 COLUMNS ON MOBILE, 3 COLUMNS ON PC */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 max-w-4xl mx-auto relative z-10">
            {videoProjects.map((project, index) => {
              const ytId = extractYouTubeId(project.youtubeUrl);
              const fullUrl = project.youtubeUrl || `https://youtube.com/shorts/${ytId}`;

              const isHovered = hoveredVideoId === project.id;
              const isPlaying = isHovered || playingInlineId === project.id;

              // Autoplay muted when hovered for immediate, silent preview; unmuted if inline
              const embedUrl = isPlaying 
                ? getCleanYouTubeEmbedUrl(project.youtubeUrl, 1, 1, 0)
                : getCleanYouTubeEmbedUrl(project.youtubeUrl, 0, 1, 1);

              const customThumb = project.thumbnail;
              const fallbackYtHdThumb = ytId 
                ? (ytId === 'yv6bvPoPEzw' ? `https://i.ytimg.com/vi/${ytId}/hq720_2.jpg` : `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`)
                : HERO_BANNER;
              const displayThumb = (customThumb && customThumb.trim().length > 0 && !customThumb.includes('placeholder')) 
                ? customThumb 
                : fallbackYtHdThumb;

              return (
                <div
                  key={project.id || index}
                  className="group relative flex flex-col w-full"
                  onMouseEnter={() => setHoveredVideoId(project.id)}
                  onMouseLeave={() => {
                    if (hoveredVideoId === project.id) {
                      setHoveredVideoId(null);
                    }
                  }}
                >
                  {/* AMBIENT GLOW BACKDROP AURA EFFECT */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/20 via-amber-500/25 to-purple-500/20 rounded-2xl blur-md opacity-30 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

                  {/* MAIN CARD CONTAINER */}
                  <div className="relative flex flex-col rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 group-hover:border-cyan-400/80 transition-all duration-300 shadow-xl w-full">
                    
                    {/* 100% CLEAN 9:16 VIDEO CANVAS (AUTO-PLAYS ON HOVER, ZERO OVERLAY TEXT, NO HOVER TOOLTIP) */}
                    <div 
                      className="relative w-full aspect-[9/16] bg-black overflow-hidden cursor-pointer"
                      onClick={() => setActivePlayingVideo({ name: project.name || `Short #${index + 1}`, url: fullUrl })}
                    >
                      {isPlaying ? (
                        <iframe
                          title={project.name || `YouTube Short ${index + 1}`}
                          src={embedUrl}
                          className="w-full h-full border-0 pointer-events-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src={displayThumb}
                          alt={project.name || `Video ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            if (ytId && img.src.includes('maxresdefault.jpg')) {
                              img.src = `https://i.ytimg.com/vi/${ytId}/hq720_2.jpg`;
                            } else if (ytId && img.src.includes('hq720_2.jpg')) {
                              img.src = `https://img.youtube.com/vi/${ytId}/sddefault.jpg`;
                            } else if (ytId && img.src.includes('sddefault.jpg')) {
                              img.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                            }
                          }}
                        />
                      )}
                    </div>

                    {/* CLEAN BOTTOM BAR: TITLE ON LEFT, SLEEK CYAN FULLSCREEN BUTTON IN RIGHT CORNER */}
                    <div className="p-2 sm:p-2.5 bg-slate-950 border-t border-slate-900/90 flex items-center justify-between gap-2">
                      <span className="truncate font-mono font-bold text-slate-200 text-[11px] sm:text-xs">
                        {project.name || `Short #${index + 1}`}
                      </span>

                      {/* SLEEK CYAN FULLSCREEN BUTTON IN THE CORNER */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePlayingVideo({ name: project.name || `Short #${index + 1}`, url: fullUrl });
                        }}
                        className="shrink-0 flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 hover:text-white border border-cyan-500/50 hover:border-cyan-400 font-mono text-[10px] sm:text-[11px] font-bold transition-all shadow-sm hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] cursor-pointer active:scale-95"
                      >
                        <Maximize2 size={11} className="text-cyan-400" />
                        <span>FULLSCREEN</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAVORITE YOUTUBE VIDEO PROJECTS */}
        <FavoriteYouTubeProjects />

        {/* ABOUT & CONTACT SECTION (#about, #contact) */}
        <section className="border-t border-slate-900 pt-10">
          <AboutContact avatarImage={siteData.hero.avatarUrl || AVATAR} />
        </section>

      </main>

      {/* FOOTER ACCENTS */}
      <footer className="border-t border-slate-900 bg-slate-950 mt-16 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} {CONTACT_INFO.name}. {t.footerRights}</p>
          </div>

          {/* Social links */}
          <div className="flex gap-4 items-center">
            <a href={CONTACT_INFO.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition" title="YouTube">
              <Youtube size={16} />
            </a>
            <a href={CONTACT_INFO.behance} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition" title="Behance">
              <Layers size={16} />
            </a>
            <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition" title="Facebook">
              <span className="text-[11px] font-mono font-bold hover:text-amber-400">FB</span>
            </a>
            <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition" title="Instagram">
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* FULL-SCREEN VIDEO MODAL PLAYER (SUPPORTS BOTH 9:16 SHORTS & 16:9 VIDEOS) */}
      <AnimatePresence>
        {activePlayingVideo && (() => {
          const isShort = activePlayingVideo.url.includes('/shorts/') || 
            activePlayingVideo.url.includes('1FXnOfA_uuM') || 
            activePlayingVideo.url.includes('GjE7dtwXYmI') || 
            activePlayingVideo.url.includes('yv6bvPoPEzw') || 
            activePlayingVideo.url.includes('W9oWg03TyVs');

          const toggleBrowserFullScreen = () => {
            if (!document.fullscreenElement) {
              if (modalPlayerRef.current?.requestFullscreen) {
                modalPlayerRef.current.requestFullscreen().catch(() => {
                  document.documentElement.requestFullscreen?.().catch(() => {});
                });
              } else {
                document.documentElement.requestFullscreen?.().catch(() => {});
              }
            } else {
              document.exitFullscreen?.().catch(() => {});
            }
          };

          return (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
              onClick={() => setActivePlayingVideo(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full ${isShort ? 'max-w-[480px] sm:max-w-[520px]' : 'max-w-5xl'} bg-slate-950 border border-cyan-500/50 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col`}
              >
                {/* Modal Header Bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                    <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider truncate">
                      {activePlayingVideo.name}
                    </span>
                    {isShort && (
                      <span className="px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 text-[10px] font-mono shrink-0 font-bold">
                        9:16 REEL
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={toggleBrowserFullScreen}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/50 font-mono text-xs transition flex items-center gap-1.5 cursor-pointer shadow"
                      title="Toggle Fullscreen"
                    >
                      <Maximize2 size={13} />
                      <span className="text-[11px] font-bold">FULLSCREEN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePlayingVideo(null)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300 border border-slate-700 font-mono text-xs transition flex items-center gap-1 cursor-pointer"
                      title="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Video Player Frame with Fullscreen Container Ref */}
                <div 
                  ref={modalPlayerRef}
                  className={`relative w-full ${isShort ? 'aspect-[9/16] max-h-[85vh]' : 'aspect-video'} bg-black overflow-hidden flex items-center justify-center`}
                >
                  <iframe
                    title={activePlayingVideo.name}
                    src={getCleanYouTubeEmbedUrl(activePlayingVideo.url, 1, 0, 1)}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    onLoad={(e) => {
                      try {
                        const cw = e.currentTarget.contentWindow;
                        if (cw) {
                          cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['hd1080'] }), '*');
                          cw.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['highres'] }), '*');
                        }
                      } catch {}
                    }}
                  />
                </div>

                {/* Footer Controls */}
                <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-900 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    1080p FHD • Crystal Clear
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={activePlayingVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition font-bold hover:underline"
                    >
                      <span>YouTube Native (Max Bitrate)</span>
                      <ExternalLink size={12} />
                    </a>
                    <button
                      type="button"
                      onClick={() => setActivePlayingVideo(null)}
                      className="text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SiteDataProvider>
        <MainPortfolioContent />
      </SiteDataProvider>
    </LanguageProvider>
  );
}

