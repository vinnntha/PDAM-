"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookies } from "@/helper/cookies"
import {
  Receipt, User, Calendar, Droplets, Hash, ArrowLeft, Save, Loader2,
} from "lucide-react"
import Link from "next/link"

interface Customer { id: number; name: string; customer_number: string; service_id: number; service?: { id: number; name: string; price: number } }
interface Service  { id: number; name: string; price: number }

const MONTHS = [
  { value: 1, label: "January" }, { value: 2, label: "February" },
  { value: 3, label: "March" },   { value: 4, label: "April" },
  { value: 5, label: "May" },     { value: 6, label: "June" },
  { value: 7, label: "July" },    { value: 8, label: "August" },
  { value: 9, label: "September" },{ value: 10, label: "October" },
  { value: 11, label: "November" },{ value: 12, label: "December" },
]
const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px", borderRadius: "12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(74,222,128,0.2)",
  color: "#ffffff", fontSize: "14px",
  outline: "none", transition: "all 0.2s", boxSizing: "border-box",
}
const selectStyle: React.CSSProperties = {
  ...inputStyle, 
  appearance: "none" as const,
  cursor: "pointer",
}
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(56,189,248,0.5)"
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)"
  e.currentTarget.style.background = "rgba(56,189,248,0.04)"
}
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)"
  e.currentTarget.style.boxShadow = "none"
  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
}

