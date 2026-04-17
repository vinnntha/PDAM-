"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Droplet, User, Lock, Phone, Eye, EyeOff, UserCheck, ArrowLeft, Fingerprint, MapPin } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

export default function SignUpPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [customerNumber, setCustomerNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [serviceId, ] = useState<string>("");
  const [services, setServices] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    async function fetchServices() {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services`;
        const response = await fetch(url, {
          headers: {
            "app-key": process.env.NEXT_PUBLIC_APP_KEY || ""
          }
        });
        if (response.ok) {
          const result = await response.json();
          setServices(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    }
    fetchServices();
  }, []);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const request = JSON.stringify({
          username,
          password,
          customer_number: customerNumber,
          address,
          name,
          phone,
          service_id: parseInt(serviceId) || 1143,
        });
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customers`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "app-key": `${process.env.NEXT_PUBLIC_APP_KEY}`,
          },
          body: request,
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to register customer", { containerId: "toastSignUp" });
          return;
        }

        setShowSuccess(true);
      } catch (error) {
        console.error("Error during sign up :", error);
        toast.error("Something went wrong. Please try again.", { containerId: "toastSignUp" });
      }
    });
  }

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      backgroundColor: "#0a0f1e",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", position: "relative", overflow: "hidden",
    }}>
      <ToastContainer containerId="toastSignUp" />

      {/* ── Background Orbs ── */}
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%", top: "-150px", right: "-150px",
        background: "rgba(56,189,248,0.1)", filter: "blur(100px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "400px", height: "400px",
        borderRadius: "50%", bottom: "-100px", left: "-100px",
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
        width: "100%", maxWidth: "480px",
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
          onMouseEnter={e => (e.currentTarget.style.color = "#4ade80")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <ArrowLeft size={16} /> Back
          </Link>

          {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.25)",
              boxShadow: "0 0 24px rgba(56,189,248,0.2)",
              margin: "0 auto 20px",
            }}>
              <UserCheck
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
              Join PDAM Baru
            </h1>
            <p style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}>
              Create your customer account
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSignUp}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

              {/* Username field */}
              <Input
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                icon={<User size={16} />}
              />

              {/* Password field */}
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Create password"
                icon={<Lock size={16} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
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
                }
              />

              {/* Name field */}
              <Input
                label="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter full name"
                icon={<User size={16} />}
              />

              {/* Customer Number field */}
              <Input
                label="National ID (NIK)"
                value={customerNumber}
                onChange={e => setCustomerNumber(e.target.value)}
                placeholder="16-digit identity number"
                icon={<Fingerprint size={16} />}
              />

              {/* Phone field */}
              <Input
                label="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                icon={<Phone size={16} />}
              />

              {/* Address field */}
              <Input
                label="Detailed Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Full residential or property address"
                icon={<MapPin size={16} />}
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={isPending}
                style={{
                  width: "100%", padding: "14px",
                  borderRadius: "12px", border: "none",
                  background: isPending ? "rgba(74,222,128,0.5)" : "#4ade80",
                  color: "#0a0f1e", fontSize: "15px", fontWeight: 700,
                  cursor: isPending ? "not-allowed" : "pointer",
                  boxShadow: "0 0 24px rgba(74,222,128,0.3)",
                  transition: "all 0.2s", marginTop: "10px",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => {
                  if (!isPending) {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "0 0 36px rgba(74,222,128,0.6)";
                    el.style.transform = "scale(1.02)";
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.boxShadow = "0 0 24px rgba(74,222,128,0.3)";
                  el.style.transform = "scale(1)";
                }}
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </button>

            </div>
          </form>

          {/* ── Footer Link ── */}
          <div style={{
            marginTop: "24px", textAlign: "center",
          }}>
            <div style={{
              height: "1px", marginBottom: "20px",
              background: "rgba(255,255,255,0.06)",
            }} />
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
              Already have an account?{" "}
              <Link
                href="/sign-in"
                style={{
                  color: "#38bdf8", fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 10px rgba(56,189,248,0.6)")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLAnchorElement).style.textShadow = "none")
                }
              >
                Sign In Instead
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
              Account Created! 🎉
            </h2>
            <p style={{
              fontSize: "14px", color: "rgba(255,255,255,0.45)",
              margin: 0, marginBottom: "24px",
            }}>
              Registration complete. You can now access your account.
            </p>

            <button
              onClick={() => router.push("/sign-in")}
              style={{
                width: "100%", padding: "12px",
                borderRadius: "12px", border: "none",
                background: "#38bdf8",
                color: "#0a0f1e", fontSize: "14px", fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(56,189,248,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 0 28px rgba(56,189,248,0.5)";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(56,189,248,0.3)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Take me to Sign In
            </button>
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

/* Reusable input component */
function Input({
  label,
  icon,
  rightIcon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{
        fontSize: "12px", fontWeight: 700,
        color: "#4ade80",
        textTransform: "uppercase", letterSpacing: "0.1em",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{
            position: "absolute", left: "14px", top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(56,189,248,0.6)",
            display: "flex", alignItems: "center",
          }}>
            {icon}
          </div>
        )}
        <input
          {...props}
          style={{
            width: "100%", padding: icon ? "13px 14px 13px 42px" : "13px 14px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(74,222,128,0.2)",
            color: "#ffffff", fontSize: "14px",
            outline: "none", transition: "all 0.2s",
            boxSizing: "border-box",
            paddingRight: rightIcon ? "44px" : "14px",
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
          required
        />
        {rightIcon && (
          <div style={{
            position: "absolute", right: "14px", top: "50%",
            transform: "translateY(-50%)",
            display: "flex", alignItems: "center",
          }}>
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}