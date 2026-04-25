"use client";

import { useState } from "react";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  onClick?: () => void;
}

export default function HolographicCard({ children, className = "", intensity = "medium", onClick }: HolographicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const intensityClasses = {
    low: "hologram-low",
    medium: "hologram-medium",
    high: "hologram-high",
  };

  return (
    <div
      className={`relative ${intensityClasses[intensity]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={
        isHovered
          ? {
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 242, 255, 0.15), transparent 50%)`,
            }
          : {}
      }
    >
      <div className="hologram-border"></div>
      <div className="hologram-scanline"></div>
      <div className="hologram-content">{children}</div>
    </div>
  );
}
