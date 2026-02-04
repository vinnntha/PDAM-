import { getCookies } from "@/helper/cookies"

export interface ResponAdminProfile {
  success: boolean
  message: string
  data: Admin
}

export interface Admin {
  id: number
  user_id: number
  name: string
  phone: string
  owner_token: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface User {
  id: number
  username: string
  password: string
  role: string
  owner_token: string
  createdAt: string
  updatedAt: string
}

// Create a fuction to grab data admin profile form BE

async function getCustomerProfile(): Promise<Admin | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admins/me`
    const response = await fetch(url, {
      method: "GET",
      cache: `no-store`,
      headers: {
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        "Authorization": `Bearer ${await getCookies("token")}`
      }
    })

    const responseData: ResponAdminProfile = await response.json()
    if (!response.ok) return null

    return responseData.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export default async function CustomerProfilePage() {
  const customerProfile = await getCustomerProfile()

  if (customerProfile == null) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-pink-100 via-rose-100 to-pink-200">
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/40 text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            You are not logged in
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please sign in to view your profile
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-pink-100 via-rose-100 to-pink-200 flex justify-center p-6">
      <div className="relative w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">

        {/* Decorative blur */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl"></div>

        <div className="relative">
          {/* Header */}
          <div className="flex flex-col items-center text-center border-b border-pink-200 pb-8">
            <div className="w-20 h-20 bg-linear-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <span className="inline-block mt-1 px-4 py-2 text-sm rounded-full bg-linear-to-r from-pink-500 to-rose-500 text-white font-bold shadow-md">
              {customerProfile.user.role.toUpperCase()}
            </span>

            <h1 className="mt-4 text-3xl font-bold text-pink-700">
              {customerProfile.name}
            </h1>

            <span className="mt-2 text-sm px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium">
              Administrator
            </span>
          </div>

          {/* Info */}
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center bg-pink-50 p-6 rounded-2xl border border-pink-200">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-gray-600 font-medium">Username</span>
              </div>
              <span className="font-bold text-gray-800 text-lg">
                {customerProfile.user.username}
              </span>
            </div>

            <div className="flex justify-between items-center bg-pink-50 p-6 rounded-2xl border border-pink-200">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600 font-medium">Phone</span>
              </div>
              <span className="font-bold text-gray-800 text-lg">
                {customerProfile.phone}
              </span>
            </div>

            <div className="flex justify-between items-center bg-pink-50 p-6 rounded-2xl border border-pink-200">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600 font-medium">Member Since</span>
              </div>
              <span className="font-bold text-gray-800 text-lg">
                {new Date(customerProfile.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Menu to service page */}
          <div className="mt-8 text-center">
            <a
              href="/admin/services"
              className="inline-block bg-linear-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl
              hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Manage Services
            </a>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Welcome to PDAM Admin Dashboard 💖
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