export default function AddBillForm({ customers, services }: { customers: Customer[]; services: Service[] }) {
  const [customerId, setCustomerId]               = useState("")
  const [measurementNumber, setMeasurementNumber] = useState("")
  const [usageValue, setUsageValue]               = useState("")
  const [month, setMonth]                         = useState(String(new Date().getMonth() + 1))
  const [year, setYear]                           = useState(String(currentYear))
  const [isLoading, setIsLoading]                 = useState(false)
  const [showSuccess, setShowSuccess]             = useState(false)
  const [showError, setShowError]                 = useState(false)
  const [errorMessage, setErrorMessage]           = useState("")
  const router = useRouter()

  const handleAddBill = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "Authorization": `Bearer ${await getCookies("token")}`,
        },
        body: JSON.stringify({
          customer_id:        Number(customerId),
          month:              Number(month),
          year:               Number(year),
          measurement_number: measurementNumber,
          usage_value:        Number(usageValue),
        }),
      })
      if (!response.ok) {
        const err = await response.json()
        setErrorMessage(err.message || "Failed to add bill")
        setShowError(true)
        setIsLoading(false)
        return
      }
      setShowSuccess(true)
      setTimeout(() => { setShowSuccess(false); router.push("/admin/bills") }, 2000)
    } catch {
      setErrorMessage("Something went wrong.")
      setShowError(true)
    } finally { setIsLoading(false) }
  }

  const labelStyle: React.CSSProperties = { fontSize: "11px", fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", top: "-120px", right: "-120px", background: "rgba(56,189,248,0.09)", filter: "blur(110px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: "50%", bottom: "-100px", left: "-100px", background: "rgba(74,222,128,0.07)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div style={{ width: "100%", maxWidth: "600px", position: "relative", zIndex: 10 }}>

        {/* Back */}
        <Link href="/admin/bills" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "rgba(255,255,255,0.45)", marginBottom: "24px", fontSize: "13px", fontWeight: 600, transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#38bdf8"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
        >
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={14} />
          </div>
          Back to Bills
        </Link>

        {/* Card */}
        <div style={{ borderRadius: "24px", overflow: "hidden", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(74,222,128,0.2)", boxShadow: "0 0 60px rgba(56,189,248,0.07)" }}>
          <div style={{ height: "2px", background: "linear-gradient(90deg, #38bdf8, #4ade80, transparent)" }} />
          <div style={{ padding: "40px 36px" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)", boxShadow: "0 0 20px rgba(56,189,248,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Receipt size={22} style={{ color: "#38bdf8" }} />
              </div>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 900, color: "#38bdf8", margin: "0 0 4px", textShadow: "0 0 20px rgba(56,189,248,0.3)", letterSpacing: "-0.02em" }}>New Billing Statement</h1>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Initialize usage tracking for customer</p>
              </div>
            </div>

            <form onSubmit={handleAddBill} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Customer */}
              <div>
                <label style={labelStyle}><User size={13} /> Target Customer</label>
                <div style={{ position: "relative" }}>
                  <select required value={customerId} onChange={e => setCustomerId(e.target.value)} style={selectStyle} onFocus={onFocus} onBlur={onBlur}>
                    <option value="" style={{ background: "#0a0f1e" }}>Select a customer...</option>
                    {customers.map(c => <option key={c.id} value={c.id} style={{ background: "#0a0f1e" }}>{c.name} ({c.customer_number})</option>)}
                  </select>
                  <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* Meter + Usage */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}><Hash size={13} /> Meter Number</label>
                  <input type="text" required value={measurementNumber} onChange={e => setMeasurementNumber(e.target.value)} placeholder="MTR-00123" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={labelStyle}><Droplets size={13} /> Usage (m³)</label>
                  <input type="number" min="0.01" step="0.01" required value={usageValue} onChange={e => setUsageValue(e.target.value)} placeholder="0.00" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Billing Period */}
              <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.12)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                  <Calendar size={13} style={{ color: "#38bdf8" }} />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em" }}>Billing Period</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ position: "relative" }}>
                    <select required value={month} onChange={e => setMonth(e.target.value)} style={selectStyle} onFocus={onFocus} onBlur={onBlur}>
                      {MONTHS.map(m => <option key={m.value} value={m.value} style={{ background: "#0a0f1e" }}>{m.label}</option>)}
                    </select>
                    <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <select required value={year} onChange={e => setYear(e.target.value)} style={selectStyle} onFocus={onFocus} onBlur={onBlur}>
                      {YEARS.map(y => <option key={y} value={y} style={{ background: "#0a0f1e" }}>{y}</option>)}
                    </select>
                    <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button type="submit" disabled={isLoading}
                  style={{ flex: 1, padding: "13px", borderRadius: "12px", background: isLoading ? "rgba(56,189,248,0.5)" : "#38bdf8", color: "#0a0f1e", fontSize: "14px", fontWeight: 700, border: "none", cursor: isLoading ? "not-allowed" : "pointer", boxShadow: "0 0 20px rgba(56,189,248,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}
                  onMouseEnter={e => { if (!isLoading) { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(56,189,248,0.6)"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)" } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(56,189,248,0.35)"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)" }}
                >
                  {isLoading ? <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} /> : <Save size={16} />}
                  {isLoading ? "Saving..." : "Create Bill"}
                </button>
                <button type="button" onClick={() => router.push("/admin/bills")}
                  style={{ flex: 1, padding: "13px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)" }}
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ borderRadius: "24px", padding: "40px 36px", background: "#0a0f1e", border: "1px solid rgba(74,222,128,0.3)", boxShadow: "0 0 60px rgba(74,222,128,0.15)", textAlign: "center", maxWidth: "360px", width: "90%", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #4ade80, #38bdf8, transparent)" }} />
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.35)", boxShadow: "0 0 28px rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#4ade80", margin: "0 0 8px", textShadow: "0 0 16px rgba(74,222,128,0.4)" }}>Bill Created!</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>Billing record has been saved. Redirecting...</p>
            <div style={{ height: "3px", borderRadius: "999px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#4ade80", animation: "progress 2s linear forwards" }} />
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ borderRadius: "24px", padding: "40px 36px", background: "#0a0f1e", border: "1px solid rgba(239,68,68,0.3)", boxShadow: "0 0 60px rgba(239,68,68,0.1)", textAlign: "center", maxWidth: "360px", width: "90%", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #ef4444, transparent)" }} />
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#ef4444", margin: "0 0 8px" }}>Failed</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>{errorMessage}</p>
            <button onClick={() => setShowError(false)}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.16)"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"}
            >Close and Retry</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progress { from { width: 0; } to { width: 100%; } }
        input::placeholder, select { color: rgba(255,255,255,0.2); }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
      `}</style>
    </div>
  )
}