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
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.15)] border border-cyan-500/30 text-center">
          <h2 className="text-lg font-semibold text-slate-200">
            You are not logged in
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Please sign in to view your profile
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 flex justify-center p-6">
      <div className="relative w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.15)] border border-cyan-500/20 p-8 overflow-hidden">

        {/* Decorative blur */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-[80px]"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center border-b border-cyan-900/50 pb-8">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-500/50">
              <svg className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <span className="inline-block mt-1 px-4 py-2 text-sm rounded-full bg-cyan-950/50 border border-cyan-500/50 text-cyan-400 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)] tracking-wider">
              {customerProfile.user.role.toUpperCase()}
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {customerProfile.name}
            </h1>

            <span className="mt-2 text-sm px-4 py-2 rounded-full bg-emerald-950/40 text-emerald-400 font-medium border border-emerald-500/30">
              Administrator
            </span>
          </div>

          {/* Info */}
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-cyan-900/50 hover:border-cyan-500/50 transition-colors duration-300 shadow-inner overflow-hidden relative group">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <svg className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-slate-400 font-medium">Username</span>
              </div>
              <span className="font-bold text-slate-200 text-lg relative z-10">
                {customerProfile.user.username}
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-cyan-900/50 hover:border-cyan-500/50 transition-colors duration-300 shadow-inner relative group overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <svg className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-slate-400 font-medium">Phone</span>
              </div>
              <span className="font-bold text-slate-200 text-lg relative z-10">
                {customerProfile.phone}
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-cyan-900/50 hover:border-cyan-500/50 transition-colors duration-300 shadow-inner relative group overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <svg className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-slate-400 font-medium">Member Since</span>
              </div>
              <span className="font-bold text-slate-200 text-lg relative z-10">
                {new Date(customerProfile.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action Menus */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/admin/services"
              className="inline-block bg-linear-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-2xl
              hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-bold text-lg shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transform hover:-translate-y-1 flex-1 text-center border border-cyan-400/30"
            >
              Manage Services
            </a>
            <a
              href="/admin/customer"
              className="inline-block bg-linear-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl
              hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 font-bold text-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transform hover:-translate-y-1 flex-1 text-center border border-emerald-400/30"
            >
              Manage Customer
            </a>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Welcome to PDAM Admin Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
