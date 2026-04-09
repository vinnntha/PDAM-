import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import Search from "./search"
import {
  Plus, Receipt, User, Calendar, Droplets,
  CreditCard, Hash, Filter, Search as SearchIcon,
  Info, Clock, CheckCircle2, AlertCircle,
} from "lucide-react"

export const dynamic = "force-dynamic"

export interface BillsResponse {
  success: boolean
  message: string
  data: BillData[]
  count: number
}

export interface BillData {
  id: number
  customer_id: number
  admin_id?: number
  month: number
  year: number
  measurement_number?: string
  usage_value: number
  price?: number
  service_id?: number
  paid: boolean
  owner_token: string
  createdAt: string
  updatedAt: string
  customer?: {
    id: number
    name: string
    customer_number: string
    service?: { id: number; name: string; price: number }
  }
  amount?: number
  status?: string
}

async function getBills(): Promise<BillsResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bills/me?quantity=100`, {
      method: "GET", cache: "no-store",
      headers: {
        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        "Authorization": `Bearer ${await getCookies("token")}`,
      },
    })
    const data: BillsResponse = await response.json()
    if (!response.ok) return { success: false, message: data?.message || "Failed to fetch bills", data: [], count: 0 }
    return data
  } catch {
    return { success: false, message: "Failed to fetch bills", data: [], count: 0 }
  }
}

const MONTHS = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

function StatusBadge({ status }: { status: string | boolean }) {
  const s = typeof status === "boolean" ? (status ? "paid" : "pending") : status?.toLowerCase()
  if (s === "paid") return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      padding: "4px 12px", borderRadius: "999px",
      background: "rgba(74,222,128,0.08)",
      border: "1px solid rgba(74,222,128,0.3)",
    }}>
      <CheckCircle2 size={12} style={{ color: "#4ade80" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase" }}>Paid</span>
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
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pending</span>
    </div>
  )
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      padding: "4px 12px", borderRadius: "999px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
    }}>
      <AlertCircle size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{status}</span>
    </div>
  )
}

export default async function BillsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const search = (Array.isArray(resolvedSearchParams.search)
    ? resolvedSearchParams.search[0]
    : resolvedSearchParams.search) || ""

  const { success, message, data } = await getBills()

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
          <Link href="/admin/profile" style={{
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

  const filteredData = search?.trim()
    ? data.filter(b =>
      b.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.customer?.customer_number?.toLowerCase().includes(search.toLowerCase())
    ) : data
  const displayCount = filteredData.length

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", color: "#ffffff", position: "relative", overflow: "hidden" }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", top: "-120px", right: "-120px", background: "rgba(56,189,248,0.09)", filter: "blur(110px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: "50%", bottom: "-100px", left: "-100px", background: "rgba(74,222,128,0.07)", filter: "blur(100px)", pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div style={{ position: "relative", zIndex: 10, padding: "40px 48px", maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "50px", height: "50px", borderRadius: "14px",
              background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)",
              boxShadow: "0 0 20px rgba(56,189,248,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Receipt size={22} style={{ color: "#38bdf8" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, color: "#38bdf8", margin: 0, letterSpacing: "-0.02em", textShadow: "0 0 24px rgba(56,189,248,0.3)" }}>
                Billing Records
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0", display: "flex", alignItems: "center", gap: "6px" }}>
                <Hash size={13} style={{ color: "#4ade80" }} />
                {displayCount} statements found
              </p>
            </div>
          </div>


        </div>

        {/* Main Card */}
        <div style={{
          borderRadius: "24px", padding: "32px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(74,222,128,0.18)",
          marginBottom: "24px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #38bdf8, #4ade80, transparent)" }} />

          {/* Search */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Filter size={16} style={{ color: "#4ade80" }} />
              <h2 style={{ fontSize: "13px", fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
                Filter Records
              </h2>
            </div>
            <Search search={search} />
          </div>

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
                <SearchIcon size={28} style={{ color: "rgba(255,255,255,0.2)" }} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.6)", margin: "0 0 8px" }}>No Bills Found</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", maxWidth: "380px", margin: "0 auto", lineHeight: 1.7 }}>
                {search?.trim()
                  ? `No bill matches "${search}". Try a different keyword.`
                  : "No billing records yet. Create a new bill to start tracking usage."}
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {filteredData.map(bill => (
                <div
                  key={bill.id}
                  style={{
                    borderRadius: "20px", padding: "24px",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(56,189,248,0.18)",
                    position: "relative", overflow: "hidden", transition: "all 0.3s",
                  }}

                >
                  {/* Card top accent */}
                  <div style={{ position: "absolute", top: 0, left: "20px", right: "20px", height: "1px", background: "linear-gradient(90deg, #38bdf850, transparent)" }} />

                  {/* Card Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "12px",
                      background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <User size={18} style={{ color: "#38bdf8" }} />
                    </div>
                    <StatusBadge status={bill.paid} />
                  </div>

                  {/* Customer name */}
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {bill.customer?.name || `Customer #${bill.customer_id}`}
                  </h3>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.3)", margin: "0 0 18px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {bill.customer?.customer_number || "-"}
                  </p>

                  {/* Billing period row */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 12px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
                    marginBottom: "12px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Calendar size={13} style={{ color: "#38bdf8" }} />
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Period</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff" }}>
                      {MONTHS[bill.month]} {bill.year}
                    </span>
                  </div>

                  {/* Usage + Amount grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                    <div style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <Droplets size={12} style={{ color: "#38bdf8" }} />
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em" }}>Usage</span>
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{bill.usage_value} m³</span>
                    </div>
                    <div style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <CreditCard size={12} style={{ color: "#4ade80" }} />
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em" }}>Amount</span>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#4ade80" }}>
                        Rp {bill.amount?.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {(!bill.paid && bill.status?.toLowerCase() !== "paid") && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Link href="/customer/payments/new" style={{ flex: 1, textDecoration: "none" }}>
                        <button style={{
                          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                          padding: "10px", borderRadius: "10px",
                          background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.2)",
                          color: "#a855f7", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                        }}
                        >
                          <CreditCard size={14} style={{ color: "#a855f7" }} />
                          Pay Bill
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div style={{
          borderRadius: "16px", padding: "16px 24px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Info size={16} style={{ color: "#38bdf8" }} />
            </div>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
              Showing <span style={{ color: "#ffffff", fontWeight: 700 }}>{displayCount}</span> records
            </span>
          </div>
          {search?.trim() && (
            <div style={{ padding: "6px 14px", borderRadius: "10px", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.18)", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
              Filtering by: <span style={{ color: "#38bdf8", fontWeight: 700 }}>"{search}"</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}