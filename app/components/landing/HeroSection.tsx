"use client";
import { motion } from "framer-motion";
import { Droplet, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Animated stat counter (fires on mount after a delay) ─────────────────────
interface HeroStat { v: string; l: string; numericEnd?: number; suffix?: string; decimals?: number; isK?: boolean }

function AnimatedHeroStat({ stat, startDelay }: { stat: HeroStat; startDelay: number }) {
  const [display, setDisplay] = useState("0");
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || stat.numericEnd === undefined) return;
    const timer = setTimeout(() => {
      startedRef.current = true;
      const duration = 1600;
      const startTime = performance.now();
      const end = stat.numericEnd!;

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = eased * end;

        if (stat.isK) {
          setDisplay(Math.floor(current / 1000) + "K" + (stat.suffix || ""));
        } else if (stat.decimals && stat.decimals > 0) {
          setDisplay(current.toFixed(stat.decimals) + (stat.suffix || ""));
        } else {
          setDisplay(Math.floor(current).toLocaleString("en-US") + (stat.suffix || ""));
        }

        if (progress < 1) requestAnimationFrame(tick);
        else {
          if (stat.isK) setDisplay(Math.round(end / 1000) + "K" + (stat.suffix || ""));
          else if (stat.decimals && stat.decimals > 0) setDisplay(end.toFixed(stat.decimals) + (stat.suffix || ""));
          else setDisplay(end.toLocaleString("en-US") + (stat.suffix || ""));
        }
      }
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [stat, startDelay]);

  // Non-numeric stats display as-is
  if (stat.numericEnd === undefined) {
    return <span style={{ fontSize: "26px", fontWeight: 900, color: "#38bdf8", display: "block", lineHeight: 1 }}>{stat.v}</span>;
  }

  return <span style={{ fontSize: "26px", fontWeight: 900, color: "#38bdf8", display: "block", lineHeight: 1 }}>{display}</span>;
}
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      style={{ backgroundColor: "transparent", minHeight: "100vh", position: "relative", zIndex: 10 }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.04,
          backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content wrapper */}
      <div
        style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 48px",
          minHeight: "100vh", display: "flex", alignItems: "center",
          position: "relative", zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center", width: "100%",
            paddingTop: "80px", paddingBottom: "40px",
          }}
        >

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 16px", borderRadius: "999px", marginBottom: "28px",
                border: "1px solid rgba(74,222,128,0.4)",
                color: "#4ade80", background: "rgba(74,222,128,0.05)",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              }}
            >
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#4ade80", boxShadow: "0 0 8px #4ade80",
                animation: "pulse 2s infinite",
              }} />
              Public Water Service
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: "clamp(52px, 7vw, 88px)",
                fontWeight: 900, lineHeight: 1.0,
                letterSpacing: "-2px", margin: 0, marginBottom: "16px",
                color: "#38bdf8",
                textShadow: "0 0 40px rgba(56,189,248,0.35)",
              }}
            >
              PDAM
              <br />
              <span style={{ color: "#ffffff", textShadow: "none" }}>Baru</span>
            </motion.h1>

            {/* Green accent line */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                width: "56px", height: "2px", marginBottom: "24px",
                transformOrigin: "left",
                background: "linear-gradient(90deg, #4ade80, transparent)",
                boxShadow: "0 0 10px rgba(74,222,128,0.6)",
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: "16px", lineHeight: 1.75,
                color: "rgba(255,255,255,0.5)",
                maxWidth: "420px", margin: 0, marginBottom: "36px",
              }}
            >
              Clean water delivered reliably — managing public utility
              services for a smarter, more sustainable community.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              style={{ display: "flex", gap: "16px", marginBottom: "48px", flexWrap: "wrap" }}
            >
              <Link href="/sign-up">
                <button
                  style={{
                    padding: "12px 28px", borderRadius: "12px",
                    background: "#38bdf8", color: "#0a0f1e",
                    fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer",
                    boxShadow: "0 0 24px rgba(56,189,248,0.5)",
                    transition: "all 0.3s", letterSpacing: "0.02em",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 36px rgba(56,189,248,0.75)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(56,189,248,0.5)";
                  }}
                >
                  Register Now
                </button>
              </Link>

              <button
                onClick={() => scrollTo("services")}
                style={{
                  padding: "12px 28px", borderRadius: "12px",
                  color: "#4ade80", fontSize: "14px", fontWeight: 600,
                  border: "1px solid rgba(74,222,128,0.4)",
                  background: "rgba(74,222,128,0.04)",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(74,222,128,0.3)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(74,222,128,0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(74,222,128,0.04)";
                }}
              >
                Our Services
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
              style={{ display: "flex", gap: "0" }}
            >
              {([
                { v: "10K+", l: "Customers", numericEnd: 10000, suffix: "+", isK: true },
                { v: "24/7", l: "Support" },
                { v: "99%",  l: "Uptime",    numericEnd: 99,    suffix: "%"  },
              ] as HeroStat[]).map((s, i) => (
                <div
                  key={s.l}
                  style={{
                    paddingRight: i < 2 ? "32px" : "0",
                    paddingLeft: i > 0 ? "32px" : "0",
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  <AnimatedHeroStat stat={s} startDelay={700 + i * 150} />
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    {s.l}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN — Orbital Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: "420px" }}
          >
            {/* Outer ring — green, rotating clockwise */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: "340px", height: "340px", borderRadius: "50%",
                border: "1px solid rgba(74,222,128,0.2)",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: "50%",
                transform: "translate(-50%, -50%)",
                width: "10px", height: "10px", borderRadius: "50%",
                background: "#4ade80", boxShadow: "0 0 12px #4ade80, 0 0 24px rgba(74,222,128,0.5)",
              }} />
            </motion.div>

            {/* Middle ring — blue, rotating counter-clockwise */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: "240px", height: "240px", borderRadius: "50%",
                border: "1px solid rgba(56,189,248,0.18)",
              }}
            >
              <div style={{
                position: "absolute", bottom: 0, left: "50%",
                transform: "translate(-50%, 50%)",
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#38bdf8", boxShadow: "0 0 12px #38bdf8, 0 0 24px rgba(56,189,248,0.5)",
              }} />
            </motion.div>

            {/* Inner ring — faint */}
            <div style={{
              position: "absolute",
              width: "155px", height: "155px", borderRadius: "50%",
              border: "1px solid rgba(74,222,128,0.08)",
            }} />

            {/* Center icon box */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "relative", zIndex: 10,
                width: "110px", height: "110px", borderRadius: "24px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(56,189,248,0.07)",
                border: "1px solid rgba(56,189,248,0.25)",
                boxShadow: "0 0 40px rgba(56,189,248,0.18), inset 0 0 30px rgba(56,189,248,0.06)",
              }}
            >
              <Droplet
                size={48}
                style={{
                  color: "#38bdf8",
                  filter: "drop-shadow(0 0 16px rgba(56,189,248,0.9))",
                }}
              />
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}