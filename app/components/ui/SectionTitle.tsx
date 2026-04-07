"use client";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export default function SectionTitle({ title, subtitle, className = "", align = "center" }: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : align === "left" ? "text-left" : "text-right";
  
  return (
    <div className={`mb-12 ${alignClass} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-sky-400 mb-3 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
        {title}
      </h2>
      <p className="text-lg md:text-xl font-semibold text-green-400">
        {subtitle}
      </p>
    </div>
  );
}
