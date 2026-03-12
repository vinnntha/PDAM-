"use client"
import { getCookies } from "@/helper/cookies";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";


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
                setErrorMessage("Failed to delete customer");
                setShowError(true);
                console.error("DELETE customer ERROR:", response.status, await response.text())
                setIsLoading(false);
                return
            }
            setShowSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        }
        catch (error) {
            console.error("Error during deleting customers:", error)
            setErrorMessage("An error occurred while deleting the customers");
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
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 disabled:opacity-50 transition"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {isLoading ? "Deleting..." : "Delete"}
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-yellow-700 mb-2">Confirm Delete</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this customer? This action cannot be undone.</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4 animate-bounce">
                        <div className="w-16 h-16 bg-linear-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-pink-700 mb-2">Customer Deleted! 🗑️</h2>
                        <p className="text-gray-600">The customer has been successfully removed.</p>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {showError && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-red-700 mb-2">Delete Failed</h2>
                        <p className="text-gray-600">{errorMessage}</p>
                        <button
                            onClick={() => setShowError(false)}
                            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
