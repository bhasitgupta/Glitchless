"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface HorizontalParallaxProps {
  items: string[];
  speed?: number;
}

export default function HorizontalParallax({
  items,
  speed = 0.5,
}: HorizontalParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -500 * speed]);

  return (
    <section ref={containerRef} className="relative py-20 bg-black overflow-hidden">
      <div className="flex items-center h-64 px-8">
        <motion.div
          style={{ x }}
          className="flex gap-8 whitespace-nowrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {items.concat(items).map((item, index) => (
            <div
              key={index}
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 flex-shrink-0"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
