"use client"

import { getCookies } from "@/helper/cookies";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import { Trash2, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function DropCustomerButton({
    selectedData
}: {
    selectedData: number
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirm(false);
        setIsLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customers/${selectedData}`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "authorization": `Bearer ${await getCookies("token")}`,
                },
            })
            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data?.message || "Failed to delete customer. Please try again later.");
                setShowError(true);
                return
            }
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                router.refresh();
            }, 2000);

        }
        catch (error) {
            console.error("Error during deleting customers:", error)
            setErrorMessage("An unexpected error occurred while deleting the customer");
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleDeleteClick}
                disabled={isLoading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 16px",
                    backgroundColor: isHovered ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.06)",
                    color: "#ef4444",
                    fontSize: "14px",
                    fontWeight: 700,
                    borderRadius: "12px",
                    border: isHovered ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(239,68,68,0.15)",
                    transition: "all 0.3s ease",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.6 : 1,
                    flex: 1
                }}
            >
                {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <Trash2 size={16} />
                )}
                <span>Delete</span>
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: "20px"
                }}>
                    <div style={{
                        backgroundColor: "rgba(18,26,46,0.95)",
                        borderRadius: "32px",
                        padding: "40px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        maxWidth: "400px",
                        width: "100%",
                        textAlign: "center",
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                            background: "linear-gradient(90deg, transparent, #eab308, transparent)"
                        }} />
                        
                        <div style={{
                            width: "70px", height: "70px",
                            borderRadius: "22px",
                            background: "rgba(234,179,8,0.1)",
                            border: "1px solid rgba(234,179,8,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 24px"
                        }}>
                            <AlertTriangle size={32} style={{ color: "#eab308" }} />
                        </div>
                        
                        <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>
                            Confirm Deletion
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", margin: "0 0 32px", lineHeight: 1.6 }}>
                            Are you sure you want to delete this customer record? This action is permanent and cannot be undone.
                        </p>
                        
                        <div style={{ display: "flex", gap: "12px" }}>
                            <button
                                onClick={() => setShowConfirm(false)}
                                style={{
                                    flex: 1, padding: "16px", borderRadius: "16px",
                                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#fff", fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                                onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                style={{
                                    flex: 1, padding: "16px", borderRadius: "16px",
                                    background: "#ef4444", border: "none",
                                    color: "#fff", fontWeight: 700, cursor: "pointer",
                                    boxShadow: "0 0 20px rgba(239,68,68,0.3)"
                                }}
                            >
                                Delete Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Overlay */}
            {showSuccess && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1100
                }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{
                            width: "80px", height: "80px",
                            borderRadius: "50%",
                            background: "rgba(16,185,129,0.1)",
                            border: "2px solid #10b981",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 24px",
                            animation: "scaleIn 0.5s ease-out"
                        }}>
                            <CheckCircle size={40} style={{ color: "#10b981" }} />
                        </div>
                        <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>
                            Success!
                        </h2>
                        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)" }}>
                            The customer record has been permanently removed.
                        </p>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {showError && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1100,
                    padding: "20px"
                }}>
                    <div style={{
                        backgroundColor: "#1a1f2e",
                        borderRadius: "28px",
                        padding: "32px",
                        border: "1px solid rgba(239,68,68,0.2)",
                        maxWidth: "400px",
                        width: "100%",
                        textAlign: "center"
                    }}>
                        <XCircle size={48} style={{ color: "#ef4444", margin: "0 auto 20px" }} />
                        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>
                            Action Failed
                        </h2>
                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>
                            {errorMessage}
                        </p>
                        <button
                            onClick={() => setShowError(false)}
                            style={{
                                width: "100%", padding: "14px", borderRadius: "14px",
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                color: "#fff", fontWeight: 700, cursor: "pointer"
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </> 
    )
}
