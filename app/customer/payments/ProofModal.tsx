"use client"

import { useState } from "react"
import { ImageIcon, X } from "lucide-react"

export default function ProofModal({ proofUrl }: { proofUrl: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "10px", borderRadius: "10px",
          background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.2)",
          color: "#a855f7", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
        }}
      >
        <ImageIcon size={14} />
        View Proof
      </button>

      {isOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px"
        }}>
          <div style={{
            position: "relative", maxWidth: "90vw", maxHeight: "90vh",
            background: "#0a0f1e", borderRadius: "16px", overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            border: "1px solid rgba(168,85,247,0.3)"
          }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute", top: "16px", right: "16px",
                background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
                width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", cursor: "pointer", zIndex: 10
              }}
            >
              <X size={20} />
            </button>
            <img 
              src={proofUrl} 
              alt="Payment Proof" 
              style={{ maxWidth: "100%", maxHeight: "calc(90vh - 40px)", display: "block", objectFit: "contain" }} 
            />
          </div>
        </div>
      )}
    </>
  )
}
