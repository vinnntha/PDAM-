"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const timeline = [
  { year: "1985", title: "Founded in Malang",       desc: "Began serving 200 households in the core district." },
  { year: "2005", title: "Regional Expansion",      desc: "Extended pipeline network across 5 sub-districts." },
  { year: "2020", title: "Digital Platform Launch", desc: "Launched online billing and customer portal." },
];

const contacts = [
  { icon: Phone,  label: "Phone",   value: "(0341) 123-4567" },
  { icon: Mail,   label: "Email",   value: "info@pdambaru.id" },
  { icon: MapPin, label: "Address", value: "Jl. Sumber Air No. 1, Malang" },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon,  label: "Facebook" },
  { icon: XIcon,         label: "X / Twitter" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ position: "relative", zIndex: 10, padding: "96px 48px" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── Section Header ── */}
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
            color: "#4ade80", margin: 0, marginBottom: "10px",
          }}>
            Get to know us
          </p>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 900, lineHeight: 1.1,
            color: "#38bdf8", margin: 0, marginBottom: "12px",
            textShadow: "0 0 24px rgba(56,189,248,0.28)",
          }}>
            About Us
          </h2>
          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            margin: 0,
          }}>
            Decades of dedication to clean water for all.
          </p>
        </motion.div>

        {/* ── Two Column Layout ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "start",
        }}>

          {/* ── LEFT: History + Timeline ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <h3 style={{
              fontSize: "18px", fontWeight: 700,
              color: "#4ade80", margin: 0, marginBottom: "14px",
            }}>
              Our History
            </h3>

            <p style={{
              fontSize: "14px", lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: 0, marginBottom: "36px",
            }}>
              PDAM Baru was founded with a single mission: ensure every
              household has access to safe, clean water. Over the decades
              we've grown from a small local utility into a trusted public
              service institution serving thousands across the region.
            </p>

            {/* Timeline */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {timeline.map(({ year, title, desc }, i) => (
                <div
                  key={year}
                  style={{
                    display: "flex",
                    gap: "18px",
                    paddingBottom: i < timeline.length - 1 ? "28px" : "0",
                    position: "relative",
                  }}
                >
                  {/* Vertical connector line */}
                  {i < timeline.length - 1 && (
                    <div style={{
                      position: "absolute",
                      left: "19px",
                      top: "40px",
                      bottom: 0,
                      width: "1px",
                      background: "linear-gradient(180deg, rgba(74,222,128,0.3), rgba(74,222,128,0.05))",
                    }} />
                  )}

                  {/* Year dot */}
                  <div style={{
                    width: "40px", height: "40px",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    background: "rgba(74,222,128,0.07)",
                    border: "1px solid rgba(74,222,128,0.35)",
                    boxShadow: "0 0 12px rgba(74,222,128,0.1)",
                    fontSize: "10px", fontWeight: 900,
                    color: "#4ade80",
                    letterSpacing: "0.04em",
                  }}>
                    {year.slice(2)}
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: "8px" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      marginBottom: "4px",
                    }}>
                      <p style={{
                        fontSize: "14px", fontWeight: 700,
                        color: "rgba(255,255,255,0.9)",
                        margin: 0,
                      }}>
                        {title}
                      </p>
                      <span style={{
                        fontSize: "10px", fontWeight: 700,
                        color: "#4ade80",
                        background: "rgba(74,222,128,0.08)",
                        border: "1px solid rgba(74,222,128,0.2)",
                        padding: "2px 8px", borderRadius: "999px",
                        letterSpacing: "0.06em",
                      }}>
                        {year}
                      </span>
                    </div>
                    <p style={{
                      fontSize: "13px", lineHeight: 1.65,
                      color: "rgba(255,255,255,0.4)",
                      margin: 0,
                    }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Contact + Socials ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >

            {/* Contact card */}
            <div style={{
              borderRadius: "20px",
              border: "1px solid rgba(74,222,128,0.2)",
              background: "rgba(255,255,255,0.025)",
              overflow: "hidden",
              position: "relative",
            }}>
              {/* Top accent */}
              <div style={{
                height: "2px",
                background: "linear-gradient(90deg, #4ade80, rgba(56,189,248,0.5), transparent)",
              }} />

              <div style={{ padding: "8px 0" }}>
                {contacts.map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={label}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "14px 24px",
                      borderBottom: i < contacts.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e =>
                      ((e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)")
                    }
                    onMouseLeave={e =>
                      ((e.currentTarget as HTMLDivElement).style.background = "transparent")
                    }
                  >
                    {/* Icon */}
                    <div style={{
                      width: "36px", height: "36px",
                      borderRadius: "10px", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(56,189,248,0.08)",
                      border: "1px solid rgba(56,189,248,0.2)",
                    }}>
                      <Icon size={15} style={{ color: "#38bdf8" }} />
                    </div>

                    {/* Text */}
                    <div>
                      <p style={{
                        fontSize: "10px", fontWeight: 600,
                        color: "rgba(255,255,255,0.32)",
                        margin: 0, marginBottom: "3px",
                        textTransform: "uppercase", letterSpacing: "0.08em",
                      }}>
                        {label}
                      </p>
                      <p style={{
                        fontSize: "14px", fontWeight: 500,
                        color: "rgba(255,255,255,0.85)",
                        margin: 0,
                      }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials card */}
            <div style={{
              borderRadius: "20px",
              border: "1px solid rgba(74,222,128,0.18)",
              background: "rgba(255,255,255,0.02)",
              padding: "24px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Top accent */}
              <div style={{
                position: "absolute", top: 0, left: "24px", right: "24px",
                height: "1px",
                background: "linear-gradient(90deg, rgba(74,222,128,0.4), transparent)",
              }} />

              <h3 style={{
                fontSize: "13px", fontWeight: 700,
                color: "#4ade80", margin: 0, marginBottom: "16px",
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                Follow Us
              </h3>

              <div style={{ display: "flex", gap: "12px" }}>
                {socials.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "10px 16px", borderRadius: "12px",
                      border: "1px solid rgba(74,222,128,0.3)",
                      color: "#4ade80", background: "rgba(74,222,128,0.04)",
                      fontSize: "12px", fontWeight: 600,
                      cursor: "pointer", transition: "all 0.25s",
                      flex: 1, justifyContent: "center",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = "rgba(74,222,128,0.1)";
                      el.style.borderColor = "rgba(74,222,128,0.55)";
                      el.style.boxShadow = "0 0 14px rgba(74,222,128,0.2)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = "rgba(74,222,128,0.04)";
                      el.style.borderColor = "rgba(74,222,128,0.3)";
                      el.style.boxShadow = "none";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Office hours card */}
            <div style={{
              borderRadius: "20px",
              border: "1px solid rgba(56,189,248,0.18)",
              background: "rgba(56,189,248,0.025)",
              padding: "20px 24px",
              display: "flex", alignItems: "center", gap: "16px",
            }}>
              {/* Pulse indicator */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 10px #4ade80",
                  animation: "pulse 2s infinite",
                }} />
              </div>
              <div>
                <p style={{
                  fontSize: "13px", fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  margin: 0, marginBottom: "2px",
                }}>
                  Customer Service Open
                </p>
                <p style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                  margin: 0,
                }}>
                  Mon – Sat · 08:00 – 17:00 WIB
                </p>
              </div>
              <div style={{
                marginLeft: "auto",
                fontSize: "11px", fontWeight: 700,
                color: "#4ade80",
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.25)",
                padding: "4px 12px", borderRadius: "999px",
              }}>
                Online
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}