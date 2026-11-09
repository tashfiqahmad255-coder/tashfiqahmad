import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Youtube, ExternalLink, X, Film, Maximize2 } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { disableSubtitlesAndForceHd, buildCleanYouTubeEmbedUrl } from '../utils/youtubePlayer';

function extractYouTubeId(url: string): string {
  if (!url) return '';
  if (url.includes('youtube.com/shorts/')) {
    return url.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('&')[0] || '';
  }
  if (url.includes('youtube.com/watch?v=')) {
    return url.split('youtube.com/watch?v=')[1]?.split('&')[0] || '';
  }
  if (url.includes('youtube.com/embed/')) {
    return url.split('youtube.com/embed/')[1]?.split('?')[0]?.split('&')[0] || '';
  }
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || '';
  }
  return '';
}

function forceIframeHdQuality(iframeEl: HTMLIFrameElement | null) {
  disableSubtitlesAndForceHd(iframeEl);
}

export default function FavoriteYouTubeProjects() {
  const { siteData } = useSiteData();
  const [activeVideoModal, setActiveVideoModal] = useState<{ 
    title: string; 
    embedUrl: string; 
    fullUrl: string;
    isShort?: boolean;
  } | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const modalPlayerRef = useRef<HTMLDivElement>(null);

  const defaultVideos = [
    {
      id: 'fav_yt_01',
      name: 'My Documentary Video',
      youtubeUrl: 'https://youtu.be/b3OhqdFnc0w',
      description: 'Cinematic documentary video edit showcasing advanced narrative pacing, authentic storytelling, and color grading.'
    },
    {
      id: 'fav_yt_02',
      name: 'As-Sunnah Skill Development Institute',
      youtubeUrl: 'https://youtu.be/Lo9j44fRxek',
      description: 'Featured 16:9 cinematic video edit showcasing advanced narrative pacing, color grading, and sound design.'
    },
    {
      id: 'fav_yt_03',
      name: 'Project - 10 Commercial Cut',
      youtubeUrl: 'https://youtu.be/au2xoh2zcyI',
      description: 'High-tempo commercial video cut with custom motion layers and polished audio transitions.'
    },
    {
      id: 'fav_yt_04',
      name: 'Ai Ad Video Creative Edit',
      youtubeUrl: 'https://youtu.be/uZvCG05QIQQ',
      description: 'Creative visual showcase highlighting kinetic typography, seamless cuts, and color correction.'
    }
  ];

  // Prefer siteData.aiWorkflowVideos if defined, otherwise defaultVideos
  const videosToDisplay = (siteData.aiWorkflowVideos && siteData.aiWorkflowVideos.length >= 4)
    ? siteData.aiWorkflowVideos.slice(0, 4).map((v, idx) => ({
        id: v.id || `fav_yt_${idx + 1}`,
        name: (idx === 0 && (!v.name || v.name.includes('Result') || v.name.includes('First'))) 
          ? 'My Documentary Video' 
          : (v.name || defaultVideos[idx]?.name || `Video Project #${idx + 1}`),
        youtubeUrl: v.youtubeUrl || defaultVideos[idx]?.youtubeUrl,
        description: defaultVideos[idx]?.description || 'Featured high-definition YouTube video edit.'
      }))
    : defaultVideos;

  const toggleBrowserFullScreen = () => {
    const el = modalPlayerRef.current || document.documentElement;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  return (
    <section id="favorite-youtube-projects" className="py-16 border-t border-slate-900 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>SELECTED WORKS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
              <Youtube className="text-red-500" size={28} />
              Favorite YouTube Video Projects
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            4 Featured Projects
          </div>
        </div>

        {/* VIDEO GRID - 2x2 SHAPE (2 on top, 2 on bottom) - IDENTICAL AESTHETICS & SETTINGS TO TOP PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videosToDisplay.map((video, idx) => {
            const ytId = extractYouTubeId(video.youtubeUrl);
            const videoId = ytId || 'b3OhqdFnc0w';
            const isShort = video.youtubeUrl.includes('/shorts/');
            const modalEmbedUrl = buildCleanYouTubeEmbedUrl(videoId, { autoplay: 1, mute: 0, controls: 1 });
            const hoverEmbedUrl = buildCleanYouTubeEmbedUrl(videoId, { autoplay: 1, mute: 1, controls: 0 });
            const fullUrl = video.youtubeUrl || `https://youtu.be/${videoId}`;
            const thumbnail = ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : '';
            const isHovered = hoveredVideoId === video.id;

            return (
              <div
                key={video.id || idx}
                className="group relative flex flex-col w-full"
                onMouseEnter={() => setHoveredVideoId(video.id)}
                onMouseLeave={() => {
                  if (hoveredVideoId === video.id) {
                    setHoveredVideoId(null);
                  }
                }}
              >
                {/* AMBIENT GLOW BACKDROP AURA EFFECT (IDENTICAL TO TOP SECTION) */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/20 via-amber-500/25 to-purple-500/20 rounded-2xl blur-md opacity-30 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

                {/* MAIN CARD CONTAINER */}
                <div className="relative flex flex-col rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 group-hover:border-cyan-400/80 transition-all duration-300 shadow-xl w-full">
                  
                  {/* 100% CLEAN 16:9 VIDEO CANVAS (AUTO-PLAYS ON HOVER, ZERO OVERLAY TEXT, NO TOOLTIP) */}
                  <div 
                    className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
                    onClick={() => setActiveVideoModal({ 
                      title: video.name, 
                      embedUrl: modalEmbedUrl, 
                      fullUrl, 
                      isShort 
                    })}
                  >
                    {isHovered ? (
                      <iframe
                        title={video.name}
                        src={hoverEmbedUrl}
                        className="w-full h-full border-0 pointer-events-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                        onLoad={(e) => forceIframeHdQuality(e.currentTarget)}
                      />
                    ) : (
                      <>
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={video.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement;
                              if (ytId && img.src.includes('maxresdefault.jpg')) {
                                img.src = `https://i.ytimg.com/vi/${ytId}/hq720.jpg`;
                              } else if (ytId && img.src.includes('hq720.jpg')) {
                                img.src = `https://img.youtube.com/vi/${ytId}/sddefault.jpg`;
                              } else if (ytId && img.src.includes('sddefault.jpg')) {
                                img.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                            <Film size={36} />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* CLEAN BOTTOM BAR: TITLE ON LEFT, SLEEK CYAN FULLSCREEN BUTTON IN RIGHT CORNER (IDENTICAL TO TOP SECTION) */}
                  <div className="p-2.5 sm:p-3 bg-slate-950 border-t border-slate-900/90 flex items-center justify-between gap-2">
                    <span className="truncate font-mono font-bold text-slate-200 text-xs sm:text-sm">
                      {video.name}
                    </span>

                    {/* SLEEK CYAN FULLSCREEN BUTTON IN THE CORNER */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideoModal({ 
                          title: video.name, 
                          embedUrl: modalEmbedUrl, 
                          fullUrl, 
                          isShort 
                        });
                      }}
                      className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 hover:text-white border border-cyan-500/50 hover:border-cyan-400 font-mono text-[10px] sm:text-xs font-bold transition-all shadow-sm hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] cursor-pointer active:scale-95"
                    >
                      <Maximize2 size={12} className="text-cyan-400" />
                      <span>FULLSCREEN</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* FULLSCREEN VIDEO PLAYER MODAL (IDENTICAL HIGH-END DESIGN TO TOP SECTION) */}
      <AnimatePresence>
        {activeVideoModal && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${activeVideoModal.isShort ? 'max-w-[480px] sm:max-w-[520px]' : 'max-w-6xl'} bg-slate-950 border border-cyan-500/50 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col`}
            >
              {/* MODAL HEADER BAR */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2 truncate pr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                  <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider truncate">
                    {activeVideoModal.title}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 text-[10px] font-mono shrink-0 font-bold">
                    {activeVideoModal.isShort ? '9:16 REEL' : '16:9 CINEMATIC'}
                  </span>
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
                    onClick={() => setActiveVideoModal(null)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300 border border-slate-700 font-mono text-xs transition flex items-center gap-1 cursor-pointer"
                    title="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* VIDEO PLAYER FRAME */}
              <div 
                ref={modalPlayerRef}
                className={`relative w-full ${activeVideoModal.isShort ? 'aspect-[9/16] max-h-[85vh]' : 'aspect-video'} bg-black overflow-hidden flex items-center justify-center`}
              >
                <iframe
                  title={activeVideoModal.title}
                  src={activeVideoModal.embedUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  onLoad={(e) => forceIframeHdQuality(e.currentTarget)}
                />
              </div>

              {/* FOOTER CONTROLS */}
              <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-900 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    1080p FHD • Crystal Clear
                  </span>
                  <span className="hidden md:inline-block text-slate-600">•</span>
                  <span className="text-slate-400 hidden md:inline-block">Click player ⚙️ Gear for 1080p or toggle Fullscreen</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={activeVideoModal.fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition font-bold hover:underline"
                  >
                    <span>YouTube Native (Max Bitrate)</span>
                    <ExternalLink size={12} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(null)}
                    className="text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
