"use client";

import { storeCookies } from "@/helper/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Droplet, Eye, EyeOff, User, Lock, ArrowLeft } from "lucide-react";

export interface LoginResponse {
  success?: boolean;
  message: string;
  token?: string;
  role?: string;
  error?: string;
  statusCode?: number;
}

export default function SignInPage() {
  const [username, setUsername] = useState("admin-banana");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSignIn(event: FormEvent) {
    try {
      event.preventDefault();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
          "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        },
      });
      const responseData: LoginResponse = await response.json();
      if (!response.ok) {
        toast.error(responseData.message, { containerId: "toastLogin" });
        return;
      }
      if (responseData?.success === true) {
        setShowSuccess(true);
        startTransition(async () => {
          storeCookies("token", responseData?.token || "");
          setTimeout(() => {
            if (responseData?.role === "ADMIN") router.replace("/admin/profile");
            if (responseData?.role === "CUSTOMER") router.replace("/customer/profile");
          }, 2000);
        });
      } else {
        toast.warning(responseData.message, { containerId: "toastLogin" });
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      backgroundColor: "#0a0f1e",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", position: "relative", overflow: "hidden",
    }}>
      <ToastContainer containerId="toastLogin" />

      {/* ── Background Orbs ── */}
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%", top: "-150px", left: "-150px",
        background: "rgba(56,189,248,0.1)", filter: "blur(100px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "400px", height: "400px",
        borderRadius: "50%", bottom: "-100px", right: "-100px",
        background: "rgba(74,222,128,0.08)", filter: "blur(90px)",
        pointerEvents: "none",
      }} />

      {/* ── Grid overlay ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px),
          linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* ── Card ── */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "440px",
        borderRadius: "24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(74,222,128,0.2)",
        boxShadow: "0 0 60px rgba(56,189,248,0.08), inset 0 0 40px rgba(56,189,248,0.02)",
        overflow: "hidden",
      }}>

        {/* Top accent line */}
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, #38bdf8, #4ade80, transparent)",
        }} />

        <div style={{ padding: "40px 36px 36px", position: "relative" }}>

          {/* ── Back Button ── */}
          <Link href="/" style={{
            position: "absolute", top: "24px", left: "24px",
            display: "flex", alignItems: "center", gap: "6px",
            color: "rgba(255,255,255,0.4)", textDecoration: "none",
            fontSize: "13px", fontWeight: 600, transition: "all 0.2s",
            zIndex: 20,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#38bdf8")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <ArrowLeft size={16} /> Back
          </Link>

          {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            {/* Logo icon */}
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.25)",
              boxShadow: "0 0 24px rgba(56,189,248,0.2)",
              margin: "0 auto 20px",
            }}>
              <Droplet
                size={26}
                style={{
                  color: "#38bdf8",
                  filter: "drop-shadow(0 0 10px rgba(56,189,248,0.8))",
                }}
              />
            </div>

            <h1 style={{
              fontSize: "28px", fontWeight: 900,
              color: "#38bdf8", margin: 0, marginBottom: "6px",
              textShadow: "0 0 24px rgba(56,189,248,0.35)",
              letterSpacing: "-0.02em",
            }}>
              Welcome Back
            </h1>
            <p style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}>
              Sign in to your PDAM Baru account
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSignIn}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Username field */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{
                  fontSize: "12px", fontWeight: 700,
                  color: "#4ade80",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  Username
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", left: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(56,189,248,0.6)",
                    display: "flex", alignItems: "center",
                  }}>
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    style={{
                      width: "100%", padding: "13px 14px 13px 42px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(74,222,128,0.2)",
                      color: "#ffffff", fontSize: "14px",
                      outline: "none", transition: "all 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = "rgba(56,189,248,0.5)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)";
                      e.currentTarget.style.background = "rgba(56,189,248,0.04)";
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                  />
                </div>
              </div>

              {/* Password field */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{
                  fontSize: "12px", fontWeight: 700,
                  color: "#4ade80",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", left: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(56,189,248,0.6)",
                    display: "flex", alignItems: "center",
                  }}>
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={{
                      width: "100%", padding: "13px 44px 13px 42px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(74,222,128,0.2)",
                      color: "#ffffff", fontSize: "14px",
                      outline: "none", transition: "all 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = "rgba(56,189,248,0.5)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)";
                      e.currentTarget.style.background = "rgba(56,189,248,0.04)";
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                  />
                  {/* Show/hide toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute", right: "14px", top: "50%",
                      transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: "rgba(255,255,255,0.35)",
                      display: "flex", alignItems: "center",
                      transition: "color 0.2s", padding: 0,
                    }}
                    onMouseEnter={e =>
                      ((e.currentTarget as HTMLButtonElement).style.color = "#38bdf8")
                    }
                    onMouseLeave={e =>
                      ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)")
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isPending}
                style={{
                  width: "100%", padding: "14px",
                  borderRadius: "12px", border: "none",
                  background: isPending ? "rgba(56,189,248,0.5)" : "#38bdf8",
                  color: "#0a0f1e", fontSize: "15px", fontWeight: 700,
                  cursor: isPending ? "not-allowed" : "pointer",
                  boxShadow: "0 0 24px rgba(56,189,248,0.4)",
                  transition: "all 0.2s", marginTop: "4px",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => {
                  if (!isPending) {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "0 0 36px rgba(56,189,248,0.7)";
                    el.style.transform = "scale(1.02)";
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.boxShadow = "0 0 24px rgba(56,189,248,0.4)";
                  el.style.transform = "scale(1)";
                }}
              >
                {isPending ? "Signing in..." : "Sign In"}
              </button>

            </div>
          </form>

          {/* ── Footer link ── */}
          <div style={{
            marginTop: "24px", textAlign: "center",
          }}>
            <div style={{
              height: "1px", marginBottom: "20px",
              background: "rgba(255,255,255,0.06)",
            }} />
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                style={{
                  color: "#4ade80", fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 10px rgba(74,222,128,0.6)")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLAnchorElement).style.textShadow = "none")
                }
              >
                Register here
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* ── Success Modal ── */}
      {showSuccess && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            borderRadius: "24px", padding: "40px 36px",
            background: "rgba(10,15,30,0.98)",
            border: "1px solid rgba(74,222,128,0.3)",
            boxShadow: "0 0 60px rgba(74,222,128,0.15)",
            textAlign: "center", maxWidth: "360px", width: "90%",
            position: "relative", overflow: "hidden",
          }}>
            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, #4ade80, #38bdf8, transparent)",
            }} />

            {/* Check icon */}
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.4)",
              boxShadow: "0 0 32px rgba(74,222,128,0.25)",
              margin: "0 auto 20px",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 style={{
              fontSize: "22px", fontWeight: 900,
              color: "#4ade80", margin: 0, marginBottom: "8px",
              textShadow: "0 0 20px rgba(74,222,128,0.4)",
            }}>
              Login Successful!
            </h2>
            <p style={{
              fontSize: "14px", color: "rgba(255,255,255,0.45)",
              margin: 0, marginBottom: "24px",
            }}>
              Welcome back! Redirecting you now...
            </p>

            {/* Spinner */}
            <div style={{
              width: "24px", height: "24px",
              border: "2px solid rgba(56,189,248,0.2)",
              borderTopColor: "#38bdf8",
              borderRadius: "50%",
              margin: "0 auto",
              animation: "spin 0.8s linear infinite",
            }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
}