"use client";

import { Droplet, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const quickLinks = [
  { label: "Home",         href: "#home" },
  { label: "Services",     href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About Us",     href: "#about" },
];

const supportLinks = [
  { label: "Help Center",      href: "#" },
  { label: "Service Status",   href: "#" },
  { label: "Contact Us",       href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy",   href: "#" },
];

const contacts = [
  { icon: MapPin, value: "Jl. Sumber Air No. 1, Malang, East Java" },
  { icon: Phone,  value: "(0341) 123-4567" },
  { icon: Mail,   value: "info@pdambaru.id" },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon,  label: "Facebook" },
  { icon: XIcon,         label: "X" },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <footer style={{
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid rgba(74,222,128,0.1)",
    }}>
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, #38bdf8, #4ade80, transparent)",
      }} />

      {/* Orbs */}
      <div style={{
        position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
        bottom: "-150px", left: "-100px",
        background: "rgba(56,189,248,0.07)", filter: "blur(90px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "300px", height: "300px", borderRadius: "50%",
        top: "-80px", right: "-80px",
        background: "rgba(74,222,128,0.05)", filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.02,
        backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        position: "relative", zIndex: 10,
        maxWidth: "1280px", margin: "0 auto",
        padding: "72px 48px 40px",
      }}>

        {/* ── Main Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: "48px",
            marginBottom: "56px",
          }}
        >

          {/* ── Col 1: Brand ── */}
          <div>
            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "none", border: "none", cursor: "pointer",
                padding: 0, marginBottom: "20px",
              }}
            >
              <div style={{
                width: "38px", height: "38px", borderRadius: "11px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.25)",
                boxShadow: "0 0 16px rgba(56,189,248,0.18)",
              }}>
                <Droplet size={18} style={{
                  color: "#38bdf8",
                  filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))",
                }} />
              </div>
              <span style={{
                fontSize: "18px", fontWeight: 900,
                color: "#38bdf8", letterSpacing: "-0.02em",
                textShadow: "0 0 18px rgba(56,189,248,0.35)",
              }}>
                PDAM Baru
              </span>
            </button>

            <p style={{
              fontSize: "13px", lineHeight: 1.75,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "240px", margin: "0 0 24px",
            }}>
              Modernizing water management for a sustainable future. Reliable, clean, and accessible water for all.
            </p>

            {/* Social buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  title={label}
                  style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(74,222,128,0.05)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    color: "#4ade80", cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(74,222,128,0.12)";
                    el.style.borderColor = "rgba(74,222,128,0.45)";
                    el.style.boxShadow = "0 0 12px rgba(74,222,128,0.2)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(74,222,128,0.05)";
                    el.style.borderColor = "rgba(74,222,128,0.2)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h3 style={{
              fontSize: "11px", fontWeight: 700,
              color: "#4ade80", textTransform: "uppercase",
              letterSpacing: "0.12em", margin: "0 0 20px",
            }}>
              Explore
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      padding: 0, fontSize: "13px",
                      color: "rgba(255,255,255,0.45)",
                      transition: "all 0.2s", textAlign: "left",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.color = "#38bdf8";
                      el.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.color = "rgba(255,255,255,0.45)";
                      el.style.transform = "translateX(0)";
                    }}
                  >
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "rgba(56,189,248,0.5)", flexShrink: 0,
                    }} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Support ── */}
          <div>
            <h3 style={{
              fontSize: "11px", fontWeight: 700,
              color: "#4ade80", textTransform: "uppercase",
              letterSpacing: "0.12em", margin: "0 0 20px",
            }}>
              Support
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = "#38bdf8";
                      el.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = "rgba(255,255,255,0.45)";
                      el.style.transform = "translateX(0)";
                    }}
                  >
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "rgba(56,189,248,0.5)", flexShrink: 0,
                    }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <h3 style={{
              fontSize: "11px", fontWeight: 700,
              color: "#4ade80", textTransform: "uppercase",
              letterSpacing: "0.12em", margin: "0 0 20px",
            }}>
              Contact
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {contacts.map(({ icon: Icon, value }) => (
                <div key={value} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "8px", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(56,189,248,0.07)",
                    border: "1px solid rgba(56,189,248,0.18)",
                    marginTop: "1px",
                  }}>
                    <Icon size={13} style={{ color: "#38bdf8" }} />
                  </div>
                  <span style={{
                    fontSize: "13px", lineHeight: 1.6,
                    color: "rgba(255,255,255,0.45)",
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: "24px" }}>
              <Link href="/sign-up" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "10px 20px", borderRadius: "10px",
                    background: "#38bdf8", color: "#0a0f1e",
                    fontSize: "13px", fontWeight: 700,
                    border: "none", cursor: "pointer",
                    boxShadow: "0 0 18px rgba(56,189,248,0.35)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "0 0 28px rgba(56,189,248,0.65)";
                    el.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "0 0 18px rgba(56,189,248,0.35)";
                    el.style.transform = "scale(1)";
                  }}
                >
                  Get Started →
                </button>
              </Link>
            </div>
          </div>

        </motion.div>

        {/* ── Divider ── */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.15), rgba(56,189,248,0.15), transparent)",
          marginBottom: "28px",
        }} />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "12px",
          }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", margin: 0 }}>
            © {currentYear}{" "}
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>PDAM Baru</span>
            . All rights reserved.
          </p>

          {/* Status indicator */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "999px",
            background: "rgba(74,222,128,0.06)",
            border: "1px solid rgba(74,222,128,0.18)",
          }}>
            <div style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 8px #4ade80",
              animation: "pulse 2s infinite",
            }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4ade80" }}>
              All systems operational
            </span>
          </div>

          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", margin: 0 }}>
            Designed with{" "}
            <span style={{ color: "#ef4444" }}>♥</span>
            {" "}for better water systems.
          </p>
        </motion.div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </footer>
  );
}