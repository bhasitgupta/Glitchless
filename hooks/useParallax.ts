import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxConfig {
  speed?: number; // 0.5x for slow, 1.5x for fast
}

export function useParallax(config: ParallaxConfig = {}) {
  const { speed = 0.5 } = config;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * (2 - speed)]);

  return { ref, y, scrollYProgress };
}

export function useScrollTransform(
  startOffset: [number, number] = [0, 1],
  outputRange: [number, number] = [0, -50]
) {
  const { scrollY } = useScroll();

  const transform = useTransform(
    scrollY,
    [0, 500],
    outputRange,
    { clamp: true }
  );

  return transform;
}

export function useBlurOnScroll(startScroll: number = 0, endScroll: number = 500) {
  const { scrollY } = useScroll();

  const blur = useTransform(
    scrollY,
    [startScroll, endScroll],
    [0, 10],
    { clamp: true }
  );

  return blur;
}

export function useScaleOnScroll(startScroll: number = 0, endScroll: number = 500) {
  const { scrollY } = useScroll();

  const scale = useTransform(
    scrollY,
    [startScroll, endScroll],
    [1, 1.1],
    { clamp: true }
  );

  return scale;
}
