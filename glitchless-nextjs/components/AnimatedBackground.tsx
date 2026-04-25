"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#00F2FF" : "#10B981",
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Binary rain columns
    const columns: Array<{
      x: number;
      y: number;
      speed: number;
      chars: string[];
      length: number;
      opacity: number;
    }> = [];
    const charWidth = 14;
    for (let x = 0; x < canvas.width; x += charWidth * 2) {
      if (Math.random() > 0.85) {
        columns.push({
          x,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          chars: [],
          length: Math.floor(Math.random() * 15 + 8),
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    }

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    const draw = () => {
      frameCount++;
      
      // Clear with trail effect on pure black
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle gradient overlay for depth on black
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, "rgba(0, 242, 255, 0.02)");
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 150) * 0.2;
            ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulse effect
        const pulse = Math.sin(frameCount * p.pulseSpeed + p.pulseOffset);
        const currentSize = p.size * (1 + pulse * 0.3);
        const currentAlpha = p.alpha * (0.7 + pulse * 0.3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 2);
        glowGradient.addColorStop(0, `${p.color}40`);
        glowGradient.addColorStop(1, "transparent");
        ctx.fillStyle = glowGradient;
        ctx.fill();
      });

      // Draw binary rain
      ctx.font = "12px 'JetBrains Mono', monospace";
      columns.forEach((col) => {
        // Generate new chars if needed
        if (col.chars.length < col.length) {
          col.chars.push(chars[Math.floor(Math.random() * chars.length)]);
        }

        // Draw column
        col.chars.forEach((char, i) => {
          const y = col.y - i * 14;
          if (y > -20 && y < canvas.height + 20) {
            const fadeAlpha = 1 - i / col.length;
            const isHead = i === col.chars.length - 1;
            
            ctx.fillStyle = isHead 
              ? `rgba(0, 242, 255, ${col.opacity + 0.3})`
              : `rgba(16, 185, 129, ${col.opacity * fadeAlpha})`;
            ctx.fillText(char, col.x, y);
          }
        });

        // Move column
        col.y += col.speed;

        // Reset if off screen
        if (col.y - col.length * 14 > canvas.height) {
          col.y = -col.length * 14;
          col.chars = [];
          col.speed = Math.random() * 2 + 1;
        }
      });

      // Draw scanning lines
      const scanY = (frameCount * 0.5) % (canvas.height + 100) - 50;
      const scanGradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      scanGradient.addColorStop(0, "transparent");
      scanGradient.addColorStop(0.5, "rgba(0, 242, 255, 0.05)");
      scanGradient.addColorStop(1, "transparent");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 50, canvas.width, 100);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -1,
        background: "#000000" 
      }}
    />
  );
}
