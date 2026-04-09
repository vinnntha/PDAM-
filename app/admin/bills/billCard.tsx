// app/admin/bills/BillCard.tsx
"use client"
import Link from "next/link"
import { User, Calendar, Droplets, CreditCard } from "lucide-react"
import DropBillButton from "./drop"
import { BillData } from "./page"

const MONTHS = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

export default function BillCard({ bill }: { bill: BillData }) {
  return (
    <div
      style={{
        borderRadius: "20px", padding: "24px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(56,189,248,0.18)",
        position: "relative", overflow: "hidden", transition: "all 0.3s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "translateY(-4px)"
        el.style.borderColor = "rgba(56,189,248,0.4)"
        el.style.boxShadow = "0 0 28px rgba(56,189,248,0.1)"
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "translateY(0)"
        el.style.borderColor = "rgba(56,189,248,0.18)"
        el.style.boxShadow = "none"
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: "20px", right: "20px",
        height: "1px",
        background: "linear-gradient(90deg, #38bdf850, transparent)",
      }} />

      {/* Card Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "12px",
          background: "rgba(56,189,248,0.08)",
          border: "1px solid rgba(56,189,248,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <User size={18} style={{ color: "#38bdf8" }} />
        </div>
        <StatusBadge status={bill.status ?? "unknown"} />
      </div>

      {/* Customer name */}
      <h3 style={{
        fontSize: "16px", fontWeight: 700, color: "#ffffff",
        margin: "0 0 4px",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>
        {bill.customer?.name || `Customer #${bill.customer_id}`}
      </h3>
      <p style={{
        fontSize: "10px", fontWeight: 700,
        color: "rgba(255,255,255,0.3)", margin: "0 0 18px",
        textTransform: "uppercase", letterSpacing: "0.1em",
      }}>
        {bill.customer?.customer_number || "-"}
      </p>

      {/* Period */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 12px", borderRadius: "10px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.05)",
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

      {/* Usage + Amount */}
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
      <div style={{ display: "flex", gap: "10px" }}>
        <Link href={`/admin/bills/edit/${bill.id}`} style={{ flex: 1, textDecoration: "none" }}>
          <button
            style={{
              width: "100%", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "6px",
              padding: "10px", borderRadius: "10px",
              background: "rgba(56,189,248,0.07)",
              border: "1px solid rgba(56,189,248,0.2)",
              color: "#38bdf8", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = "rgba(56,189,248,0.14)"
              el.style.boxShadow = "0 0 12px rgba(56,189,248,0.2)"
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = "rgba(56,189,248,0.07)"
              el.style.boxShadow = "none"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        </Link>
        <DropBillButton selectedData={bill.id} />
      </div>
    </div>
  )
}

// StatusBadge stays here since it's used by BillCard (client component)
function StatusBadge({ status }: { status: string | undefined }) {
  const s = status?.toLowerCase()
  if (s === "paid") return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.3)" }}>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase" }}>Paid</span>
    </div>
  )
  if (s === "pending") return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.3)" }}>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#eab308", boxShadow: "0 0 6px #eab308" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pending</span>
    </div>
  )
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{status}</span>
    </div>
  )
}