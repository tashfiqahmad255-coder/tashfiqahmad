import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Video, Maximize2, Layers, Volume2, VolumeX, Eye, Sparkles, Sliders, Edit3 } from 'lucide-react';
import { VideoFilter } from '../types';
import { useSiteData } from '../context/SiteDataContext';

interface ShowreelSandboxProps {
  heroImage: string;
}

const FILTERS: VideoFilter[] = [
  {
    id: 'raw',
    name: 'RAW Log-C (Flat)',
    cssFilter: 'contrast(75%) brightness(105%) saturate(55%) sepia(5%)',
    colorGradingWheelColor: 'bg-zinc-500',
    description: 'Flat color profile directly from the camera sensor. Prepared for grading.'
  },
  {
    id: 'dhaka_sunset',
    name: 'Dhaka Sunset LUT',
    cssFilter: 'contrast(125%) brightness(95%) saturate(145%) hue-rotate(-15deg) sepia(15%) saturate(160%)',
    colorGradingWheelColor: 'bg-amber-600',
    description: 'Warm, golden hues paired with rich reddish-crimson shadows reflecting tropical sunset light.'
  },
  {
    id: 'cinematic',
    name: 'Teal & Orange',
    cssFilter: 'contrast(115%) brightness(90%) saturate(120%) hue-rotate(5deg) brightness(105%) saturate(110%)',
    colorGradingWheelColor: 'bg-cyan-600',
    description: 'Hollywood standard. Deep teal shadows paired with warm, vibrant skin tone highlights.'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk BD',
    cssFilter: 'contrast(135%) brightness(90%) saturate(160%) hue-rotate(140deg) sepia(5%)',
    colorGradingWheelColor: 'bg-fuchsia-600',
    description: 'Futuristic styling combining electric magenta and bright neon emerald tones.'
  }
];

