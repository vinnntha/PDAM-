"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export default function GlowCard({ children, className = "", variants }: GlowCardProps) {
  return (
    <motion.div
      variants={variants || {
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0 }
      }}
      className={`bg-white/5 border border-green-400/60 shadow-[0_0_16px_rgba(74,222,128,0.35)] hover:shadow-[0_0_28px_rgba(74,222,128,0.6)] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
}
