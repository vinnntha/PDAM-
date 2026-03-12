"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookies } from "@/helper/cookies"

export default function AddCustomer({ services }: any) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [customerNumber, setCustomerNumber] = useState("")
  const [address, setAddress] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
            "Authorization": `Bearer ${await getCookies("token")}`
          },
          body: JSON.stringify({
            username,
            password,
            customer_number: customerNumber,
            address,
            service_id: Number(serviceId),
            name,
            phone,
          }),
        }
      )

      if (!response.ok) {
        const err = await response.json()
        setErrorMessage(err.message || "Failed to add customer")
        setShowError(true)
        return
      }

      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false);
        router.push('/admin/customer')
      }, 2000)

    } catch (error) {
      setErrorMessage("Something went wrong")
      setShowError(true)
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
        <div className="absolute -top-16 -right-16 w-48 h-48 
            bg-pink-300/40 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-700">
              Add New Customer
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Fill customer details below
            </p>
          </div>

          <form onSubmit={handleAddCustomer} className="space-y-6">

            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a4 4 0 01-8 0M15 7a4 4 0 00-8 0m11.39 4.61A7.5 7.5 0 0012 4.5a7.5 7.5 0 00-4.39 13.11" /></svg>}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
            />

            <Input
              label="Customer Number (NIK)"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              icon={<svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>}
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
            />
            <Input
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              icon={<svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />

            <div className="flex flex-col gap-2 text-sm">
              <label className="text-gray-700 font-medium">Service</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl
                bg-white/90 border border-pink-200
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                text-gray-800 transition-all duration-200"
              >
                <option value="">Select Service</option>
                {services?.map((service: any) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl
              bg-linear-to-r from-pink-500 to-rose-500
              text-white font-semibold text-lg
              hover:opacity-90 active:scale-[0.98]
              transition shadow-lg"
            >
              Save Customer
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4 animate-bounce">
            <h2 className="text-2xl font-bold text-pink-700 mb-2">
              Customer Added! 🎉
            </h2>
            <p className="text-gray-600">
              New customer created successfully.
            </p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4">
            <h2 className="text-2xl font-bold text-red-700 mb-2">
              Failed to Add Customer
            </h2>
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
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full px-4 py-3 rounded-xl
          bg-white/90 border border-pink-200
          focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
          text-gray-800 transition-all duration-200
          ${icon ? 'pl-12' : 'pl-4'}`}
        />
      </div>
    </div>
  )
}