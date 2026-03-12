"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Customer } from "./page"
import { getCookies } from "@/helper/cookies"

interface Service {
  id: number
  name: string
}

type Props = {
  customer: Customer
  services: Service[]
}

export default function EditCustomer({ customer, services }: Props) {

  const [customerNumber, setCustomerNumber] = useState(customer.customer_number)
  const [address, setAddress] = useState(customer.address)
  const [serviceId, setServiceId] = useState(customer.service_id)
  const [name, setName] = useState(customer.name)
  const [phone, setPhone] = useState(customer.phone)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const handleEditCustomer = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/customers/${customer.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
            "Authorization": `Bearer ${await getCookies("token")}`
          },
          body: JSON.stringify({
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
        setErrorMessage(err.message || "Failed to edit customer")
        setShowError(true)
        return
      }

      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false);
        router.push('/admin/customer');
      }, 2000)

    } catch (error) {
      setErrorMessage("Something went wrong")
      setShowError(true)
    }
  }

  return (
    <div className="w-full min-h-dvh 
    bg-linear-to-br from-pink-100 via-rose-100 to-pink-200
    flex items-center justify-center p-6">

      <div className="relative w-full max-w-lg 
      bg-white/70 backdrop-blur-xl
      rounded-2xl shadow-xl border border-white/40
      p-8">

        <div className="absolute -top-16 -right-16 w-48 h-48 
        bg-pink-300/40 rounded-full blur-3xl"></div>

        <div className="relative">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-700">
              Edit Customer
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Update customer details below
            </p>
          </div>

          <form onSubmit={handleEditCustomer} className="space-y-6">

            <Input label="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />

            <Input label="Customer Number (NIK)"
              value={customerNumber}
              onChange={(e)=>setCustomerNumber(e.target.value)}
            />

            <Input label="Phone Number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />

            <Input label="Address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            />

            <div className="flex flex-col gap-2 text-sm">
              <label className="text-gray-700 font-medium">Service</label>

              <select
                value={serviceId}
                onChange={(e)=>setServiceId(Number(e.target.value))}
                className="px-4 py-3 rounded-xl
                bg-white/90 border border-pink-200
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              >
                <option value="">Select Service</option>

                {services.map((service)=>(
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
              Customer Edited! 🎉
            </h2>
            <p className="text-gray-600">
              Customer details updated successfully.
            </p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4">
            <h2 className="text-2xl font-bold text-red-700 mb-2">
              Failed to Edit Customer
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
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
}) {

  return (
    <div className="flex flex-col gap-2 text-sm">
      <label className="text-gray-700 font-medium">{label}</label>

      <input
        {...props}
        className="px-4 py-3 rounded-xl
        bg-white/90 border border-pink-200
        focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
        text-gray-800 transition-all duration-200"
      />
    </div>
  )
}