export default function ShowreelSandbox({ heroImage }: ShowreelSandboxProps) {
  const { openEditorTo } = useSiteData();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [activeFilter, setActiveFilter] = useState<VideoFilter>(FILTERS[1]); // Default to Dhaka Sunset
  const [aspectRatio, setAspectRatio] = useState<'landscape' | 'vertical' | 'cinema'>('landscape');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  // Auto progression of simulated playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // loop
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseFloat(e.target.value));
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'vertical':
        return 'aspect-[9/16] max-h-[340px] md:max-h-[420px]';
      case 'cinema':
        return 'aspect-[2.39/1] w-full';
      case 'landscape':
      default:
        return 'aspect-[16/9] w-full';
    }
  };

  return (
    <div id="showreel-sandbox-panel" className="relative bg-slate-900/65 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      {/* BACKGROUND AMBIENT COLOR GRADING SHAPES */}
      <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-500/25 via-teal-500/20 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-12 -right-12 w-80 h-80 rounded-full bg-gradient-to-bl from-fuchsia-500/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none z-0" />
      {/* Top Console Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-400/80 animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-slate-700" />
            <span className="w-3 h-3 rounded-full bg-slate-700" />
          </div>
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase ml-2 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900/30">
            Showreel Sandbox v2.4
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            {isPlaying ? '● PLAYING' : '■ PAUSED'}
          </span>
          <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
            {Math.floor(progress / 30).toString().padStart(2, '0')}:
            {Math.floor((progress % 30) * 2).toString().padStart(2, '0')}:
            {Math.floor((progress % 1) * 30).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Video Viewport & Playback Controls */}
        <div className="lg:col-span-8 p-4 md:p-6 flex flex-col justify-between border-r border-slate-800/60 bg-slate-950/20">
          
          {/* Main Viewport */}
          <div className="relative w-full flex items-center justify-center bg-black/60 rounded-xl overflow-hidden border border-slate-800 h-[280px] md:h-[380px]">
            {/* Aspect Ratio Guides (Cropped view) */}
            <motion.div 
              layout 
              className={`relative overflow-hidden shadow-2xl border border-slate-800/40 rounded-lg transition-all duration-500 ${getAspectClass()}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Actual Image Rendered with Active Color Filter */}
              <img
                id="showreel-preview-frame"
                src={heroImage}
                alt="Cinematic Editing Showreel"
                style={{ filter: activeFilter.cssFilter }}
                className="w-full h-full object-cover select-none transition-all duration-300 pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Glowing Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Viewport UI overlays */}
              <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
                <span className="px-2 py-1 bg-black/75 backdrop-blur-md rounded text-[10px] font-mono text-slate-300 flex items-center gap-1.5 border border-slate-800">
                  <Video size={10} className="text-cyan-400" />
                  {aspectRatio === 'landscape' ? '16:9 LANDSCAPE' : aspectRatio === 'vertical' ? '9:16 VERTICAL' : '2.39:1 CINEMATIC'}
                </span>
                <span className="px-2 py-1 bg-cyan-950/90 text-cyan-300 rounded text-[10px] font-mono font-bold border border-cyan-500/30">
                  {activeFilter.name}
                </span>
              </div>

              {/* Playback Indicator Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-slate-300 shadow-xl shadow-black/40">
                      <Pause size={24} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Simulated timeline subtitle overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 text-center pointer-events-none">
                <p className="text-xs md:text-sm font-sans tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-xs py-1 px-3 rounded-full inline-block">
                  {progress < 25 ? '🎬 Behind the Scenes • Documentary Project (Dhaka)' : 
                   progress < 50 ? '✨ High-Fidelity Color Grading and Sound Design Synthesis' :
                   progress < 75 ? '🔥 Brand Commercial Promo for South Asian Market' :
                   '🌟 Delivering Visual Impact from Bangladesh to the World'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Scrubber & Player Controls Panel */}
          <div className="mt-4 space-y-4">
            {/* Timeline Scrubber */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-500">00:00</span>
              <div className="relative flex-1">
                <input
                  id="scrubber-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleScrubberChange}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none outline-none focus:ring-1 focus:ring-cyan-400"
                />
                {/* Visual marker of frames */}
                <div className="absolute inset-0 h-1.5 pointer-events-none flex justify-between px-1">
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
                    <span key={v} className="w-[1px] h-1.5 bg-slate-700/50" />
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">00:30</span>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  id="btn-play-pause"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-2.5 rounded-lg transition-all ${isPlaying ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold'} shadow-md`}
                  title={isPlaying ? 'Pause Showreel' : 'Play Showreel'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                </button>

                <button
                  id="btn-rewind"
                  onClick={() => setProgress(0)}
                  className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition"
                  title="Restart"
                >
                  <RotateCcw size={16} />
                </button>

                <div className="w-[1px] h-6 bg-slate-800 mx-1" />

                {/* Aspect Ratio Croppers */}
                <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800/60">
                  <button
                    id="btn-aspect-landscape"
                    onClick={() => setAspectRatio('landscape')}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-all ${aspectRatio === 'landscape' ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    16:9
                  </button>
                  <button
                    id="btn-aspect-vertical"
                    onClick={() => setAspectRatio('vertical')}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-all ${aspectRatio === 'vertical' ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    9:16 vertical
                  </button>
                  <button
                    id="btn-aspect-cinema"
                    onClick={() => setAspectRatio('cinema')}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-all ${aspectRatio === 'cinema' ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    2.39:1 films
                  </button>
                </div>
              </div>

              {/* Sound / Isolate Track Options */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase hidden sm:inline">Sound Engine</span>
                <button
                  id="btn-toggle-audio"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${audioEnabled ? 'bg-cyan-950/50 text-cyan-400 border-cyan-500/30' : 'bg-slate-850 text-slate-500 border-slate-800/80 hover:text-slate-400'}`}
                >
                  {audioEnabled ? (
                    <>
                      <Volume2 size={13} className="animate-bounce" />
                      <span>ON (Stereo)</span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={13} />
                      <span>MUTED</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Grading Suite (LUTS & Timeline Tracks) */}
        <div className="lg:col-span-4 p-4 md:p-6 flex flex-col justify-between gap-6 bg-slate-950/40">
          
          {/* Color Grading Panel */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Sliders size={14} className="text-cyan-400" />
                Color Grading Suite
              </span>
              <span className="text-[9px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                LUT SELECTOR
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">
              Interact with custom LUT maps coded specifically for Bangladesh's unique lighting conditions, warm suns, and vibrant colors.
            </p>

            <div className="space-y-2.5">
              {FILTERS.map((filter) => {
                const isActive = activeFilter.id === filter.id;
                return (
                  <button
                    key={filter.id}
                    id={`btn-lut-${filter.id}`}
                    onClick={() => setActiveFilter(filter)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isActive 
                        ? 'bg-slate-800/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
                        : 'bg-slate-900/45 border-slate-800/50 hover:bg-slate-800/40 hover:border-slate-700'
                    }`}
                  >
                    {/* Small Color Swatch resembling color wheels */}
                    <div className="relative mt-0.5 flex-shrink-0">
                      <div className={`w-5 h-5 rounded-full ${filter.colorGradingWheelColor} border-2 border-slate-950 flex items-center justify-center`}>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-medium ${isActive ? 'text-white font-bold' : 'text-slate-300'}`}>
                          {filter.name}
                        </span>
                        {isActive && (
                          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 px-1 rounded uppercase tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {filter.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini Editing Track Console */}
          <div className="pt-4 border-t border-slate-800/70">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-3 font-bold">
              <Layers size={14} className="text-cyan-400" />
              NLE Timeline Layers
            </span>
            <div className="space-y-1.5 text-[11px] font-mono">
              {[
                { track: 'V2', name: 'Vector Overlay Layer', type: 'Design overlay', active: true },
                { track: 'V1', name: 'Raw Video (Dhaka Streets)', type: 'Master video', active: true },
                { track: 'A1', name: 'Voiceover (Acoustic Studio)', type: 'Audio clip', active: true },
                { track: 'A2', name: 'Dhaka City Street Ambient', type: 'Sound FX', active: audioEnabled }
              ].map((layer) => (
                <div 
                  key={layer.track}
                  onClick={() => setActiveTrack(activeTrack === layer.track ? null : layer.track)}
                  className={`p-2 rounded flex items-center justify-between border cursor-pointer transition ${
                    activeTrack === layer.track 
                      ? 'bg-slate-800 border-cyan-500/40' 
                      : 'bg-slate-900/30 border-slate-800/40 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-950 px-1.5 py-0.5 rounded text-slate-400 text-[10px] font-bold">
                      {layer.track}
                    </span>
                    <span className={activeTrack === layer.track ? 'text-cyan-400 font-semibold' : 'text-slate-300'}>
                      {layer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="text-[9px] font-mono">{layer.type}</span>
                    <Eye size={11} className={layer.active ? 'text-cyan-400' : 'text-slate-700'} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3.5 bg-slate-900/20 p-2.5 rounded-lg border border-slate-800/40 flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400 shrink-0" />
              <p className="text-[10px] text-slate-400 leading-snug">
                <strong>Showreel Workflow:</strong> Handled entirely in-house using Premiere Pro and Davinci Resolve Studio, integrating precise 4K grade matching.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
