import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import { CreditCard, Hash, Info } from "lucide-react"
import AdminPaymentsList from "./payments-list"

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
  verified: boolean
  total_amount: number
  payment_date: string
  owner_token: string
  createdAt: string
  updatedAt: string
  bill?: {
    id: number
    month: number
    year: number
    usage_value: number
    paid: boolean
    customer_id: number
    customer?: {
      name: string
      customer_number: string
    }
  }
}

async function getAllPayments(page = 1, quantity = 50, search = ""): Promise<PaymentsResponse> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/payments`)
    url.searchParams.append("page", page.toString())
    url.searchParams.append("quantity", quantity.toString())
    if (search) url.searchParams.append("search", search)

    const response = await fetch(url.toString(), {
      method: "GET", cache: "no-store",
      headers: {
        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        "Authorization": `Bearer ${await getCookies("token")}`,
      },
    })
    const data: PaymentsResponse = await response.json()
    if (!response.ok) return { success: false, message: data?.message || "Failed to fetch payments", data: [], count: 0 }
    return data
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to fetch payments", data: [], count: 0 }
  }
}

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const search = (Array.isArray(resolvedSearchParams.search) ? resolvedSearchParams.search[0] : resolvedSearchParams.search) || ""

  const { success, message, data, count } = await getAllPayments(1, 50, search)

  if (!success) {
    return (
      <div style={{
        minHeight: "100vh", backgroundColor: "#0a0f1e",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
      }}>
        <div style={{
          borderRadius: "20px", padding: "40px", background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.2)", maxWidth: "400px", width: "100%", textAlign: "center",
        }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
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

  const displayCount = data ? data.length : 0

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", color: "#ffffff", position: "relative", overflow: "hidden", paddingBottom: "60px" }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", top: "-120px", right: "-120px", background: "rgba(56,189,248,0.09)", filter: "blur(110px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: "50%", bottom: "-100px", left: "-100px", background: "rgba(168,85,247,0.07)", filter: "blur(100px)", pointerEvents: "none" }} />
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
                Payment Management
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0", display: "flex", alignItems: "center", gap: "6px" }}>
                <Hash size={13} style={{ color: "#38bdf8" }} />
                {displayCount} payments found
              </p>
            </div>
          </div>
        </div>

        {/* List wrapped in Client Component */}
        <AdminPaymentsList initialData={data || []} />

      </div>
    </div>
  )
}
