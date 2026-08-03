import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Video, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

function extractYouTubeId(url: string): string {
  if (!url) return '';
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || '';
  }
  if (url.includes('youtube.com/shorts/')) {
    return url.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('&')[0] || '';
  }
  if (url.includes('youtube.com/watch?v=')) {
    return url.split('v=')[1]?.split('&')[0] || '';
  }
  if (url.includes('youtube.com/embed/')) {
    return url.split('youtube.com/embed/')[1]?.split('?')[0]?.split('&')[0] || '';
  }
  return url;
}

function getCleanYouTubeEmbedUrl(url: string): string {
  const id = extractYouTubeId(url);
  if (id) {
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&iv_load_policy=3&color=white`;
  }
  return url;
}

export default function ResearchSection() {
  const { t } = useLanguage();
  const { siteData } = useSiteData();

  const [playingInlineId, setPlayingInlineId] = useState<string | null>(null);
  const [activePlayingVideo, setActivePlayingVideo] = useState<{ name: string; url: string } | null>(null);

  // Default 3 YouTube links provided by user for section 4 (Favorite Video Projects)
  const defaultVideos = [
    {
      id: 'ai_vid_01',
      name: 'Favorite Video #1',
      youtubeUrl: 'https://youtu.be/Lo9j44fRxek',
    },
    {
      id: 'ai_vid_02',
      name: 'Favorite Video #2',
      youtubeUrl: 'https://youtu.be/au2xoh2zcyI',
    },
    {
      id: 'ai_vid_03',
      name: 'Favorite Video #3',
      youtubeUrl: 'https://youtu.be/uZvCG05QIQQ',
    },
  ];

  const videos = (siteData.aiWorkflowVideos && siteData.aiWorkflowVideos.length > 0)
    ? siteData.aiWorkflowVideos
    : defaultVideos;

  return (
    <div className="space-y-8 pt-10 border-t border-slate-900/80 relative">
      {/* BACKGROUND AMBIENT COLOR GRADING SHAPES */}
      <div 
        className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none z-0 opacity-20"
        style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none z-0 opacity-25"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      {/* SUB-SECTION HEADER: FAVORITE YOUTUBE VIDEO PROJECTS */}
      <div className="text-center space-y-3 max-w-2xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            FAVORITE YOUTUBE VIDEO PROJECTS
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight flex items-center justify-center gap-2">
          <span>Favorite YouTube Video Projects</span>
          <Sparkles className="text-cyan-400" size={22} />
        </h3>
      </div>

      {/* 3-ITEM VIDEO GRID - STANDARD 16:9 YOUTUBE ASPECT RATIO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto relative z-10">
        {videos.slice(0, 3).map((video, index) => {
          const ytId = extractYouTubeId(video.youtubeUrl);
          const embedUrl = ytId 
            ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1` 
            : 'https://www.youtube-nocookie.com/embed/Lo9j44fRxek?autoplay=1&rel=0&modestbranding=1';
          const fullUrl = video.youtubeUrl || `https://youtu.be/${ytId}`;

          const fallbackYtThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '';
          const displayThumb = (video.thumbnail && video.thumbnail.trim().length > 0) ? video.thumbnail : fallbackYtThumb;
          const isPlaying = playingInlineId === video.id;

          return (
            <div
              key={video.id || index}
              className="group relative flex flex-col w-full"
            >
              {/* AMBIENT GLOW BACKDROP AURA EFFECT NEXT TO / BEHIND VIDEO */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-400/25 via-fuchsia-400/25 to-purple-500/25 rounded-2xl blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 pointer-events-none" />

              {/* MAIN CARD CONTAINER */}
              <div className="relative flex flex-col rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 group-hover:border-cyan-500/70 transition-all duration-300 shadow-xl w-full">
                
                {/* 100% CLEAN 16:9 STANDARD YOUTUBE VIDEO CANVAS (NO OVERLAY ICONS, BADGES, OR WATERMARKS) */}
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  {isPlaying ? (
                    <iframe
                      title={video.name || `Cinematic Result ${index + 1}`}
                      src={embedUrl}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    /* CLEAN UNTOUCHED THUMBNAIL PREVIEW (CLICK TO PLAY) */
                    <div 
                      className="relative w-full h-full cursor-pointer bg-slate-900 overflow-hidden"
                      onClick={() => setPlayingInlineId(video.id)}
                      title={`Click to play ${video.name || 'video'}`}
                    >
                      <img
                        src={displayThumb}
                        alt={video.name || `Cinematic Result ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          if (ytId && displayThumb !== fallbackYtThumb) {
                            (e.currentTarget as HTMLImageElement).src = fallbackYtThumb;
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* CAPTION & CLEAN CONTROL BAR UNDERNEATH THE VIDEO (OUTSIDE THE VIDEO CANVAS) */}
                <div className="p-2.5 bg-slate-950 border-t border-slate-900 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="truncate font-bold text-slate-200">
                      {video.name || `Result #${index + 1}`}
                    </span>
                    <span className="text-[10px] text-cyan-400/80 shrink-0 ml-1 font-semibold">16:9 HD</span>
                  </div>

                  {/* CLEAN TEXT CONTROLS BELOW VIDEO */}
                  <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-900/80 text-[10px] font-mono font-bold">
                    {isPlaying ? (
                      <button
                        type="button"
                        onClick={() => setPlayingInlineId(null)}
                        className="text-cyan-400 hover:text-cyan-300 transition"
                      >
                        [STOP]
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingInlineId(video.id)}
                        className="text-cyan-400 hover:text-cyan-300 transition"
                      >
                        [PLAY INLINE]
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActivePlayingVideo({ name: video.name || `Result #${index + 1}`, url: fullUrl })}
                        className="text-slate-400 hover:text-slate-200 transition"
                      >
                        [EXPAND]
                      </button>
                      <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-200 transition"
                      >
                        [YOUTUBE]
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* CLEAN YOUTUBE VIDEO MODAL PLAYER */}
      <AnimatePresence>
        {activePlayingVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider truncate max-w-xs sm:max-w-md">
                    {activePlayingVideo.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePlayingVideo(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs transition"
                >
                  ✕ Close Video
                </button>
              </div>

              {/* Video Player Frame */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  title={activePlayingVideo.name}
                  src={getCleanYouTubeEmbedUrl(activePlayingVideo.url)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-900 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Clean Embed Player (No YouTube Branding Overlay)</span>
                <span className="text-cyan-400 font-bold">1080p HD Ready</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
