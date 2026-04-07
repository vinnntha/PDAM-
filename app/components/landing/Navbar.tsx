"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Droplet } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY < 300) setActiveTab("home");
      else if (window.scrollY < 1200) setActiveTab("services");
      else if (window.scrollY < 2000) setActiveTab("testimonials");
      else setActiveTab("about");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const scrollToSection = (targetId: string) => {
    setDrawerOpen(false);
    setActiveTab(targetId);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }, 50);
  };

  const navLinks = [
    { id: "home",         label: "Home" },
    { id: "services",     label: "Services" },
    { id: "testimonials", label: "Testimonials" },
    { id: "about",        label: "About" },
  ];

  return (
    <>
      {/* ── Top Navbar ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
          transition: "all 0.3s ease",
          backgroundColor: isScrolled ? "rgba(10,15,30,0.88)" : "transparent",
          backdropFilter: isScrolled ? "blur(24px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(74,222,128,0.15)"
            : "1px solid transparent",
          boxShadow: isScrolled
            ? "0 2px 32px rgba(56,189,248,0.07)"
            : "none",
        }}
      >
        <div
          style={{
            height: "68px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            padding: "0 48px",
            maxWidth: "1280px", margin: "0 auto", width: "100%",
          }}
        >

          {/* ── Left: Hamburger + Logo ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              style={{
                width: "36px", height: "36px", borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer", color: "rgba(255,255,255,0.65)",
                transition: "all 0.2s", flexShrink: 0,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "#38bdf8";
                el.style.borderColor = "rgba(56,189,248,0.3)";
                el.style.background = "rgba(56,189,248,0.07)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "rgba(255,255,255,0.65)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <Menu size={17} />
            </button>

            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "none", border: "none",
                cursor: "pointer", padding: 0,
              }}
            >
              <div style={{
                width: "34px", height: "34px", borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.25)",
                boxShadow: "0 0 14px rgba(56,189,248,0.18)",
              }}>
                <Droplet
                  size={17}
                  style={{
                    color: "#38bdf8",
                    filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))",
                  }}
                />
              </div>
              <span style={{
                fontSize: "17px", fontWeight: 900,
                color: "#38bdf8", letterSpacing: "-0.02em",
                textShadow: "0 0 18px rgba(56,189,248,0.35)",
              }}>
                PDAM Baru
              </span>
            </button>
          </div>

          {/* ── Center: Nav Pills ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: "2px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px", padding: "4px",
          }}>
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    padding: "7px 16px", borderRadius: "10px",
                    border: isActive
                      ? "1px solid rgba(56,189,248,0.25)"
                      : "1px solid transparent",
                    cursor: "pointer",
                    fontSize: "13px", fontWeight: 600,
                    transition: "all 0.2s ease",
                    backgroundColor: isActive
                      ? "rgba(56,189,248,0.1)"
                      : "transparent",
                    color: isActive
                      ? "#38bdf8"
                      : "rgba(255,255,255,0.5)",
                    boxShadow: isActive
                      ? "0 0 10px rgba(56,189,248,0.12)"
                      : "none",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.color = "rgba(255,255,255,0.85)";
                      el.style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.color = "rgba(255,255,255,0.5)";
                      el.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* ── Right: Auth Buttons ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

            {/* Login */}
            <Link
              href="/sign-in"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  padding: "8px 18px", borderRadius: "10px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "#38bdf8";
                  el.style.borderColor = "rgba(56,189,248,0.35)";
                  el.style.background = "rgba(56,189,248,0.06)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "rgba(255,255,255,0.65)";
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                  el.style.background = "transparent";
                }}
              >
                Login
              </button>
            </Link>

            {/* Register */}
            <Link href="/sign-up" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "8px 20px", borderRadius: "10px",
                  background: "#38bdf8", color: "#0a0f1e",
                  fontSize: "13px", fontWeight: 700,
                  border: "none", cursor: "pointer",
                  boxShadow: "0 0 18px rgba(56,189,248,0.4)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.boxShadow = "0 0 28px rgba(56,189,248,0.7)";
                  el.style.transform = "scale(1.04)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.boxShadow = "0 0 18px rgba(56,189,248,0.4)";
                  el.style.transform = "scale(1)";
                }}
              >
                Register
              </button>
            </Link>
          </div>

        </div>
      </nav>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setDrawerOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 1001,
          backgroundColor: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Left Drawer ── */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed", top: 0, left: 0,
          height: "100vh", width: "300px",
          zIndex: 1002,
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
          display: "flex", flexDirection: "column",
          backgroundColor: "#0a0f1e",
          borderRight: "1px solid rgba(56,189,248,0.15)",
          boxShadow: "6px 0 48px rgba(56,189,248,0.1)",
        }}
      >
        {/* Top accent gradient */}
        <div style={{
          height: "2px", flexShrink: 0,
          background: "linear-gradient(90deg, #38bdf8, #4ade80, transparent)",
        }} />

        {/* Drawer Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px", flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.25)",
            }}>
              <Droplet
                size={17}
                style={{
                  color: "#38bdf8",
                  filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))",
                }}
              />
            </div>
            <span style={{
              fontSize: "16px", fontWeight: 900,
              color: "#38bdf8", letterSpacing: "-0.02em",
            }}>
              PDAM Baru
            </span>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            style={{
              width: "32px", height: "32px", borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer", color: "rgba(255,255,255,0.45)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.color = "#38bdf8";
              el.style.borderColor = "rgba(56,189,248,0.3)";
              el.style.background = "rgba(56,189,248,0.07)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.color = "rgba(255,255,255,0.45)";
              el.style.borderColor = "rgba(255,255,255,0.08)";
              el.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Navigation label */}
        <div style={{ padding: "20px 24px 8px", flexShrink: 0 }}>
          <p style={{
            fontSize: "10px", fontWeight: 700,
            color: "rgba(255,255,255,0.22)",
            textTransform: "uppercase", letterSpacing: "0.14em",
            margin: 0,
          }}>
            Navigation
          </p>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "4px 16px", overflowY: "auto" }}>
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  width: "100%", padding: "11px 14px", marginBottom: "3px",
                  borderRadius: "11px",
                  border: isActive
                    ? "1px solid rgba(56,189,248,0.2)"
                    : "1px solid transparent",
                  borderLeft: isActive
                    ? "2px solid #38bdf8"
                    : "2px solid transparent",
                  cursor: "pointer", textAlign: "left",
                  fontSize: "14px", fontWeight: 600,
                  transition: "all 0.2s",
                  backgroundColor: isActive
                    ? "rgba(56,189,248,0.08)"
                    : "transparent",
                  color: isActive ? "#38bdf8" : "rgba(255,255,255,0.55)",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.backgroundColor = "rgba(255,255,255,0.04)";
                    el.style.color = "rgba(255,255,255,0.85)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.backgroundColor = "transparent";
                    el.style.color = "rgba(255,255,255,0.55)";
                  }
                }}
              >
                {/* Dot indicator */}
                <div style={{
                  width: "6px", height: "6px",
                  borderRadius: "50%", flexShrink: 0,
                  backgroundColor: isActive ? "#38bdf8" : "rgba(255,255,255,0.15)",
                  boxShadow: isActive ? "0 0 8px #38bdf8" : "none",
                  transition: "all 0.2s",
                }} />

                <span style={{ flex: 1 }}>{link.label}</span>

                {/* Active arrow */}
                {isActive && (
                  <span style={{
                    fontSize: "13px", color: "#38bdf8", opacity: 0.55,
                  }}>
                    →
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div style={{
          margin: "0 24px", height: "1px", flexShrink: 0,
          background: "rgba(255,255,255,0.06)",
        }} />

        {/* Account label */}
        <div style={{ padding: "16px 24px 8px", flexShrink: 0 }}>
          <p style={{
            fontSize: "10px", fontWeight: 700,
            color: "rgba(255,255,255,0.22)",
            textTransform: "uppercase", letterSpacing: "0.14em",
            margin: 0,
          }}>
            Account
          </p>
        </div>

        {/* Drawer Footer */}
        <div style={{
          padding: "8px 24px 28px", flexShrink: 0,
          display: "flex", flexDirection: "column", gap: "10px",
        }}>
          {/* Login */}
          <Link
            href="/sign-in"
            onClick={() => setDrawerOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                width: "100%", padding: "11px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.72)",
                fontSize: "14px", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "#38bdf8";
                el.style.borderColor = "rgba(56,189,248,0.3)";
                el.style.background = "rgba(56,189,248,0.06)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "rgba(255,255,255,0.72)";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              Login
            </button>
          </Link>

          {/* Register */}
          <Link
            href="/sign-up"
            onClick={() => setDrawerOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                width: "100%", padding: "12px",
                borderRadius: "12px", border: "none",
                background: "#38bdf8", color: "#0a0f1e",
                fontSize: "14px", fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(56,189,248,0.38)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow = "0 0 30px rgba(56,189,248,0.65)";
                el.style.transform = "scale(1.02)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow = "0 0 20px rgba(56,189,248,0.38)";
                el.style.transform = "scale(1)";
              }}
            >
              Register
            </button>
          </Link>
        </div>

      </div>
    </>
  );
}