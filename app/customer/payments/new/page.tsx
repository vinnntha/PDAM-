import { Suspense } from "react"
import { getCookies } from "@/helper/cookies"
import PaymentForm from "./payment-form"
import Link from "next/link"
import { Info } from "lucide-react"

export const dynamic = "force-dynamic"

export interface BillsResponse {
  success: boolean
  message: string
  data: BillData[]
}

export interface BillData {
  id: number
  customer_id: number
  usage: number
  amount: number
  status: string
  month: number
  year: number
}

async function getPendingBills(): Promise<BillsResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bills/me?quantity=100`, {
      method: "GET", cache: "no-store",
      headers: {
        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        "Authorization": `Bearer ${await getCookies("token")}`,
      },
    })
    const data: BillsResponse = await response.json()
    if (!response.ok) return { success: false, message: data?.message || "Failed to fetch bills", data: [] }
    
    // Filter to only return pending / unpaid bills (status NOT paid)
    // You might need to adjust the exact string if "paid" doesn't match
    const pendingBills = (data.data || []).filter(b => b.status?.toLowerCase() !== "paid" && b.status?.toLowerCase() !== "verified")
    
    return { ...data, data: pendingBills }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch bills", data: [] }
  }
}

export default async function NewPaymentPage() {
  const { success, message, data } = await getPendingBills()

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
          <Link href="/customer/payments" style={{
            display: "inline-block", padding: "10px 24px", borderRadius: "10px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 600, textDecoration: "none",
          }}>
            Back to Payments
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", color: "#ffffff", position: "relative", overflow: "hidden", paddingBottom: "60px" }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", top: "-120px", right: "-120px", background: "rgba(168,85,247,0.09)", filter: "blur(110px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: "50%", bottom: "-100px", left: "-100px", background: "rgba(56,189,248,0.07)", filter: "blur(100px)", pointerEvents: "none" }} />
      
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div style={{ position: "relative", zIndex: 10, padding: "40px 24px", maxWidth: "600px", margin: "0 auto" }}>
        <Suspense fallback={<div style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "40px" }}>Loading...</div>}>
          <PaymentForm pendingBills={data || []} />
        </Suspense>
      </div>
    </div>
  )
}
