"use client";
import React from "react";
import { motion } from "motion/react";

interface RevealHeadingProps {
  children: React.ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p";
  color?: string;
  delay?: number;
}

export function RevealHeading({
  children,
  className = "",
  tag = "h2",
  color = "#11261A",
  delay = 0,
}: RevealHeadingProps) {
  const Tag = tag;

  return (
    <div className={`relative w-fit overflow-hidden ${className}`}>
      {/* The Text */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: delay + 0.3,
          ease: [0.165, 0.84, 0.44, 1],
        }}
      >
        <Tag>{children}</Tag>
      </motion.div>

      {/* The Revelator Box */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          delay: delay,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ backgroundColor: color }}
        className="absolute inset-0 z-20 pointer-events-none"
      />
    </div>
  );
}
