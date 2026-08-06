import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function CustomMouseEffects() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Web Audio Context for zero-latency, smooth sound effects
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize or resume AudioContext safely
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Play subtle zoom-in synth pitch sweep sound effect on mouse movement
  const playMoveZoomSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      // Rising zoom-in pitch sweep (280Hz to 780Hz)
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.05);

      gain.gain.setValueAtTime(0.015, now); // Very soft, pleasing, subtle volume
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // AudioContext might be blocked until first click, safely ignore
    }
  }, [soundEnabled, getAudioContext]);

  // Play subtle synth blip on hover / move over interactive elements
  const playHoverSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Crisp subtle tone around 580Hz rising briefly
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.025, ctx.currentTime); // Very soft, pleasing volume
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // AudioContext might be blocked until first click, safely ignore
    }
  }, [soundEnabled, getAudioContext]);

  // Play crisp click sound effect
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Pop / Zoom sound effect
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // ignore
    }
  }, [soundEnabled, getAudioContext]);

  const lastPosRef = useRef({ x: -100, y: -100 });
  const lastMoveSoundTimeRef = useRef(0);

  useEffect(() => {
    let lastHoverTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Calculate distance moved to play zoom-in sound effect on mouse movement
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const now = Date.now();

      if (dist > 24 && now - lastMoveSoundTimeRef.current > 130) {
        playMoveZoomSound();
        lastMoveSoundTimeRef.current = now;
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }

      // Check if mouse is hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, textarea, select, img, [role="button"], .cursor-pointer, .group')
        );
        
        if (isInteractive && !isHoveringInteractive) {
          setIsHoveringInteractive(true);
          if (now - lastHoverTime > 80) { // Throttled blip
            playHoverSound();
            lastHoverTime = now;
          }
        } else if (!isInteractive && isHoveringInteractive) {
          setIsHoveringInteractive(false);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      setHasUserInteracted(true);
      playClickSound();

      // Spawn click ripple ring with zoom effect
      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-6), newRipple]); // max 7 active ripples
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHoveringInteractive, playHoverSound, playClickSound, playMoveZoomSound]);

  // Remove old ripples after animation duration
  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* SMALLER AMBIENT GLOW FOLLOW LIGHT WITH FULL FEATHERING (110px, BLUR 36px) */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-30 transition-transform duration-75 ease-out rounded-full"
        style={{
          width: '110px',
          height: '110px',
          transform: `translate3d(${mousePos.x - 55}px, ${mousePos.y - 55}px, 0)`,
          background: isHoveringInteractive
            ? 'radial-gradient(circle, rgba(34, 211, 238, 0.45) 0%, rgba(168, 85, 247, 0.3) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(15, 23, 42, 0) 70%)',
          filter: 'blur(36px)',
        }}
      />

      {/* DYNAMIC COMPACT CYAN & PURPLE CURSOR RING WITH GLOW & HOVER ZOOM */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.5)] bg-purple-500/10 backdrop-blur-[1px]"
        animate={{
          x: mousePos.x - (isHoveringInteractive ? 20 : isMouseDown ? 12 : 15),
          y: mousePos.y - (isHoveringInteractive ? 20 : isMouseDown ? 12 : 15),
          width: isHoveringInteractive ? 40 : isMouseDown ? 24 : 30,
          height: isHoveringInteractive ? 40 : isMouseDown ? 24 : 30,
          scale: isMouseDown ? 0.85 : isHoveringInteractive ? 1.2 : 1,
          borderColor: isHoveringInteractive ? 'rgba(34, 211, 238, 0.95)' : 'rgba(168, 85, 247, 0.75)',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.3,
        }}
      />

      {/* CORE CYAN CURSOR DOT */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
        style={{
          transform: `translate3d(${mousePos.x - 4}px, ${mousePos.y - 4}px, 0)`,
        }}
      />

      {/* CLICK ZOOM-IN / ZOOM-OUT RIPPLE & GLOW EXPANSION EFFECTS */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            {/* Outer Expanding Glowing Ring (Zoom Out Visual Effect) */}
            <motion.div
              initial={{
                x: ripple.x - 8,
                y: ripple.y - 8,
                width: 16,
                height: 16,
                opacity: 0.9,
                scale: 0.4,
              }}
              animate={{
                x: ripple.x - 65,
                y: ripple.y - 65,
                width: 130,
                height: 130,
                opacity: 0,
                scale: 2,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => removeRipple(ripple.id)}
              className="pointer-events-none fixed top-0 left-0 z-40 rounded-full border-2 border-cyan-400/90 shadow-[0_0_25px_rgba(34,211,238,0.8)]"
            />

            {/* Inner Flash Burst (Zoom In Visual Effect) */}
            <motion.div
              initial={{
                x: ripple.x - 20,
                y: ripple.y - 20,
                width: 40,
                height: 40,
                opacity: 0.85,
                scale: 1.3,
              }}
              animate={{
                x: ripple.x - 4,
                y: ripple.y - 4,
                width: 8,
                height: 8,
                opacity: 0,
                scale: 0.2,
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="pointer-events-none fixed top-0 left-0 z-40 rounded-full bg-purple-400 shadow-[0_0_16px_#c084fc]"
            />
          </React.Fragment>
        ))}
      </AnimatePresence>

      {/* SOUND TOGGLE FLOATING BADGE FOR USER CONVENIENCE */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => {
            getAudioContext();
            setSoundEnabled((prev) => !prev);
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border shadow-2xl backdrop-blur-md transition-all duration-300 text-xs font-mono font-medium ${
            soundEnabled
              ? 'bg-slate-900/90 border-cyan-500/50 text-cyan-300 hover:bg-slate-800'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle Mouse Sound Effects"
        >
          {soundEnabled ? (
            <>
              <Volume2 size={14} className="text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">Mouse Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX size={14} className="text-slate-500" />
              <span className="hidden sm:inline">Mouse Sound OFF</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
