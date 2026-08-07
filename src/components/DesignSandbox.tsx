import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Image, Sliders, ToggleLeft, ToggleRight, Sparkles, CheckCircle2, RotateCcw, Edit3 } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface DesignSandboxProps {
  showcaseImage: string;
}

interface PaletteTheme {
  id: string;
  name: string;
  bgGlow: string;
  accentText: string;
  colorSwatchClass: string;
  cssMixBlendMode: string;
}

const PALETTES: PaletteTheme[] = [
  {
    id: 'sovereign_bengal',
    name: 'Cyan Electric (Cyan & Purple)',
    bgGlow: 'from-cyan-950/40 via-purple-900/10 to-transparent',
    accentText: 'text-cyan-400',
    colorSwatchClass: 'bg-cyan-500 border-purple-500',
    cssMixBlendMode: 'hue-rotate(0deg) saturate(100%)'
  },
  {
    id: 'crimson_sunset',
    name: 'Purple Velvet (Violet & Fuchsia)',
    bgGlow: 'from-purple-950/40 via-fuchsia-950/10 to-transparent',
    accentText: 'text-purple-400',
    colorSwatchClass: 'bg-purple-600 border-fuchsia-400',
    cssMixBlendMode: 'hue-rotate(45deg) saturate(130%)'
  },
  {
    id: 'cyber_dhaka',
    name: 'Cyberpunk Neon (Cyan & Violet)',
    bgGlow: 'from-cyan-950/40 via-fuchsia-950/10 to-transparent',
    accentText: 'text-fuchsia-400',
    colorSwatchClass: 'bg-cyan-400 border-fuchsia-500',
    cssMixBlendMode: 'hue-rotate(-30deg) saturate(150%)'
  }
];

