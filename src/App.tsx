import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, Paintbrush, Sliders, MapPin, CheckCircle2, ChevronRight, 
  Sparkles, Instagram, Github, Youtube, FileText, Send, Phone, 
  MessageSquare, Star, ArrowUpRight, Award, Layers, ExternalLink, HelpCircle, Edit3
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
import SiteEditorDrawer from './components/SiteEditorDrawer';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { 
  CONTACT_INFO, SOFTWARES, 
  VIDEO_CATEGORIES, DESIGN_CATEGORIES, TESTIMONIALS 
} from './data';

const HERO_BANNER = '/src/assets/images/portfolio_hero_banner_1784532214740.jpg';
const DESIGN_ARTWORK = '/src/assets/images/bangladesh_art_showcase_1784532243275.jpg';
const AVATAR = 'https://i.postimg.cc/qB3G5rxg/t6t.png';

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
  if (customThumbUrl && !customThumbUrl.includes('placeholder')) {
    return customThumbUrl;
  }
  const ytId = extractYouTubeId(youtubeUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return HERO_BANNER;
}

function getCleanYouTubeEmbedUrl(youtubeUrl?: string): string {
  const ytId = extractYouTubeId(youtubeUrl);
  if (ytId) {
    return `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=1&color=white`;
  }
  return 'https://www.youtube-nocookie.com/embed/fFwFhNc523M?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=1&color=white';
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

  const selectedVideo = videoProjects.find((p) => p.id === selectedVideoId) || videoProjects[0];
  const selectedDesign = designProjects.find((p) => p.id === selectedDesignId) || designProjects[0];

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
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[130px] opacity-25 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
        />

        {/* TOP RIGHT GLOW: #7C3AED (Purple) */}
        <div 
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[130px] opacity-30 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />

        {/* LOWER LEFT GLOW: #00E5FF (Cyan) */}
        <div 
          className="absolute top-[50%] -left-48 w-[750px] h-[750px] rounded-full blur-[150px] opacity-20"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
        />

        {/* LOWER RIGHT GLOW: #7C3AED (Purple) */}
        <div 
          className="absolute top-[55%] -right-48 w-[750px] h-[750px] rounded-full blur-[150px] opacity-25"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />
      </div>

      <CustomMouseEffects />
      <WaterRippleCanvas />
      
      {/* PREVIEWS & STICKY NAVIGATION BAR */}
      <Navbar />

      {/* MAIN LAYOUT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 pt-24 md:pt-28 space-y-16 relative z-10">
        
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

          {/* 6-ITEM GRID: 3 ITEMS IN LINE 1, 3 ITEMS IN LINE 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 max-w-3xl mx-auto relative z-10">
            {videoProjects.slice(0, 6).map((project, index) => {
              const ytId = extractYouTubeId(project.youtubeUrl);
              const embedUrl = ytId 
                ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1` 
                : 'https://www.youtube-nocookie.com/embed/fFwFhNc523M?autoplay=1&rel=0&modestbranding=1';
              const fullUrl = project.youtubeUrl || `https://youtube.com/shorts/${ytId}`;

              const customThumb = project.thumbnail;
              const fallbackYtThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : HERO_BANNER;
              const displayThumb = (customThumb && customThumb.trim().length > 0) ? customThumb : fallbackYtThumb;
              const isPlaying = playingInlineId === project.id;

              return (
                <div
                  key={project.id || index}
                  className="group relative flex flex-col w-full"
                >
                  {/* AMBIENT GLOW BACKDROP AURA EFFECT NEXT TO / BEHIND VIDEO */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-500/25 via-amber-500/30 to-yellow-300/25 rounded-2xl blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 pointer-events-none" />

                  {/* MAIN CARD CONTAINER */}
                  <div className="relative flex flex-col rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 group-hover:border-yellow-500/70 transition-all duration-300 shadow-xl w-full">
                    
                    {/* 100% CLEAN 9:16 VIDEO CANVAS (NO OVERLAY ICONS, BADGES, OR WATERMARKS) */}
                    <div className="relative w-full aspect-[9/16] bg-black overflow-hidden">
                      {isPlaying ? (
                        <iframe
                          title={project.name || `YouTube Short ${index + 1}`}
                          src={embedUrl}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        /* CLEAN UNTOUCHED THUMBNAIL PREVIEW (CLICK TO PLAY) */
                        <div 
                          className="relative w-full h-full cursor-pointer bg-slate-900 overflow-hidden"
                          onClick={() => setPlayingInlineId(project.id)}
                          title={`Click to play ${project.name || 'video'}`}
                        >
                          <img
                            src={displayThumb}
                            alt={project.name || `Video ${index + 1}`}
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
                          {project.name || `Short #${index + 1}`}
                        </span>
                        <span className="text-[10px] text-yellow-400/80 shrink-0 ml-1 font-semibold">9:16</span>
                      </div>

                      {/* CLEAN TEXT CONTROLS BELOW VIDEO */}
                      <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-900/80 text-[10px] font-mono font-bold">
                        {isPlaying ? (
                          <button
                            type="button"
                            onClick={() => setPlayingInlineId(null)}
                            className="text-amber-400 hover:text-amber-300 transition"
                          >
                            [STOP]
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPlayingInlineId(project.id)}
                            className="text-yellow-400 hover:text-yellow-300 transition"
                          >
                            [PLAY INLINE]
                          </button>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActivePlayingVideo({ name: project.name || `Short #${index + 1}`, url: fullUrl })}
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

      {/* CLEAN YOUTUBE VIDEO MODAL PLAYER (NO LOGO CLUTTER) */}
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
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
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
                <span className="text-yellow-400 font-bold">1080p HD Ready</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING SITE EDITOR DRAWER AT BOTTOM LEFT */}
      <SiteEditorDrawer />

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

