import React, { useEffect, useRef } from 'react';

interface RippleDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  lineWidth: number;
  color: string;
}

export default function WaterRippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if mobile or touch device and skip canvas on mobile for optimal performance
    if (window.innerWidth < 768 || 'ontouchstart' in window) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const ripples: RippleDrop[] = [];
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const createRipple = (x: number, y: number, intensity = 1) => {
      const colors = [
        'rgba(56, 189, 248, ',  // Sky blue
        'rgba(16, 185, 129, ',  // Emerald aqua
        'rgba(20, 184, 166, '   // Soft teal
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: 18 + Math.min(20, intensity * 12),
        alpha: 0.22 * Math.min(intensity, 1.2),
        speed: 0.8 + Math.random() * 0.4,
        lineWidth: 0.8 + Math.random() * 0.4,
        color
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Logical fluid velocity check: require significant mouse movement and time gap
      if (dist > 45 && now - lastTime > 140) {
        const intensity = Math.min(Math.max(dist / 60, 0.6), 1.4);
        createRipple(e.clientX, e.clientY, intensity);
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Subtle single drop on click
      createRipple(e.clientX, e.clientY, 1.5);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        createRipple(touch.clientX, touch.clientY, 1.2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouchMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.008 * (r.radius / r.maxRadius);

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw subtle liquid wave ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${Math.max(0, r.alpha)})`;
        ctx.lineWidth = Math.max(0.4, r.lineWidth * (1 - r.radius / r.maxRadius));
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-50"
    />
  );
}
