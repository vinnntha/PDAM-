"use client";

import { ReactNode } from "react";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function GlowButton({ children, className = "", ...props }: GlowButtonProps) {
  return (
    <button
      className={`bg-sky-400 text-[#0a0f1e] font-bold shadow-[0_0_20px_rgba(56,189,248,0.55)] hover:shadow-[0_0_35px_rgba(56,189,248,0.85)] rounded-xl px-8 py-3 hover:scale-105 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
