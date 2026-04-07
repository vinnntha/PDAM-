"use client"

import { getCookies } from "@/helper/cookies"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  ArrowLeft, Package, MinusCircle,
  PlusCircle, DollarSign, Loader2, Save,
} from "lucide-react"
import type { Service } from "./page"

type Props = { service: Service }

export default function FormService({ service }: Props) {
  const [serviceName, setServiceName] = useState(service.name)
  const [minUsage, setMinUsage]       = useState(service.min_usage)
  const [maxUsage, setMaxUsage]       = useState(service.max_usage)
  const [price, setPrice]             = useState(service.price)
  const [isLoading, setIsLoading]     = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError]     = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => router.push("/admin/services"), 2000)
      return () => clearTimeout(t)
    }
  }, [showSuccess, router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/services/${service.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
            "authorization": `Bearer ${await getCookies("token")}`,
          },
          body: JSON.stringify({ name: serviceName, min_usage: minUsage, max_usage: maxUsage, price }),
        }
      )
      if (!response.ok) {
        const err = await response.json()
        setErrorMessage(err.message || "Failed to update service")
        setShowError(true); setIsLoading(false); return
      }
      setShowSuccess(true); setIsLoading(false)
    } catch {
      setErrorMessage("Something went wrong. Please check your connection.")
      setShowError(true); setIsLoading(false)
    }
  }

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: "12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(74,222,128,0.2)",
    color: "#ffffff", fontSize: "14px",
    outline: "none", transition: "all 0.2s",
    boxSizing: "border-box" as const,
  }
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(56,189,248,0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)";
    e.currentTarget.style.background = "rgba(56,189,248,0.04)";
  }
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
  }

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0a0f1e",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "32px 24px", position: "relative", overflow: "hidden",
    }}>
      {/* Orbs */}
      <div style={{
        position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
        top: "-120px", right: "-120px",
        background: "rgba(56,189,248,0.09)", filter: "blur(110px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "450px", height: "450px", borderRadius: "50%",
        bottom: "-100px", left: "-100px",
        background: "rgba(74,222,128,0.07)", filter: "blur(100px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{ width: "100%", maxWidth: "560px", position: "relative", zIndex: 10 }}>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.45)", marginBottom: "24px",
            fontSize: "13px", fontWeight: 600, transition: "all 0.2s", padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#38bdf8"}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)"}
        >
          <div style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ArrowLeft size={14} />
          </div>
          Back to Services
        </button>

        {/* Main card */}
        <div style={{
          borderRadius: "24px", overflow: "hidden",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(74,222,128,0.2)",
          boxShadow: "0 0 60px rgba(56,189,248,0.07)",
        }}>
          <div style={{
            height: "2px",
            background: "linear-gradient(90deg, #38bdf8, #4ade80, transparent)",
          }} />
          <div style={{ padding: "40px 36px" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px",
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.25)",
                boxShadow: "0 0 20px rgba(56,189,248,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Package size={22} style={{ color: "#38bdf8" }} />
              </div>
              <h1 style={{
                fontSize: "26px", fontWeight: 900, color: "#38bdf8",
                margin: "0 0 6px", textShadow: "0 0 20px rgba(56,189,248,0.3)",
                letterSpacing: "-0.02em",
              }}>
                Edit Service
              </h1>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                Update service configuration details
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    fontSize: "11px", fontWeight: 700, color: "#4ade80",
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}>
                    <Package size={13} /> Service Name
                  </label>
                  <input
                    type="text" required value={serviceName}
                    onChange={e => setServiceName(e.target.value)}
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{
                      fontSize: "11px", fontWeight: 700, color: "#4ade80",
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      <MinusCircle size={13} /> Min Usage (m³)
                    </label>
                    <input
                      type="number" required value={minUsage}
                      onChange={e => setMinUsage(Number(e.target.value))}
                      style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{
                      fontSize: "11px", fontWeight: 700, color: "#4ade80",
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      <PlusCircle size={13} /> Max Usage (m³)
                    </label>
                    <input
                      type="number" required value={maxUsage}
                      onChange={e => setMaxUsage(Number(e.target.value))}
                      style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    fontSize: "11px", fontWeight: 700, color: "#4ade80",
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}>
                    <DollarSign size={13} /> Price (Rp)
                  </label>
                  <input
                    type="number" required value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                  />
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button
                    type="submit" disabled={isLoading}
                    style={{
                      flex: 1, padding: "13px", borderRadius: "12px",
                      background: isLoading ? "rgba(56,189,248,0.5)" : "#38bdf8",
                      color: "#0a0f1e", fontSize: "14px", fontWeight: 700,
                      border: "none", cursor: isLoading ? "not-allowed" : "pointer",
                      boxShadow: "0 0 20px rgba(56,189,248,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      if (!isLoading) {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(56,189,248,0.6)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                      }
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(56,189,248,0.35)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }}
                  >
                    {isLoading
                      ? <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                      : <Save size={16} />}
                    {isLoading ? "Updating..." : "Update Service"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/admin/services")}
                    style={{
                      flex: 1, padding: "13px", borderRadius: "12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            borderRadius: "24px", padding: "40px 36px", background: "#0a0f1e",
            border: "1px solid rgba(74,222,128,0.3)",
            boxShadow: "0 0 60px rgba(74,222,128,0.15)",
            textAlign: "center", maxWidth: "360px", width: "90%",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, #4ade80, #38bdf8, transparent)",
            }} />
            <div style={{
              width: "60px", height: "60px", borderRadius: "50%",
              background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.35)",
              boxShadow: "0 0 28px rgba(74,222,128,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{
              fontSize: "22px", fontWeight: 900, color: "#4ade80",
              margin: "0 0 8px", textShadow: "0 0 16px rgba(74,222,128,0.4)",
            }}>
              Service Updated!
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>
              Changes saved successfully. Returning to list...
            </p>
            <div style={{
              height: "3px", borderRadius: "999px",
              background: "rgba(255,255,255,0.08)", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", background: "#4ade80",
                animation: "progress 2s linear forwards",
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            borderRadius: "24px", padding: "40px 36px", background: "#0a0f1e",
            border: "1px solid rgba(239,68,68,0.3)",
            boxShadow: "0 0 60px rgba(239,68,68,0.1)",
            textAlign: "center", maxWidth: "360px", width: "90%",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, #ef4444, transparent)",
            }} />
            <div style={{
              width: "60px", height: "60px", borderRadius: "50%",
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#ef4444", margin: "0 0 8px" }}>
              Update Failed
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>
              {errorMessage}
            </p>
            <button
              onClick={() => setShowError(false)}
              style={{
                width: "100%", padding: "12px", borderRadius: "12px",
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444", fontSize: "14px", fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"}
            >
              Close and Retry
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progress { from { width: 0; } to { width: 100%; } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
      `}</style>
    </div>
  )
}
