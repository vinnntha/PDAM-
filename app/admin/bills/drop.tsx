"use client"
import { getCookies } from "@/helper/cookies"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Trash2, Loader2 } from "lucide-react"

export default function DropBillButton({ selectedData }: { selectedData: number }) {
  const [isLoading, setIsLoading]       = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)
  const [showSuccess, setShowSuccess]   = useState(false)
  const [showError, setShowError]       = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const handleConfirmDelete = async () => {
    setShowConfirm(false)
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bills/${selectedData}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
            "authorization": `Bearer ${await getCookies("token")}`,
          },
        }
      )
      if (!response.ok) {
        setErrorMessage("Failed to delete bill. Please try again.")
        setShowError(true)
        setIsLoading(false)
        return
      }
      setShowSuccess(true)
      setTimeout(() => { setShowSuccess(false); router.refresh() }, 2000)
    } catch {
      setErrorMessage("An unexpected error occurred while deleting the bill.")
      setShowError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
    }}>
      {children}
    </div>
  )

  const ModalCard = ({ borderColor, glowColor, children }: {
    borderColor: string; glowColor: string; children: React.ReactNode
  }) => (
    <div style={{
      borderRadius: "24px", padding: "36px", background: "#0a0f1e",
      border: `1px solid ${borderColor}`,
      boxShadow: `0 0 60px ${glowColor}`,
      textAlign: "center", maxWidth: "360px", width: "100%",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${borderColor.replace("0.3","0.8")}, transparent)` }} />
      {children}
    </div>
  )

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isLoading}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "10px 16px", borderRadius: "10px",
          background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)",
          color: "#ef4444", fontSize: "13px", fontWeight: 600,
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.5 : 1, transition: "all 0.2s",
        }}
        onMouseEnter={e => {
          if (!isLoading) {
            const el = e.currentTarget as HTMLButtonElement
            el.style.background = "rgba(239,68,68,0.14)"
            el.style.boxShadow = "0 0 12px rgba(239,68,68,0.2)"
          }
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = "rgba(239,68,68,0.07)"
          el.style.boxShadow = "none"
        }}
      >
        {isLoading ? <Loader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} /> : <Trash2 size={14} />}
        {isLoading ? "Deleting..." : "Delete"}
      </button>

      {/* Confirm Modal */}
      {showConfirm && (
        <Overlay>
          <ModalCard borderColor="rgba(234,179,8,0.3)" glowColor="rgba(234,179,8,0.08)">
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", boxShadow: "0 0 24px rgba(234,179,8,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#eab308", margin: "0 0 8px", textShadow: "0 0 16px rgba(234,179,8,0.35)" }}>Delete Bill?</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 28px", lineHeight: 1.65 }}>
              This will permanently remove billing record{" "}
              <span style={{ color: "#ffffff", fontWeight: 700 }}>#{selectedData}</span>. This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)" }}
              >Keep it</button>
              <button onClick={handleConfirmDelete}
                style={{ flex: 1, padding: "12px", borderRadius: "12px", background: "#ef4444", color: "#ffffff", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 0 20px rgba(239,68,68,0.35)", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(239,68,68,0.6)"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(239,68,68,0.35)"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)" }}
              >Delete</button>
            </div>
          </ModalCard>
        </Overlay>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <Overlay>
          <ModalCard borderColor="rgba(74,222,128,0.3)" glowColor="rgba(74,222,128,0.1)">
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.35)", boxShadow: "0 0 24px rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#4ade80", margin: "0 0 8px", textShadow: "0 0 16px rgba(74,222,128,0.4)" }}>Deleted!</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: 0 }}>The billing record has been successfully removed.</p>
          </ModalCard>
        </Overlay>
      )}

      {/* Error Modal */}
      {showError && (
        <Overlay>
          <ModalCard borderColor="rgba(239,68,68,0.3)" glowColor="rgba(239,68,68,0.08)">
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#ef4444", margin: "0 0 8px" }}>Error Occurred</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px", lineHeight: 1.65 }}>{errorMessage}</p>
            <button onClick={() => setShowError(false)}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.16)"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"}
            >Got it</button>
          </ModalCard>
        </Overlay>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}