"use client";
import { motion, Variants, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const testis = [
  {
    initials: "AS",
    name: "Andi Santoso",
    loc: "Malang Selatan",
    quote: "Since switching to PDAM Baru, our water supply has been uninterrupted. The online bill payment is so convenient.",
    color: "#38bdf8",
    borderColor: "rgba(56,189,248,0.22)",
    avatarBg: "rgba(56,189,248,0.1)",
    avatarBorder: "rgba(56,189,248,0.3)",
  },
  {
    initials: "RW",
    name: "Rina Wulandari",
    loc: "Blimbing",
    quote: "Proses pengajuan sambungan baru sangat cepat dan mudah. Pelayanannya profesional dan responsif.",
    color: "#4ade80",
    borderColor: "rgba(74,222,128,0.22)",
    avatarBg: "rgba(74,222,128,0.1)",
    avatarBorder: "rgba(74,222,128,0.3)",
  },
  {
    initials: "BH",
    name: "Budi Hartono",
    loc: "Lowokwaru",
    quote: "Laporan gangguan saya ditindaklanjuti dalam hitungan jam. Sangat puas dengan layanan PDAM Baru!",
    color: "#38bdf8",
    borderColor: "rgba(56,189,248,0.22)",
    avatarBg: "rgba(56,189,248,0.1)",
    avatarBorder: "rgba(56,189,248,0.3)",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Animated counter ──────────────────────────────────────────────────────────
interface StatItem { val: string; label: string; numericEnd: number; suffix: string; decimals?: number }

const stats: StatItem[] = [
  { val: "4.9/5",  label: "Average Rating",   numericEnd: 4.9,  suffix: "/5",  decimals: 1 },
  { val: "2,400+", label: "Reviews",           numericEnd: 2400, suffix: "+",  decimals: 0 },
  { val: "98%",    label: "Satisfaction Rate", numericEnd: 98,   suffix: "%",  decimals: 0 },
];

function AnimatedStat({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const [display, setDisplay] = useState("0");
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const duration = 1800; // ms
    const startTime = performance.now();
    const end = stat.numericEnd;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * end;

      if (stat.decimals && stat.decimals > 0) {
        setDisplay(current.toFixed(stat.decimals));
      } else {
        setDisplay(Math.floor(current).toLocaleString("en-US"));
      }

      if (progress < 1) requestAnimationFrame(tick);
      else {
        // Snap to exact final value
        if (stat.decimals && stat.decimals > 0) setDisplay(end.toFixed(stat.decimals));
        else setDisplay(end.toLocaleString("en-US"));
      }
    }

    requestAnimationFrame(tick);
  }, [inView, stat]);

  return (
    <span style={{
      fontSize: "22px", fontWeight: 900,
      color: "#38bdf8", display: "block",
      textShadow: "0 0 16px rgba(56,189,248,0.4)",
    }}>
      {display}{stat.suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function TestimonialSection() {
  const trustBarRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustBarRef, { once: true, amount: 0.6 });

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "96px 48px",
        borderTop: "1px solid rgba(56,189,248,0.08)",
        borderBottom: "1px solid rgba(56,189,248,0.08)",
        background: "rgba(56,189,248,0.018)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section Header — slides up */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ marginBottom: "56px" }}
        >
          <p style={{
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#4ade80", margin: 0, marginBottom: "10px",
          }}>
            What customers say
          </p>

          <h2 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 900, lineHeight: 1.1,
            color: "#38bdf8", margin: 0, marginBottom: "12px",
            textShadow: "0 0 24px rgba(56,189,248,0.28)",
          }}>
            Testimonials
          </h2>

          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            margin: 0,
          }}>
            Trusted by thousands of households across the region.
          </p>
        </motion.div>

        {/* Cards Grid — each card slides up with stagger */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.18 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {testis.map(({ initials, name, loc, quote, color, borderColor, avatarBg, avatarBorder }) => (
            <motion.div
              key={name}
              variants={cardVariants}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-5px)";
                el.style.borderColor = color === "#38bdf8"
                  ? "rgba(56,189,248,0.45)"
                  : "rgba(74,222,128,0.45)";
                el.style.boxShadow = `0 0 24px ${color === "#38bdf8"
                  ? "rgba(56,189,248,0.12)"
                  : "rgba(74,222,128,0.12)"}`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = borderColor;
                el.style.boxShadow = "none";
              }}
              style={{
                borderRadius: "20px",
                padding: "28px 24px",
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${borderColor}`,
                position: "relative",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: "24px", right: "24px",
                height: "1px",
                background: `linear-gradient(90deg, ${color}50, transparent)`,
              }} />

              {/* Quote mark */}
              <div style={{
                fontSize: "56px", lineHeight: 1,
                color, opacity: 0.15,
                fontFamily: "Georgia, serif",
                marginBottom: "4px",
                marginTop: "-8px",
              }}>
                "
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: "5px", marginBottom: "16px" }}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "11px", height: "11px",
                      background: color,
                      boxShadow: `0 0 6px ${color}99`,
                      clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                    }}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p style={{
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.65)",
                fontStyle: "italic",
                margin: 0,
                marginBottom: "24px",
                flex: 1,
              }}>
                "{quote}"
              </p>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: "rgba(255,255,255,0.06)",
                marginBottom: "20px",
              }} />

              {/* Author row */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Avatar */}
                <div style={{
                  width: "40px", height: "40px",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: avatarBg,
                  border: `1px solid ${avatarBorder}`,
                  fontSize: "12px", fontWeight: 800,
                  color,
                  flexShrink: 0,
                }}>
                  {initials}
                </div>

                <div>
                  <p style={{
                    fontSize: "14px", fontWeight: 700,
                    color: "#ffffff", margin: 0, marginBottom: "2px",
                  }}>
                    {name}
                  </p>
                  <p style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.35)",
                    margin: 0,
                  }}>
                    {loc}
                  </p>
                </div>

                {/* Verified badge */}
                <div style={{
                  marginLeft: "auto",
                  fontSize: "10px", fontWeight: 700,
                  color,
                  background: color === "#38bdf8"
                    ? "rgba(56,189,248,0.1)"
                    : "rgba(74,222,128,0.1)",
                  border: `1px solid ${color === "#38bdf8"
                    ? "rgba(56,189,248,0.25)"
                    : "rgba(74,222,128,0.25)"}`,
                  padding: "3px 10px",
                  borderRadius: "999px",
                  letterSpacing: "0.06em",
                }}>
                  ✓ Verified
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Trust bar — slides up + numbers count from 0 */}
        <motion.div
          ref={trustBarRef}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              <div style={{ textAlign: "center" }}>
                <AnimatedStat stat={stat} inView={trustInView} />
                <span style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  {stat.label}
                </span>
              </div>
              {i < 2 && (
                <div style={{
                  width: "1px", height: "32px",
                  background: "rgba(255,255,255,0.1)",
                }} />
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}