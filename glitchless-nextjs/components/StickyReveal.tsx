"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface StickyRevealProps {
  backgroundImage?: string;
  title: string;
  cards: Array<{
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}

export default function StickyReveal({
  backgroundImage,
  title,
  cards,
}: StickyRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end center"],
  });

  // Progressive blur effect
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Sticky Background with Blur */}
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          filter: blur,
          scale: scale,
        }}
        className="absolute inset-0 z-0"
      >
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content Layer - Scrolls over sticky background */}
      <div className="relative z-10 px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-black text-white mb-20 leading-tight"
          >
            {title}
          </motion.h2>

          {/* Glassmorphism Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all cursor-pointer"
              >
                {card.icon && (
                  <div className="mb-6 text-4xl text-cyan-400">{card.icon}</div>
                )}
                <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-slate-300 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
