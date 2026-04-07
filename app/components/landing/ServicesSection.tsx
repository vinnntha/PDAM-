"use client";
import { motion, Variants } from "framer-motion";
import { Droplet, CreditCard, PlusCircle, MessageCircle } from "lucide-react";

const services = [
  {
    icon: Droplet,
    color: "#38bdf8",
    borderColor: "rgba(56,189,248,0.25)",
    bgColor: "rgba(56,189,248,0.08)",
    glowColor: "rgba(56,189,248,0.2)",
    title: "Clean Water Supply",
    desc: "Reliable daily clean water distribution to every household in the service area.",
  },
  {
    icon: CreditCard,
    color: "#4ade80",
    borderColor: "rgba(74,222,128,0.25)",
    bgColor: "rgba(74,222,128,0.06)",
    glowColor: "rgba(74,222,128,0.2)",
    title: "Bill Payment",
    desc: "Pay your monthly water bill quickly and securely through our online portal.",
  },
  {
    icon: PlusCircle,
    color: "#38bdf8",
    borderColor: "rgba(56,189,248,0.25)",
    bgColor: "rgba(56,189,248,0.08)",
    glowColor: "rgba(56,189,248,0.2)",
    title: "New Connection",
    desc: "Apply for a new water line connection for your home or business easily.",
  },
  {
    icon: MessageCircle,
    color: "#4ade80",
    borderColor: "rgba(74,222,128,0.25)",
    bgColor: "rgba(74,222,128,0.06)",
    glowColor: "rgba(74,222,128,0.2)",
    title: "Complaint Handling",
    desc: "Submit issues and track resolution status in real time through your account.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "96px 48px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: "56px" }}
        >
          <p style={{
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#4ade80", marginBottom: "10px",
          }}>
            What we offer
          </p>

          <h2 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 900, lineHeight: 1.1,
            color: "#38bdf8", margin: 0, marginBottom: "12px",
            textShadow: "0 0 24px rgba(56,189,248,0.28)",
          }}>
            Our Services
          </h2>

          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            margin: 0,
          }}>
            Everything you need for clean water management — in one place.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {services.map(({ icon: Icon, color, borderColor, bgColor, glowColor, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 0 28px ${glowColor}`;
                el.style.borderColor = color === "#38bdf8"
                  ? "rgba(56,189,248,0.5)"
                  : "rgba(74,222,128,0.5)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = borderColor;
              }}
              style={{
                position: "relative",
                borderRadius: "20px",
                padding: "28px 24px 36px",
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${borderColor}`,
                cursor: "default",
                transition: "all 0.3s ease",
              }}
            >
              {/* Icon box */}
              <div style={{
                width: "48px", height: "48px",
                borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: bgColor,
                border: `1px solid ${borderColor}`,
                marginBottom: "20px",
              }}>
                <Icon size={22} style={{ color }} />
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "15px", fontWeight: 700,
                color: "#ffffff", margin: 0, marginBottom: "10px",
              }}>
                {title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: "13px", lineHeight: 1.7,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}>
                {desc}
              </p>

              {/* Arrow indicator */}
              <div style={{
                position: "absolute", bottom: "20px", right: "20px",
                fontSize: "18px", color,
                opacity: 0.35,
                transition: "opacity 0.3s",
              }}>
                →
              </div>

              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: "24px", right: "24px",
                height: "1px",
                background: `linear-gradient(90deg, ${color}40, transparent)`,
                borderRadius: "999px",
              }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div style={{
            height: "1px", flex: 1,
            background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.2))",
          }} />
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
            margin: 0, whiteSpace: "nowrap",
          }}>
            All services available 24/7 online
          </p>
          <div style={{
            height: "1px", flex: 1,
            background: "linear-gradient(90deg, rgba(74,222,128,0.2), transparent)",
          }} />
        </motion.div>

      </div>
    </section>
  );
}