"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";

interface KineticTextRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  onHoverFontWeight?: boolean;
}

export default function KineticTextReveal({
  text,
  className = "",
  staggerDelay = 0.05,
  onHoverFontWeight = true,
}: KineticTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier
      },
    },
  };

  const hoverVariants = onHoverFontWeight ? {
    initial: { fontWeight: 400 },
    whileHover: { fontWeight: 800 },
  } : {};

  return (
    <motion.div
      ref={containerRef}
      className={`font-sans ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {text.split(" ").map((word, wordIndex, array) => (
        <React.Fragment key={wordIndex}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={childVariants}
                className="inline-block"
                {...(onHoverFontWeight && {
                  initial: hoverVariants.initial,
                  whileHover: hoverVariants.whileHover,
                })}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex !== array.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.div>
  );
}
