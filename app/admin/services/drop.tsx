"use client"
import { getCookies } from "@/helper/cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DropServiceButton({ selectedData }: { selectedData: number }) {
  const [isLoading, setIsLoading]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError]     = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/services/${selectedData}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
            "authorization": `Bearer ${await getCookies("token")}`,
          },
        }
      );
      if (!response.ok) {
        setErrorMessage("Failed to delete service");
        setShowError(true);
        setIsLoading(false);
        return;
      }
      setShowSuccess(true);
      setTimeout(() => router.refresh(), 2000);
    } catch {
      setErrorMessage("An error occurred while deleting the service");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* ── shared modal wrapper ── */
  const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      {children}
    </div>
  );

  const ModalCard = ({
    accentColor, children,
  }: {
    accentColor: string;
    children: React.ReactNode;
  }) => (
    <div style={{
      borderRadius: "24px", padding: "36px",
      background: "#0a0f1e",
      border: `1px solid ${accentColor}`,
      boxShadow: `0 0 60px ${accentColor.replace("0.3", "0.12")}`,
      textAlign: "center", maxWidth: "360px", width: "100%",
      position: "relative", overflow: "hidden",
    }}>
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${accentColor.replace("0.3","0.8")}, transparent)`,
      }} />
      {children}
    </div>
  );

  return (
    <>
      {/* ── Delete Button ── */}
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isLoading}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "10px 16px", borderRadius: "10px",
          background: "rgba(239,68,68,0.07)",
          border: "1px solid rgba(239,68,68,0.25)",
          color: "#ef4444", fontSize: "13px", fontWeight: 600,
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.5 : 1,
          transition: "all 0.2s",
        }}
        onMouseEnter={e => {
          if (!isLoading) {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "rgba(239,68,68,0.14)";
            el.style.boxShadow = "0 0 12px rgba(239,68,68,0.2)";
          }
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(239,68,68,0.07)";
          el.style.boxShadow = "none";
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        {isLoading ? "Deleting..." : "Delete"}
      </button>

      {/* ── Confirm Modal ── */}
      {showConfirm && (
        <Overlay>
          <ModalCard accentColor="rgba(234,179,8,0.3)">
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              background: "rgba(234,179,8,0.1)",
              border: "1px solid rgba(234,179,8,0.3)",
              boxShadow: "0 0 24px rgba(234,179,8,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <h2 style={{
              fontSize: "20px", fontWeight: 900, color: "#eab308",
              margin: "0 0 8px",
              textShadow: "0 0 16px rgba(234,179,8,0.35)",
            }}>
              Delete Service?
            </h2>
            <p style={{
              fontSize: "14px", color: "rgba(255,255,255,0.4)",
              margin: "0 0 28px", lineHeight: 1.65,
            }}>
              Are you sure you want to delete service{" "}
              <span style={{ color: "#ffffff", fontWeight: 700 }}>
                #{selectedData}
              </span>
              ? This action cannot be undone.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex: 1, padding: "12px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
                }}
              >
                Keep it
              </button>
              <button
                onClick={handleConfirmDelete}
                style={{
                  flex: 1, padding: "12px", borderRadius: "12px",
                  background: "#ef4444", color: "#ffffff",
                  fontSize: "14px", fontWeight: 700, border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(239,68,68,0.35)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(239,68,68,0.6)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(239,68,68,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                Delete
              </button>
            </div>
          </ModalCard>
        </Overlay>
      )}

      {/* ── Success Modal ── */}
      {showSuccess && (
        <Overlay>
          <ModalCard accentColor="rgba(74,222,128,0.3)">
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.35)",
              boxShadow: "0 0 24px rgba(74,222,128,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{
              fontSize: "20px", fontWeight: 900, color: "#4ade80",
              margin: "0 0 8px", textShadow: "0 0 16px rgba(74,222,128,0.4)",
            }}>
              Deleted!
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
              The service has been successfully removed from the system.
            </p>
          </ModalCard>
        </Overlay>
      )}

      {/* ── Error Modal ── */}
      {showError && (
        <Overlay>
          <ModalCard accentColor="rgba(239,68,68,0.3)">
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <h2 style={{
              fontSize: "20px", fontWeight: 900, color: "#ef4444", margin: "0 0 8px",
            }}>
              Error Occurred
            </h2>
            <p style={{
              fontSize: "14px", color: "rgba(255,255,255,0.4)",
              margin: "0 0 24px", lineHeight: 1.65,
            }}>
              {errorMessage}
            </p>
            <button
              onClick={() => setShowError(false)}
              style={{
                width: "100%", padding: "12px", borderRadius: "12px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444", fontSize: "14px", fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e =>
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.16)"
              }
              onMouseLeave={e =>
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"
              }
            >
              Got it
            </button>
          </ModalCard>
        </Overlay>
      )}
    </>
  );
}