export default function DesignSandbox({ showcaseImage }: DesignSandboxProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activePalette, setActivePalette] = useState<PaletteTheme>(PALETTES[0]);
  const [layerTiger, setLayerTiger] = useState(true);
  const [layerRickshaw, setLayerRickshaw] = useState(true);
  const [layerNeonGrid, setLayerNeonGrid] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseFloat(e.target.value));
  };

  // Build composite CSS filters depending on active layers
  const getPosterFilter = () => {
    let filters = activePalette.cssMixBlendMode;
    if (!layerRickshaw) {
      filters += ' saturate(60%) contrast(90%)';
    }
    if (!layerTiger) {
      filters += ' brightness(80%)';
    }
    return filters;
  };

  return (
    <div id="design-sandbox-panel" className="relative bg-slate-900/65 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      {/* BACKGROUND AMBIENT COLOR GRADING SHAPES */}
      <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-500/25 via-fuchsia-500/20 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-12 -right-12 w-80 h-80 rounded-full bg-gradient-to-bl from-purple-500/20 via-teal-500/15 to-transparent blur-3xl pointer-events-none z-0" />
      {/* Top Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={15} className="text-cyan-400" />
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
            VECTOR DESIGN ENGINE
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
          <span>PSD / AI LAYER COMPS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Drag Slider Design Preview */}
        <div className="lg:col-span-7 p-4 md:p-6 flex flex-col justify-between items-center bg-slate-950/15 border-r border-slate-800/60">
          
          <div className="w-full text-center mb-4">
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900/85 px-2 py-1 rounded border border-slate-800">
              ◄ DRAG SLIDER TO REVIEW WORKFLOW STEPS ►
            </span>
          </div>

          {/* Slider Container Stage */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 select-none shadow-inner max-w-[500px]">
            
            {/* BACKGROUND GLOW */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${activePalette.bgGlow} transition-all duration-700`} />

            {/* DESIGN LAYER 1: Master finished colorful render */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={showcaseImage}
                alt="Finished Master Graphic Vector Artwork"
                style={{ filter: getPosterFilter() }}
                className="w-full h-full object-cover transition-all duration-350 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Overlay active design marks */}
              {layerNeonGrid && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              )}
            </div>

            {/* DESIGN LAYER 2: Draft/Outline sketch comparing slice */}
            <div 
              className="absolute inset-0 border-r-2 border-cyan-400/80 pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0 w-[500px] h-full" style={{ width: '500px', maxWidth: 'unset' }}>
                <img
                  src={showcaseImage}
                  alt="Raw Blueprint Design Outline Draft Sketch"
                  className="w-full h-full object-cover grayscale contrast-[250%] opacity-90 brightness-75 select-none pointer-events-none"
                  style={{ width: '500px', height: '100%', maxWidth: 'unset' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color" />
              </div>
            </div>

            {/* Slider Labels */}
            <div className="absolute bottom-3 left-3 bg-black/75 px-2 py-1 rounded font-mono text-[9px] text-slate-400 border border-slate-800 pointer-events-none">
              DRAFT OUTLINES
            </div>
            <div className="absolute bottom-3 right-3 bg-black/75 px-2 py-1 rounded font-mono text-[9px] text-cyan-400 border border-cyan-950 pointer-events-none">
              FINAL ENHANCED VECTOR
            </div>

            {/* Simulated Illustrator bounding box highlights if hovered */}
            {layerTiger && (
              <div className="absolute top-[32%] left-[40%] w-[25%] h-[35%] border border-dashed border-cyan-400/30 rounded pointer-events-none">
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-slate-900" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-slate-900" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1 bg-cyan-950 text-cyan-400 font-mono text-[8px] rounded">
                  Tiger_Path
                </span>
              </div>
            )}

            {/* Drag input slider overlaid */}
            <input
              id="design-compare-slider"
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              onMouseDown={() => setIsSliding(true)}
              onMouseUp={() => setIsSliding(false)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>

          {/* Slider input control panel below */}
          <div className="w-full mt-4 flex items-center justify-between gap-4">
            <span className="text-[10px] font-mono text-slate-500">DRAFT INKS</span>
            <div className="flex-1 h-1 bg-slate-800 rounded relative">
              <div 
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded"
                style={{ width: `${sliderPosition}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-500">MASTER ART</span>
          </div>

        </div>

        {/* Right: Layers and Vector Palette Controls */}
        <div className="lg:col-span-5 p-4 md:p-6 flex flex-col justify-between gap-5 bg-slate-950/45">
          
          {/* Layer Comps */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Sliders size={14} className="text-cyan-400" />
                Vector Layers Panel
              </span>
              <button 
                id="btn-reset-design-layers"
                onClick={() => {
                  setLayerTiger(true);
                  setLayerRickshaw(true);
                  setLayerNeonGrid(true);
                  setSliderPosition(50);
                }}
                className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300 transition"
                title="Reset Layers"
              >
                <RotateCcw size={12} />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Showcasing professional composition. Turn off vectors or sketch elements to see the foundational layouts of our Bangladeshi masterpiece.
            </p>

            <div className="space-y-2">
              {/* Layer 1 */}
              <div className="p-3 bg-slate-900/50 border border-slate-800/80 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">01</span>
                  <div>
                    <span className="text-xs font-medium text-slate-200 block">Geometric Tiger Anchor</span>
                    <span className="text-[10px] text-slate-500 font-mono">Silhouette Vector Path</span>
                  </div>
                </div>
                <button 
                  id="toggle-tiger-layer"
                  onClick={() => setLayerTiger(!layerTiger)}
                  className={`p-1 rounded transition ${layerTiger ? 'text-cyan-400' : 'text-slate-600'}`}
                >
                  {layerTiger ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              {/* Layer 2 */}
              <div className="p-3 bg-slate-900/50 border border-slate-800/80 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">02</span>
                  <div>
                    <span className="text-xs font-medium text-slate-200 block">Rickshaw Floral Art Motif</span>
                    <span className="text-[10px] text-slate-500 font-mono">Symmetry Pattern Layer</span>
                  </div>
                </div>
                <button 
                  id="toggle-rickshaw-layer"
                  onClick={() => setLayerRickshaw(!layerRickshaw)}
                  className={`p-1 rounded transition ${layerRickshaw ? 'text-cyan-400' : 'text-slate-600'}`}
                >
                  {layerRickshaw ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              {/* Layer 3 */}
              <div className="p-3 bg-slate-900/50 border border-slate-800/80 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">03</span>
                  <div>
                    <span className="text-xs font-medium text-slate-200 block">Cyber Dhaka Mesh Grid</span>
                    <span className="text-[10px] text-slate-500 font-mono">Subtle Neon Grid Overlays</span>
                  </div>
                </div>
                <button 
                  id="toggle-grid-layer"
                  onClick={() => setLayerNeonGrid(!layerNeonGrid)}
                  className={`p-1 rounded transition ${layerNeonGrid ? 'text-cyan-400' : 'text-slate-600'}`}
                >
                  {layerNeonGrid ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Color Palettes Swatches */}
          <div className="pt-4 border-t border-slate-800/70">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5 font-bold">
              <Sparkles size={13} className="text-cyan-400" />
              Dynamic Color Grade Schemes
            </span>
            <div className="grid grid-cols-3 gap-2">
              {PALETTES.map((palette) => {
                const isSelected = activePalette.id === palette.id;
                return (
                  <button
                    key={palette.id}
                    id={`btn-palette-${palette.id}`}
                    onClick={() => setActivePalette(palette)}
                    className={`p-2 rounded-lg border text-center transition ${
                      isSelected 
                        ? 'bg-slate-800 border-cyan-400/60 shadow-lg shadow-cyan-500/10' 
                        : 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full mx-auto mb-1.5 border ${palette.colorSwatchClass} flex items-center justify-center`}>
                      {isSelected && <CheckCircle2 size={11} className="text-white" />}
                    </div>
                    <span className="text-[9px] font-mono leading-none block text-slate-300 truncate">
                      {palette.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
