"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookies } from "@/helper/cookies"
import { PaymentData } from "./page"
import { Clock, CheckCircle2, AlertCircle, X, Check, Eye } from "lucide-react"

function StatusBadge({ verified }: { verified: boolean }) {
  if (verified) return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      padding: "4px 12px", borderRadius: "999px",
      background: "rgba(74,222,128,0.08)",
      border: "1px solid rgba(74,222,128,0.3)",
    }}>
      <CheckCircle2 size={12} style={{ color: "#4ade80" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase" }}>VERIFIED</span>
    </div>
  )
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      padding: "4px 12px", borderRadius: "999px",
      background: "rgba(234,179,8,0.08)",
      border: "1px solid rgba(234,179,8,0.3)",
    }}>
      <Clock size={12} style={{ color: "#eab308" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>PENDING</span>
    </div>
  )
}

export default function AdminPaymentsList({ initialData }: { initialData: PaymentData[] }) {
  const router = useRouter()
  const [payments, setPayments] = useState<PaymentData[]>(initialData)
  const [selectedProof, setSelectedProof] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<number | null>(null)
  
  // Quick fix: the current API might just take a PATCH to /payments/{id} to verify.
  const handleVerify = async (paymentId: number) => {
    setLoadingId(paymentId)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payments/${paymentId}`, {
        method: "PATCH",
        headers: {
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "Authorization": `Bearer ${await getCookies("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ verified: true })
      })

      if (response.ok) {
        setPayments(prev => prev.map(p => 
          p.id === paymentId ? { ...p, verified: true } : p
        ))
        router.refresh()
      } else {
        alert("Verification failed.")
      }
    } catch (err) {
      console.error(err)
      alert("Error verifying payment limit reached or endpoint changed.")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <>
      <div style={{
        borderRadius: "24px", padding: "32px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(168,85,247,0.18)",
        marginBottom: "24px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #a855f7, #38bdf8, transparent)" }} />

        {payments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "rgba(255,255,255,0.4)" }}>No payments found in the system.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {payments.map(payment => (
              <div key={payment.id} style={{
                padding: "24px", borderRadius: "20px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
                display: "flex", flexDirection: "column", gap: "16px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "16px", color: "#ffffff", fontWeight: 700 }}>Payment #{payment.id}</h3>
                    <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Bill ID: {payment.bill_id}</p>
                    {payment.total_amount != null && (
                      <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#4ade80", fontWeight: 600 }}>Rp {payment.total_amount.toLocaleString("id-ID")}</p>
                    )}
                  </div>
                  <StatusBadge verified={payment.verified} />
                </div>
                
                {payment.bill?.customer && (
                  <div style={{ background: "rgba(10,15,30,0.5)", padding: "12px", borderRadius: "12px" }}>
                    <p style={{ margin: "0 0 4px", fontSize: "13px", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{payment.bill.customer.name}</p>
                    <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>ID: {payment.bill.customer.customer_number}</p>
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                  <button 
                    onClick={() => setSelectedProof(payment.payment_proof)}
                    style={{
                      flex: 1, padding: "10px", borderRadius: "10px",
                      background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8",
                      fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      cursor: "pointer", transition: "all 0.2s"
                    }}
                  >
                    <Eye size={14} /> View Proof
                  </button>
                  {!payment.verified && (
                    <button 
                      onClick={() => handleVerify(payment.id)}
                      disabled={loadingId === payment.id}
                      style={{
                        flex: 1, padding: "10px", borderRadius: "10px",
                        background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80",
                        fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                        cursor: loadingId === payment.id ? "not-allowed" : "pointer", transition: "all 0.2s"
                      }}
                    >
                      {loadingId === payment.id ? (
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>Wait...</span>
                      ) : (
                        <><Check size={14} /> Verify</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proof Modal */}
      {selectedProof && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(10,15,30,0.8)", backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
        }} onClick={() => setSelectedProof(null)}>
          <div style={{
            position: "relative",
            background: "#0a0f1e", border: "1px solid rgba(255,255,255,0.1)",
            padding: "8px", borderRadius: "16px", maxWidth: "90%", maxHeight: "90vh",
            display: "flex", flexDirection: "column"
          }} onClick={e => e.stopPropagation()}>
            <div style={{ position: "absolute", top: "16px", right: "16px" }}>
              <button onClick={() => setSelectedProof(null)} style={{
                background: "rgba(239,68,68,0.1)", border: "none", color: "#ef4444",
                width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer"
              }}>
                <X size={18} />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/payment-proof/${selectedProof}`} 
              alt="Payment Proof" 
              style={{ maxWidth: "100%", maxHeight: "calc(90vh - 16px)", objectFit: "contain", borderRadius: "12px" }}
            />
          </div>
        </div>
      )}
    </>
  )
}
