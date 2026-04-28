"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useState } from "react";

interface BentoItem {
  id: string;
  title: string;
  description: string;
  size: "small" | "medium" | "large";
  gradient: string;
  icon?: React.ReactNode;
}

interface BentoGridProps {
  items: BentoItem[];
  title: string;
}

export default function BentoGrid({ items, title }: BentoGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-slate-950 py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-7xl md:text-8xl font-black text-white mb-20 leading-tight"
        >
          {title}
        </motion.h2>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {items.map((item) => {
              const isSelected = selectedId === item.id;
              let colSpan = "col-span-1";
              let rowSpan = "row-span-1";

              if (item.size === "medium") {
                colSpan = "col-span-1 md:col-span-2";
                rowSpan = "row-span-2";
              } else if (item.size === "large") {
                colSpan = "col-span-1 md:col-span-3";
                rowSpan = "row-span-3";
              }

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  onClick={() => setSelectedId(isSelected ? null : item.id)}
                  className={`${colSpan} ${rowSpan} relative overflow-hidden rounded-2xl cursor-pointer group`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"
                  />

                  {/* Content */}
                  <motion.div
                    className="relative h-64 md:h-80 flex flex-col items-center justify-center p-8 text-center"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {item.icon && (
                      <motion.div
                        className="text-6xl md:text-8xl mb-4 text-white/80"
                        animate={isSelected ? { scale: 1.2 } : { scale: 1 }}
                      >
                        {item.icon}
                      </motion.div>
                    )}

                    <h3 className="text-2xl md:text-4xl font-black text-white mb-2">
                      {item.title}
                    </h3>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="text-sm md:text-base text-white/90 mt-4 leading-relaxed"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Border glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/50 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
