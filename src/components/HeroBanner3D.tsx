import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Edit3 } from 'lucide-react';
import { SOFTWARES, SoftwareIcon } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

interface HeroBanner3DProps {
  avatarUrl: string;
}

export default function HeroBanner3D({ avatarUrl }: HeroBanner3DProps) {
  const { t } = useLanguage();
  const { siteData, openEditorTo } = useSiteData();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const hero = siteData.hero;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse position values for 3D tilt logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid 3D motion
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    damping: 25,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    damping: 25,
    stiffness: 200,
  });

  // Specular sheen highlight positions
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full relative group py-2"
    >
      {/* TWO SPECIFIC DIAGONAL CORNER FEATHERED GLOWS - DUAL CYAN & PURPLE THEME */}
      
      {/* DIAGONAL CORNER 1: BOTTOM-LEFT (UNDER SKILLS & NAME) - VIBRANT CYAN #00E5FF GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-5 -left-5 sm:-bottom-8 sm:-left-8 w-56 h-56 sm:w-80 sm:h-80 rounded-full blur-[36px] sm:blur-[44px] pointer-events-none z-0 shadow-[0_0_50px_rgba(0,229,255,0.35)]"
        style={{ background: 'radial-gradient(circle, rgba(0, 229, 255, 0.45) 0%, transparent 70%)' }}
      />

      {/* DIAGONAL CORNER 2: TOP-RIGHT (ABOVE PICTURE/HEAD) - ELECTRIC PURPLE #7C3AED GLOW */}
      <motion.div
        animate={{
          scale: [1.03, 0.97, 1.03],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-5 -right-5 sm:-top-8 sm:-right-8 w-56 h-56 sm:w-80 sm:h-80 rounded-full blur-[36px] sm:blur-[44px] pointer-events-none z-0 shadow-[0_0_50px_rgba(124,58,237,0.35)]"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, transparent 70%)' }}
      />

      {/* 3D TILT CONTAINER */}
      <motion.section
        id="home"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl overflow-hidden bg-[#070B14]/90 border border-slate-800/80 p-6 md:p-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] transition-all duration-300"
      >
        {/* GLOWING DUAL-TONE EDGE HIGHLIGHT BORDER (CYAN & PURPLE) */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none p-[1px] bg-gradient-to-r from-cyan-400/40 via-fuchsia-300/25 to-purple-500/40 [mask-image:linear-gradient(white,white)]" />

        {/* Ambient Dark Background Lighting Gradients & Soft Zooming Light Orbs */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/25 via-slate-950/95 to-purple-950/25 z-0 pointer-events-none" />
        
        {/* DIAGONAL 1: Animated Soft Cyan Light Orb Bottom-Left */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -left-32 w-[480px] h-[480px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none"
        />

        {/* DIAGONAL 2: Animated Soft Purple Light Orb Top-Right */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-purple-500/15 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Dynamic Specular Sheen Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-25 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(34,211,238,0.15), transparent 55%)`,
          }}
        />

        {/* LEFT TEXT CONTENT - ELEVATED ON 3D Z-AXIS */}
        <div 
          className="relative z-20 max-w-xl xl:max-w-2xl space-y-4 text-center lg:text-left"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* SMALL PROFESSIONAL INTRO BADGE */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-1.5 bg-cyan-950/60 border border-cyan-500/40 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
            <Sparkles size={11} className="text-cyan-400 animate-pulse" />
            <span>{hero.introBadge || 'Hello, I am'}</span>
          </div>

          {/* PROMINENT RE-STYLED NAME DISPLAY (ALL CAPS, NON-ITALIC, REDUCED FONT SIZE) */}
          <div className="space-y-1 font-sans not-italic font-black tracking-tight leading-none">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[58px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {hero.firstName}
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[58px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]">
              {hero.lastName}
            </h2>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-display text-white leading-tight tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.25)]">
              {hero.title}
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300/90 max-w-xl leading-relaxed font-sans">
            {hero.subtitle}
          </p>

          {/* Slow Moving Marquee with 3D Depth */}
          <div 
            className="w-full overflow-hidden bg-slate-950/80 border border-slate-800/80 rounded-xl py-3 relative mt-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            style={{ transform: 'translateZ(15px)' }}
          >
            {/* Blur edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex whitespace-nowrap gap-8"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
              style={{ width: 'fit-content' }}
            >
              {[
                ...(hero.tickerSkills && hero.tickerSkills.length > 0
                  ? hero.tickerSkills
                  : ['Professional Video Editor', 'Graphic Designer', 'AI Specialist', 'Social Media Marketer']),
                ...(hero.tickerSkills && hero.tickerSkills.length > 0
                  ? hero.tickerSkills
                  : ['Professional Video Editor', 'Graphic Designer', 'AI Specialist', 'Social Media Marketer']),
                ...(hero.tickerSkills && hero.tickerSkills.length > 0
                  ? hero.tickerSkills
                  : ['Professional Video Editor', 'Graphic Designer', 'AI Specialist', 'Social Media Marketer']),
                ...(hero.tickerSkills && hero.tickerSkills.length > 0
                  ? hero.tickerSkills
                  : ['Professional Video Editor', 'Graphic Designer', 'AI Specialist', 'Social Media Marketer']),
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2.5 shrink-0">
                  <span className="text-cyan-400 font-mono text-xs">✦</span>
                  <span className="text-xs sm:text-sm font-syne font-bold text-slate-200 uppercase tracking-wider">
                    {skill}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* RIGHT SOFTWARE SUITE RADIAL STAGE - HIGH 3D DEPTH (translateZ 50px) */}
        <div
          className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center shrink-0 my-2 lg:my-0 lg:mr-2 z-20"
          style={{ transform: 'translateZ(50px)' }}
        >
          {/* Center photo avatar of Tashfiq - Elevated with Dual Cyan & Purple Glow */}
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 sm:border-3 border-cyan-400/80 p-1.5 shadow-[0_0_30px_rgba(34,211,238,0.35)] z-20 group/avatar overflow-hidden bg-slate-900">
            <img
              src={hero.avatarUrl || avatarUrl}
              alt="Tashfiq Ahmed Tamim"
              className="w-full h-full object-cover rounded-full filter contrast-105 transition-transform duration-500 group-hover/avatar:scale-108"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Outer Orbit Tracks with Subtle Cyan & Purple Glow */}
          <div className="absolute w-[224px] h-[224px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
          <div className="absolute w-[248px] h-[248px] sm:w-[310px] sm:h-[310px] rounded-full border border-purple-400/25 pointer-events-none" />

          {/* Orbiting Software PNG Logos - Uniform Size, Balanced Distance & Smooth Subtle Zoom */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {SOFTWARES.map((software: SoftwareIcon, idx: number) => {
              const baseAngle = (idx * 360) / SOFTWARES.length;
              const radius = isMobile ? 112 : 140; // Balanced orbit distance for Mobile & Desktop

              const steps = 36;
              const xKeyframes: number[] = [];
              const yKeyframes: number[] = [];

              for (let step = 0; step <= steps; step++) {
                const currentAngle = baseAngle + (step * 360) / steps;
                const rad = (currentAngle * Math.PI) / 180;
                xKeyframes.push(Math.round(Math.cos(rad) * radius));
                yKeyframes.push(Math.round(Math.sin(rad) * radius));
              }

              return (
                <motion.div
                  key={software.name}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/icon cursor-pointer z-20"
                  animate={{
                    x: xKeyframes,
                    y: yKeyframes,
                  }}
                  transition={{
                    x: { ease: 'linear', duration: 28, repeat: Infinity },
                    y: { ease: 'linear', duration: 28, repeat: Infinity },
                    scale: { type: 'spring', stiffness: 350, damping: 22 },
                  }}
                  whileHover={{ scale: 1.25, zIndex: 40 }}
                  whileTap={{ scale: 1.08 }}
                  title={software.name}
                >
                  <div className="w-11 h-11 sm:w-13 sm:h-13 aspect-square flex items-center justify-center p-0.5 select-none transition-all duration-300 group-hover/icon:drop-shadow-[0_0_22px_rgba(34,211,238,0.95)]">
                    {software.imageUrl ? (
                      <img
                        src={software.imageUrl}
                        alt={software.name}
                        className="w-full h-full max-w-full max-h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] transition-transform duration-300 group-hover/icon:brightness-125"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-xs sm:text-sm tracking-wider font-extrabold text-white">
                        {software.abbreviation}
                      </span>
                    )}
                  </div>

                  {/* Tooltip badge */}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-950/95 border border-cyan-500/50 rounded-md px-2.5 py-1 text-[10px] font-sans font-bold whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-all duration-200 pointer-events-none text-cyan-300 shadow-2xl z-30 transform group-hover/icon:translate-y-0 translate-y-1">
                    {software.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
