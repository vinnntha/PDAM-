"use client"

import { getCookies } from "@/helper/cookies"
import { useRouter } from "next/dist/client/components/navigation"
import { useState } from "react"

export default function AddPage() {
  const [ServiceName, setServiceName] = useState("")
  const [MinUsage, setMinUsage] = useState("")
  const [MaxUsage, setMaxUsage] = useState("")
  const [Price, setPrice] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  async function handleAddService(e: React.FormEvent) {
    e.preventDefault()
    try {
      const request = JSON.stringify({
        name: ServiceName,
        min_usage: parseInt(MinUsage) || 0,
        max_usage: parseInt(MaxUsage) || 0,
        price: parseInt(Price) || 0,
      })

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "authorization": `Bearer ${await getCookies("token")}`,
        },
        body: request,
      })
      console.log(request)
      
      if (!response.ok) {
        setErrorMessage("Failed to add service")
        setShowError(true)
        console.error("ADD SERVICE ERROR:", response.status, await response.text())
        return
      }

      setShowSuccess(true)
    } catch (error) {
      console.error("Error during adding service:", error)
    }
  }

  return (
    <div
      className="w-full min-h-dvh 
      bg-linear-to-br from-pink-100 via-rose-100 to-pink-200
      flex items-center justify-center p-6"
    >
      <div
        className="relative w-full max-w-lg 
        bg-white/70 backdrop-blur-xl
        rounded-2xl shadow-xl border border-white/40
        p-8"
      >
        {/* Decorative blur */}
        <div className="absolute -top-16 -right-16 w-48 h-48 
            bg-pink-300/40 rounded-full blur-3xl"></div>

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-700">
              Add New Service
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Configure your service details below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAddService} className="space-y-6">
            <Input
              label="Service Name"
              placeholder="e.g., Internet Package"
              value={ServiceName}
              onChange={(e) => setServiceName(e.target.value)}
              icon={
                <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Min Usage"
                type="number"
                placeholder="0"
                value={MinUsage}
                onChange={(e) => setMinUsage(e.target.value)}
                icon={
                  <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              />
              <Input
                label="Max Usage"
                type="number"
                placeholder="0"
                value={MaxUsage}
                onChange={(e) => setMaxUsage(e.target.value)}
                icon={
                  <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
            </div>

            <Input
              label="Price (Rp)"
              type="number"
              placeholder="0"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              icon={
                <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl
              bg-linear-to-r from-pink-500 to-rose-500
              text-white font-semibold text-lg
              hover:opacity-90 active:scale-[0.98]
              transition shadow-lg"
            >
              Save Service
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4 animate-bounce">
            <div className="w-16 h-16 bg-linear-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-pink-700 mb-2">Service Added! 🎉</h2>
            <p className="text-gray-600">Your new service has been created successfully.</p>
            router.push('/admin/services')
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
            <h2 className="text-2xl font-bold text-red-700 mb-2">Failed to Add Service</h2>
            <p className="text-gray-600">{errorMessage}</p>
            <button
              onClick={() => setShowError(false)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* Reusable input component */
function Input({
  label,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label className="text-gray-700 font-medium">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`px-1.1 py-3 rounded-xl
          bg-white/90 border border-pink-200
          focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
          text-gray-800 transition-all duration-200
          ${icon ? 'pl-12' : ''}`}
        />
      </div>
    </div>
  )
}