import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, ExternalLink, X, Bot } from 'lucide-react';
import { AI_VIDEO_PROJECTS, AiVideoProject } from '../data';
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

interface AiVideoProjectsProps {
  onOpenVideo?: (video: { name: string; url: string }) => void;
}

export default function AiVideoProjects({ onOpenVideo }: AiVideoProjectsProps) {
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [localModalVideo, setLocalModalVideo] = useState<{ name: string; url: string } | null>(null);
  const modalPlayerRef = useRef<HTMLDivElement>(null);

  const projects: AiVideoProject[] = AI_VIDEO_PROJECTS;

  const handleOpenVideo = (video: { name: string; url: string }) => {
    if (onOpenVideo) {
      onOpenVideo(video);
    } else {
      setLocalModalVideo(video);
    }
  };

  useEffect(() => {
    if (!localModalVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLocalModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [localModalVideo]);

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
    <section id="ai-video-projects" className="scroll-mt-24 space-y-8 relative py-4">
      {/* BACKGROUND AMBIENT GLOW DECORATIONS */}
      <div 
        className="absolute -top-10 -right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-25"
        style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-30"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      {/* SECTION HEADER - STYLED IDENTICALLY TO FAVORITE VIDEO PROJECTS */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-5 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>AI CREATIVE LAB & PRODUCTION</span>
          </div>
          <h3 className="text-2xl font-bold font-display text-white tracking-tight flex items-center gap-2.5">
            <Bot size={26} className="text-cyan-400" />
            AI Video Projects
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Explore cutting-edge AI-generated video creations, cinematic AI storytelling, and dynamic vertical motion edits. Watch directly inline or expand to full-screen HD playback.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>3 AI Featured Projects</span>
        </div>
      </div>

      {/* 3-ITEM REELS GRID IN EXACT ORDER: 1 COL ON MOBILE, 2 ON TABLET, 3 ON PC */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 max-w-4xl mx-auto relative z-10">
        {projects.map((project, index) => {
          const ytId = extractYouTubeId(project.youtubeUrl);
          const fullUrl = project.youtubeUrl || `https://youtube.com/shorts/${ytId}`;

          const isHovered = hoveredVideoId === project.id;

          // Autoplay muted when hovered for immediate, silent preview
          const hoverEmbedUrl = ytId 
            ? buildCleanYouTubeEmbedUrl(ytId, { autoplay: 1, mute: 1, controls: 0 })
            : '';

          const localThumbMap: Record<string, string> = {
            'ICWzjGkHSxs': '/ai_project_1_thumb.jpg',
            'IS_xUdZRPm0': '/ai_project_2_thumb.jpg',
            'lkBMqZS4d2w': '/ai_project_3_thumb.jpg'
          };
          const fallbackLocal = ytId ? localThumbMap[ytId] : '';
          const fallbackYtMaxRes = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '';
          const displayThumb = project.thumbnail || fallbackLocal || fallbackYtMaxRes;

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
              {/* AMBIENT GLOW BACKDROP AURA EFFECT (IDENTICAL TO TOP SECTION) */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/25 via-blue-500/25 to-purple-500/25 rounded-2xl blur-md opacity-30 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

              {/* MAIN CARD CONTAINER */}
              <div className="relative flex flex-col rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 group-hover:border-cyan-400/80 transition-all duration-300 shadow-xl w-full">
                
                {/* 100% CLEAN 9:16 VIDEO CANVAS (AUTO-PLAYS ON HOVER, ZERO OVERLAY TEXT, NO HOVER TOOLTIP) */}
                <div 
                  className="relative w-full aspect-[9/16] bg-black overflow-hidden cursor-pointer"
                  onClick={() => handleOpenVideo({ name: project.name || `AI Video #${index + 1}`, url: fullUrl })}
                >
                  {isHovered && hoverEmbedUrl ? (
                    <iframe
                      title={project.name || `AI Video ${index + 1}`}
                      src={hoverEmbedUrl}
                      className="w-full h-full border-0 pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                      onLoad={(e) => forceIframeHdQuality(e.currentTarget)}
                    />
                  ) : (
                    <>
                      <img
                        src={displayThumb}
                        alt={project.name || `AI Video ${index + 1}`}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 [image-rendering:-webkit-optimize-contrast]"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          if (fallbackLocal && img.src !== fallbackLocal && !img.src.endsWith(fallbackLocal)) {
                            img.src = fallbackLocal;
                          } else if (ytId && !img.src.includes('maxresdefault.jpg')) {
                            img.src = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
                          } else if (ytId && !img.src.includes('hqdefault.jpg')) {
                            img.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                          }
                        }}
                      />
                    </>
                  )}
                </div>

                {/* CLEAN BOTTOM BAR: TITLE ON LEFT, SLEEK CYAN FULLSCREEN BUTTON IN RIGHT CORNER */}
                <div className="p-2 sm:p-2.5 bg-slate-950 border-t border-slate-900/90 flex items-center justify-between gap-2">
                  <span className="truncate font-mono font-bold text-slate-200 text-[11px] sm:text-xs">
                    {project.name || `AI Video #${index + 1}`}
                  </span>

                  {/* SLEEK CYAN FULLSCREEN BUTTON IN THE CORNER */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenVideo({ name: project.name || `AI Video #${index + 1}`, url: fullUrl });
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

      {/* STANDALONE MODAL (IF NOT MANAGED BY PARENT) */}
      <AnimatePresence>
        {localModalVideo && (() => {
          const ytId = extractYouTubeId(localModalVideo.url);
          const modalEmbedUrl = ytId 
            ? buildCleanYouTubeEmbedUrl(ytId, { autoplay: 1, mute: 0, controls: 1 })
            : '';

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLocalModalVideo(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col items-center max-h-[92vh] w-full max-w-sm sm:max-w-md"
              >
                {/* VIDEO TOP CONTROLS */}
                <div className="w-full flex items-center justify-between pb-2 text-xs font-mono text-slate-300 px-1">
                  <span className="truncate font-bold text-cyan-400 flex items-center gap-2">
                    <Sparkles size={13} className="text-cyan-400" />
                    {localModalVideo.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={toggleBrowserFullScreen}
                      className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
                      title="Toggle Fullscreen"
                    >
                      <Maximize2 size={15} />
                    </button>
                    <a
                      href={localModalVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
                      title="Open on YouTube"
                    >
                      <ExternalLink size={15} />
                    </a>
                    <button
                      type="button"
                      onClick={() => setLocalModalVideo(null)}
                      className="p-1 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-300 hover:text-white border border-red-800/60 transition"
                      title="Close Player (Esc)"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                {/* 9:16 VERTICAL PLAYER BOX */}
                <div
                  ref={modalPlayerRef}
                  className="w-full aspect-[9/16] max-h-[82vh] bg-black rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 flex items-center justify-center relative"
                >
                  <iframe
                    title={localModalVideo.name}
                    src={modalEmbedUrl}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    onLoad={(e) => forceIframeHdQuality(e.currentTarget)}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
