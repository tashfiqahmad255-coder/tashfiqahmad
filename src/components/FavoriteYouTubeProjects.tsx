import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Youtube, ExternalLink, X, Film } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

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

export default function FavoriteYouTubeProjects() {
  const { siteData } = useSiteData();
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; embedUrl: string; fullUrl: string } | null>(null);

  const defaultVideos = [
    {
      id: 'fav_yt_01',
      name: 'First Video Project',
      youtubeUrl: 'https://youtu.be/Lo9j44fRxek',
      description: 'Featured 16:9 cinematic video edit showcasing advanced narrative pacing, color grading, and sound design.'
    },
    {
      id: 'fav_yt_02',
      name: 'Second Video Project',
      youtubeUrl: 'https://youtu.be/au2xoh2zcyI',
      description: 'High-tempo commercial video cut with custom motion layers and polished audio transitions.'
    },
    {
      id: 'fav_yt_03',
      name: 'Third Video Project',
      youtubeUrl: 'https://youtu.be/uZvCG05QIQQ',
      description: 'Creative visual showcase highlighting kinetic typography, seamless cuts, and color correction.'
    }
  ];

  // Prefer siteData.aiWorkflowVideos if defined, otherwise defaultVideos
  const videosToDisplay = (siteData.aiWorkflowVideos && siteData.aiWorkflowVideos.length === 3)
    ? siteData.aiWorkflowVideos.map((v, idx) => ({
        id: v.id || `fav_yt_${idx + 1}`,
        name: idx === 0 ? 'First Video Project' : idx === 1 ? 'Second Video Project' : 'Third Video Project',
        youtubeUrl: v.youtubeUrl || defaultVideos[idx].youtubeUrl,
        description: defaultVideos[idx].description
      }))
    : defaultVideos;

  return (
    <section id="favorite-youtube-projects" className="py-16 border-t border-slate-900 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
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
            3 Featured Projects
          </div>
        </div>

        {/* 3 VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videosToDisplay.map((video, idx) => {
            const ytId = extractYouTubeId(video.youtubeUrl);
            const embedUrl = ytId
              ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1`
              : 'https://www.youtube-nocookie.com/embed/Lo9j44fRxek?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1';
            const fullUrl = video.youtubeUrl || `https://youtu.be/${ytId}`;
            const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '';

            return (
              <motion.div
                key={video.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col shadow-xl backdrop-blur-sm"
              >
                {/* VIDEO THUMBNAIL / EMBED CONTAINER */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden group/thumb">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={video.name}
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-90 group-hover/thumb:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                      <Film size={36} />
                    </div>
                  )}

                  {/* OVERLAY & PLAY BUTTON */}
                  <div className="absolute inset-0 bg-slate-950/40 group-hover/thumb:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveVideoModal({ title: video.name, embedUrl, fullUrl })}
                      className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transform group-hover/thumb:scale-110 transition-all duration-300 border border-red-400/30"
                      title="Play Video"
                    >
                      <Play size={22} className="ml-1 fill-white" />
                    </button>
                  </div>

                  {/* BADGE */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-300 font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Project #{idx + 1}
                  </div>
                </div>

                {/* CARD CONTENT */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-mono text-slate-100 group-hover:text-amber-300 transition-colors">
                      {video.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1.5 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <button
                      type="button"
                      onClick={() => setActiveVideoModal({ title: video.name, embedUrl, fullUrl })}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
                    >
                      <Play size={12} className="fill-amber-400" /> Watch Video
                    </button>
                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-slate-200 flex items-center gap-1 transition"
                    >
                      <ExternalLink size={12} /> YouTube
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* FULLSCREEN VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Youtube className="text-red-500" size={20} />
                  <span className="font-mono text-sm font-bold text-slate-200">
                    {activeVideoModal.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={activeVideoModal.fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    Open on YouTube <ExternalLink size={12} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(null)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* IFRAME */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={activeVideoModal.embedUrl}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
