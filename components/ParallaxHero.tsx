"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import KineticTextReveal from "./KineticTextReveal";
import MagneticButton from "./MagneticButton";

interface ParallaxHeroProps {
  headline: string;
  subheadline: string;
  ctaText?: string;
  onCta?: () => void;
}

export default function ParallaxHero({
  headline,
  subheadline,
  ctaText = "Explore More",
  onCta,
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Foreground layer - moves at 1.5x scroll speed
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Middle layer (text) - moves at 1x speed
  const middleY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Background layer - moves at 0.5x speed
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Opacity effect
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Layer - Deep parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-900/10 to-slate-950/50" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-8">
        {/* Top Label - Foreground */}
        <motion.div
          style={{ y: foregroundY }}
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-xs font-medium tracking-widest text-cyan-400 uppercase">
            Premium Experience
          </span>
        </motion.div>

        {/* Main Headline - Middle Layer with text reveal */}
        <motion.div
          style={{
            y: middleY,
            opacity: textOpacity,
          }}
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <KineticTextReveal
            text={headline}
            className="text-8xl md:text-9xl font-black leading-none mb-6 text-white"
            staggerDelay={0.02}
            onHoverFontWeight={true}
          />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          style={{
            y: middleY,
            opacity: textOpacity,
          }}
          className="text-lg md:text-2xl text-slate-300 max-w-2xl text-center mb-12 font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subheadline}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          style={{ y: foregroundY }}
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MagneticButton
            onClick={onCta}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold rounded-lg shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/70 transition-all"
          >
            {ctaText}
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ y: [0, 10, 0], opacity: 1 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-cyan-400"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
