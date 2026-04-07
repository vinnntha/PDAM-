"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import { ArrowLeft, CreditCard, UploadCloud, FileImage, Loader2, CheckCircle2 } from "lucide-react"

export default function PaymentForm({ pendingBills }: { pendingBills: any[] }) {
  const router = useRouter()
  const [billId, setBillId] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const MONTHS = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!billId) {
      setError("Please select a bill to pay.")
      return
    }
    if (!file) {
      setError("Please upload a payment proof image.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("bill_id", billId)
      formData.append("file", file)

      const token = await getCookies("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payments`, {
        method: "POST",
        headers: {
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "Authorization": `Bearer ${token}`,
          // Note: browser sets Content-Type automatically for FormData including boundary
        },
        body: formData,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit payment")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/customer/payments")
        router.refresh()
      }, 2000)

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/customer/payments" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "40px", height: "40px", borderRadius: "10px",
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.6)", transition: "all 0.2s"
        }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", margin: 0, letterSpacing: "-0.01em" }}>Submit Payment</h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>Upload your payment receipt securely.</p>
        </div>
      </div>

      {success ? (
        <div style={{
          borderRadius: "20px", padding: "40px", textAlign: "center",
          background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.2)"
        }}>
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px"
          }}>
            <CheckCircle2 size={30} style={{ color: "#4ade80" }} />
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#4ade80", margin: "0 0 10px" }}>Payment Submitted</h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: "0 0 0" }}>Your payment proof has been uploaded and is waiting for verification. Redirecting...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          borderRadius: "24px", padding: "32px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(168,85,247,0.18)",
          position: "relative"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #a855f7, #38bdf8, transparent)" }} />

          {error && (
            <div style={{
              padding: "16px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#fca5a5", fontSize: "13px", fontWeight: 600, marginBottom: "24px",
              display: "flex", alignItems: "center", gap: "10px"
            }}>
              <div style={{ width: "4px", height: "16px", background: "#ef4444", borderRadius: "2px" }} />
              {error}
            </div>
          )}

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <CreditCard size={14} style={{ color: "#a855f7" }} />
              Select Bill to Pay
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={billId}
                onChange={(e) => setBillId(e.target.value)}
                style={{
                  width: "100%", padding: "16px", borderRadius: "14px",
                  background: "rgba(10,15,30,0.5)", border: "1px solid rgba(255,255,255,0.1)",
                  color: billId ? "#ffffff" : "rgba(255,255,255,0.3)", fontSize: "14px",
                  appearance: "none", cursor: "pointer", outline: "none", transition: "all 0.2s"
                }}
              >
                <option value="" disabled>-- Select a pending bill --</option>
                {pendingBills.length === 0 && (
                  <option disabled>No pending bills found.</option>
                )}
                {pendingBills.map(bill => (
                  <option key={bill.id} value={bill.id} style={{ color: "#000" }}>
                    {MONTHS[bill.month]} {bill.year} - Rp {bill.amount.toLocaleString("id-ID")}
                  </option>
                ))}
              </select>
              <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <FileImage size={14} style={{ color: "#38bdf8" }} />
              Upload Payment Proof
            </label>
            <label style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              width: "100%", height: "180px", borderRadius: "16px",
              background: "rgba(10,15,30,0.5)", border: "2px dashed rgba(255,255,255,0.1)",
              cursor: "pointer", transition: "all 0.2s",
              ...(file ? { borderColor: "rgba(56,189,248,0.4)", background: "rgba(56,189,248,0.03)" } : {})
            }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px"
              }}>
                <UploadCloud size={24} style={{ color: file ? "#38bdf8" : "rgba(255,255,255,0.4)" }} />
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: file ? "#38bdf8" : "rgba(255,255,255,0.6)", marginBottom: "6px" }}>
                {file ? file.name : "Click to attach image file"}
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>PNG, JPG, JPEG up to 5MB</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !billId || !file}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              padding: "16px", borderRadius: "14px",
              background: loading || !billId || !file ? "rgba(255,255,255,0.05)" : "linear-gradient(to right, #a855f7, #38bdf8)",
              color: loading || !billId || !file ? "rgba(255,255,255,0.3)" : "#ffffff",
              fontSize: "15px", fontWeight: 700, border: "none", cursor: loading || !billId || !file ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: loading || !billId || !file ? "none" : "0 8px 24px rgba(168,85,247,0.3)",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                Submitting...
              </>
            ) : (
              "Submit Payment"
            )}
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </button>
        </form>
      )}
    </div>
  )
}
