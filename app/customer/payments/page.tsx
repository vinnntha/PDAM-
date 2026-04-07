import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import {
  Plus, Receipt, User, Calendar, Droplets,
  CreditCard, Hash, Filter, Search as SearchIcon,
  Info, Clock, CheckCircle2, AlertCircle, Image as ImageIcon
} from "lucide-react"

export const dynamic = "force-dynamic"

export interface PaymentsResponse {
  success: boolean
  message: string
  data: PaymentData[]
  count: number
}

export interface PaymentData {
  id: number
  bill_id: number
  payment_proof: string
  status: string
  owner_token: string
  createdAt: string
  updatedAt: string
  bill?: {
    id: number
    month: number
    year: number
    usage_value: number
    payment_status: string
  }
}

async function getPayments(): Promise<PaymentsResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payments/me`, {
      method: "GET", cache: "no-store",
      headers: {
        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        "Authorization": `Bearer ${await getCookies("token")}`,
      },
    })
    const data: PaymentsResponse = await response.json()
    if (!response.ok) return { success: false, message: data?.message || "Failed to fetch payments", data: [], count: 0 }
    return data
  } catch {
    return { success: false, message: "Failed to fetch payments", data: [], count: 0 }
  }
}

function StatusBadge({ status }: { status: string }) {
  const s = status?.toLowerCase()
  if (s === "verified") return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      padding: "4px 12px", borderRadius: "999px",
      background: "rgba(74,222,128,0.08)",
      border: "1px solid rgba(74,222,128,0.3)",
    }}>
      <CheckCircle2 size={12} style={{ color: "#4ade80" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase" }}>{status}</span>
    </div>
  )
  if (s === "pending") return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      padding: "4px 12px", borderRadius: "999px",
      background: "rgba(234,179,8,0.08)",
      border: "1px solid rgba(234,179,8,0.3)",
    }}>
      <Clock size={12} style={{ color: "#eab308" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>{status}</span>
    </div>
  )
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      padding: "4px 12px", borderRadius: "999px",
      background: "rgba(239,68,68,0.08)",
      border: "1px solid rgba(239,68,68,0.3)",
    }}>
      <AlertCircle size={12} style={{ color: "#ef4444" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em", textTransform: "uppercase" }}>{status}</span>
    </div>
  )
}

export default async function CustomerPaymentsPage() {
  const { success, message, data } = await getPayments()

  if (!success) {
    return (
      <div style={{
        minHeight: "100vh", backgroundColor: "#0a0f1e",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}>
        <div style={{
          borderRadius: "20px", padding: "40px",
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.2)",
          maxWidth: "400px", width: "100%", textAlign: "center",
        }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
          }}>
            <Info size={24} style={{ color: "#ef4444" }} />
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#ef4444", margin: "0 0 8px" }}>Fetch Error</h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>{message}</p>
          <Link href="/customer/profile" style={{
            display: "inline-block", padding: "10px 24px", borderRadius: "10px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 600, textDecoration: "none",
          }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const displayCount = data ? data.length : 0

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", color: "#ffffff", position: "relative", overflow: "hidden" }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", top: "-120px", right: "-120px", background: "rgba(168,85,247,0.09)", filter: "blur(110px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: "50%", bottom: "-100px", left: "-100px", background: "rgba(56,189,248,0.07)", filter: "blur(100px)", pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div style={{ position: "relative", zIndex: 10, padding: "40px 48px", maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "50px", height: "50px", borderRadius: "14px",
              background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)",
              boxShadow: "0 0 20px rgba(168,85,247,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CreditCard size={22} style={{ color: "#a855f7" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, color: "#a855f7", margin: 0, letterSpacing: "-0.02em", textShadow: "0 0 24px rgba(168,85,247,0.3)" }}>
                My Payments
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0", display: "flex", alignItems: "center", gap: "6px" }}>
                <Hash size={13} style={{ color: "#38bdf8" }} />
                {displayCount} payment records
              </p>
            </div>
          </div>

          <Link href="/customer/payments/new" style={{ textDecoration: "none" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "12px 24px", borderRadius: "12px",
              background: "#a855f7", color: "#ffffff",
              fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer",
              boxShadow: "0 0 20px rgba(168,85,247,0.4)", transition: "all 0.2s",
            }}>
              <Plus size={16} />
              Submit Payment Proof
            </button>
          </Link>
        </div>

        {/* Main Card */}
        <div style={{
          borderRadius: "24px", padding: "32px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(168,85,247,0.18)",
          marginBottom: "24px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #a855f7, #38bdf8, transparent)" }} />

          {/* Empty State */}
          {displayCount === 0 ? (
            <div style={{
              padding: "64px 24px", textAlign: "center",
              borderRadius: "16px", background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
              }}>
                <Receipt size={28} style={{ color: "rgba(255,255,255,0.2)" }} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.6)", margin: "0 0 8px" }}>No Payments Found</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", maxWidth: "380px", margin: "0 auto", lineHeight: 1.7 }}>
                You haven't made any payments yet. When you pay a bill, your payment history will appear here.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {data.map(payment => (
                <div
                  key={payment.id}
                  style={{
                    borderRadius: "20px", padding: "24px",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(168,85,247,0.18)",
                    position: "relative", overflow: "hidden", transition: "all 0.3s",
                  }}
                >
                  {/* Card top accent */}
                  <div style={{ position: "absolute", top: 0, left: "20px", right: "20px", height: "1px", background: "linear-gradient(90deg, #a855f750, transparent)" }} />

                  {/* Card Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "12px",
                      background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Receipt size={18} style={{ color: "#a855f7" }} />
                    </div>
                    <StatusBadge status={payment.status} />
                  </div>

                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px" }}>
                    Payment #{payment.id}
                  </h3>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.3)", margin: "0 0 18px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Bill ID: {payment.bill_id}
                  </p>

                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 12px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
                    marginBottom: "16px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Calendar size={13} style={{ color: "#a855f7" }} />
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Date</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff" }}>
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/payment-proof/${payment.payment_proof}`} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: "none" }}>
                      <button style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                        padding: "10px", borderRadius: "10px",
                        background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.2)",
                        color: "#a855f7", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                      }}>
                        <ImageIcon size={14} />
                        View Proof
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
