"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bill } from "./page"
import { getCookies } from "@/helper/cookies"
import { ArrowLeft, Save, Gauge, Hash, Banknote, Calendar, User, Loader2 } from "lucide-react"

interface Customer { id: number; name: string; customer_number: string }
type Props = { bill: Bill; customers: Customer[] }

const MONTHS = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px", borderRadius: "12px",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.2)",
  color: "#ffffff", fontSize: "14px", outline: "none", transition: "all 0.2s", boxSizing: "border-box",
}
const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "rgba(56,189,248,0.5)"
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)"
  e.currentTarget.style.background = "rgba(56,189,248,0.04)"
}
const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)"
  e.currentTarget.style.boxShadow = "none"
  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
}
const labelStyle: React.CSSProperties = {
  fontSize: "11px", fontWeight: 700, color: "#4ade80",
  textTransform: "uppercase", letterSpacing: "0.1em",
  display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px",
}

export default function EditBillForm({ bill, customers }: Props) {
  const [measurementNumber, setMeasurementNumber] = useState(String(bill.measurement_number ?? ""))
  const [usageValue, setUsageValue] = useState(String(bill.usage_value ?? (bill as any).usage ?? ""))
  const [isLoading, setIsLoading]   = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError]     = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const customer = customers.find(c => c.id === bill.customer_id)

  const handleEditBill = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bills/${bill.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "app-key": process.env.NEXT_PUBLIC_APP_KEY || "", "Authorization": `Bearer ${await getCookies("token")}` },
        body: JSON.stringify({ measurement_number: measurementNumber, usage_value: Number(usageValue) }),
      })
      if (!response.ok) {
        const err = await response.json()
        setErrorMessage(err.message || "Failed to edit bill"); setShowError(true); setIsLoading(false); return
      }
      setShowSuccess(true); setIsLoading(false)
      setTimeout(() => { setShowSuccess(false); router.push("/admin/bills") }, 2000)
    } catch {
      setErrorMessage("Something went wrong."); setShowError(true); setIsLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", top: "-120px", right: "-120px", background: "rgba(56,189,248,0.09)", filter: "blur(110px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: "50%", bottom: "-100px", left: "-100px", background: "rgba(74,222,128,0.07)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div style={{ width: "100%", maxWidth: "600px", position: "relative", zIndex: 10 }}>

        {/* Back */}
        <button onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", marginBottom: "24px", fontSize: "13px", fontWeight: 600, transition: "all 0.2s", padding: 0 }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#38bdf8"}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)"}
        >
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={14} />
          </div>
          Back to Bills
        </button>

        {/* Card */}
        <div style={{ borderRadius: "24px", overflow: "hidden", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(74,222,128,0.2)", boxShadow: "0 0 60px rgba(56,189,248,0.07)" }}>
          <div style={{ height: "2px", background: "linear-gradient(90deg, #38bdf8, #4ade80, transparent)" }} />
          <div style={{ padding: "40px 36px" }}>

            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#38bdf8", margin: "0 0 4px", textShadow: "0 0 20px rgba(56,189,248,0.3)", letterSpacing: "-0.02em" }}>Edit Bill</h1>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Modify bill information for the selected period</p>
              </div>
              {/* Period badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "12px", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.18)" }}>
                <Calendar size={15} style={{ color: "#38bdf8" }} />
                <div>
                  <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontWeight: 700, margin: 0 }}>Period</p>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>{MONTHS[bill.month]} {bill.year}</p>
                </div>
              </div>
            </div>

            {/* Customer info */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "14px", background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.15)", marginBottom: "28px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <User size={17} style={{ color: "#38bdf8" }} />
              </div>
              <div>
                <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(56,189,248,0.6)", fontWeight: 700, margin: 0 }}>Customer</p>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "2px 0 0" }}>{customer ? customer.name : `ID #${bill.customer_id}`}</p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0, fontFamily: "monospace" }}>{customer?.customer_number || "—"}</p>
              </div>
            </div>

            <form onSubmit={handleEditBill} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Measurement + Usage */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}><Hash size={13} /> Meter Number</label>
                  <input type="text" required value={measurementNumber} onChange={e => setMeasurementNumber(e.target.value)} placeholder="MTR-00123" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={labelStyle}><Gauge size={13} /> Usage (m³)</label>
                  <input type="number" min="0.01" step="0.01" required value={usageValue} onChange={e => setUsageValue(e.target.value)} placeholder="0.00" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button type="submit" disabled={isLoading}
                  style={{ flex: 1, padding: "13px", borderRadius: "12px", background: isLoading ? "rgba(56,189,248,0.5)" : "#38bdf8", color: "#0a0f1e", fontSize: "14px", fontWeight: 700, border: "none", cursor: isLoading ? "not-allowed" : "pointer", boxShadow: "0 0 20px rgba(56,189,248,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}
                  onMouseEnter={e => { if (!isLoading) { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(56,189,248,0.6)"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)" } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(56,189,248,0.35)"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)" }}
                >
                  {isLoading ? <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} /> : <Save size={16} />}
                  {isLoading ? "Updating..." : "Save Changes"}
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
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#4ade80", margin: "0 0 8px", textShadow: "0 0 16px rgba(74,222,128,0.4)" }}>Bill Updated!</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>Changes saved successfully. Redirecting...</p>
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
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#ef4444", margin: "0 0 8px" }}>Update Failed</h2>
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
        input::placeholder { color: rgba(255,255,255,0.2); }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
      `}</style>
    </div>
  )
}