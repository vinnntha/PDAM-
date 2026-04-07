import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import Search from "./search"
import DropCustomerButton from "./drop"
import { Plus, User, MapPin, Phone, Hash, Filter, Search as SearchIcon, Info, Users } from "lucide-react"

export const dynamic = "force-dynamic"

export interface CustomersResponse {
  success: boolean
  message: string
  data: CustomerData[]
  count: number
}

export interface CustomerData {
  id: number
  user_id: number
  customer_number: string
  name: string
  phone: string
  address: string
  service_id: number
  owner_token: string
  createdAt: string
  updatedAt: string
  user: UserData
  service: ServiceData
}

export interface UserData {
  id: number
  username: string
  password: string
  role: string
  owner_token: string
  createdAt: string
  updatedAt: string
}

export interface ServiceData {
  id: number
  name: string
  min_usage: number
  max_usage: number
  price: number
  owner_token: string
  createdAt: string
  updatedAt: string
}

// fetch customers
async function getCustomers(): Promise<CustomersResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "Authorization": `Bearer ${await getCookies("token")}`
        }
      }
    )

    if (!response.ok) {
      const data = await response.json()
      return {
        success: false,
        message: data?.message || "Failed to fetch customers",
        data: [],
        count: 0
      }
    }

    return await response.json()
  } catch {
    return {
      success: false,
      message: "Failed to fetch customers",
      data: [],
      count: 0
    }
  }
}

export default async function customersPage(props: {
  searchParams: Promise<{ search: string }>
}) {
  const { search } = await props.searchParams
  const { success, message, data, count } = await getCustomers()

  if (!success) {
    return (
      <div style={{
        minHeight: "100vh", backgroundColor: "#0a0f1e",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", color: "#fff",
      }}>
        <div style={{
          borderRadius: "20px", padding: "40px",
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.2)",
          maxWidth: "400px", width: "100%", textAlign: "center",
        }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <Info size={24} style={{ color: "#ef4444" }} />
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#ef4444", margin: "0 0 8px" }}>
            Fetch Error
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>
            {message}
          </p>
          <Link href="/admin/profile" style={{
            display: "inline-block", padding: "10px 24px",
            borderRadius: "10px", background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)", fontSize: "13px",
            fontWeight: 600, textDecoration: "none",
          }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const filteredData =
    search && search.trim() !== ""
      ? data.filter(customer =>
        customer.name.toLowerCase().includes(search.toLowerCase())
      )
      : data

  const displayCount = filteredData.length

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0a0f1e",
      color: "#ffffff", position: "relative", overflow: "hidden",
    }}>
      {/* Background Orbs */}
      <div style={{
        position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
        top: "-150px", right: "-150px",
        background: "rgba(56,189,248,0.08)", filter: "blur(120px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
        bottom: "-100px", left: "-100px",
        background: "rgba(16,185,129,0.06)", filter: "blur(100px)", pointerEvents: "none",
      }} />
      
      {/* Grid Overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div style={{ position: "relative", zIndex: 10, padding: "40px 48px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "44px", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{
              width: "54px", height: "54px", borderRadius: "16px",
              background: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(56,189,248,0.15)",
            }}>
              <Users size={24} style={{ color: "#38bdf8" }} />
            </div>
            <div>
              <h1 style={{
                fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900,
                color: "#38bdf8", margin: 0, letterSpacing: "-0.02em",
                textShadow: "0 0 24px rgba(56,189,248,0.3)",
              }}>
                Customer Database
              </h1>
              <p style={{
                fontSize: "13px", color: "rgba(255,255,255,0.4)",
                margin: "6px 0 0", display: "flex", alignItems: "center", gap: "6px",
              }}>
                <Hash size={14} style={{ color: "#38bdf8" }} />
                {displayCount} identified customers registered
              </p>
            </div>
          </div>

          <Link
            href="/admin/customer/add"
            className="group relative flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Plus className="w-5 h-5" />
            <span>Register New Customer</span>
          </Link>
        </div>

        {/* Search Container */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          borderRadius: "24px", padding: "32px",
          border: "1px solid rgba(74,222,128,0.18)",
          marginBottom: "32px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, #38bdf8, #4ade80, transparent)",
          }} />
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <Filter size={16} style={{ color: "#4ade80" }} />
            <h2 style={{
              fontSize: "13px", fontWeight: 700, color: "#4ade80",
              textTransform: "uppercase", letterSpacing: "0.1em", margin: 0,
            }}>
              Customer Filter
            </h2>
          </div>
          <Search search={search} />
        </div>

        {/* Grid Content */}
        {displayCount === 0 ? (
          <div style={{
            padding: "80px 24px", textAlign: "center",
            borderRadius: "32px", background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <SearchIcon size={32} style={{ color: "rgba(255,255,255,0.2)" }} />
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "rgba(255,255,255,0.7)", margin: "0 0 10px" }}>
              Search Yielded No Results
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
              {search && search.trim() !== ''
                ? `Zero matches for "${search}". Verify the spelling or attempt a broader query.`
                : "The customer database is currently empty. Initiate your first registration."}
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}>
            {filteredData.map(customer => (
              <div
                key={customer.id}
                style={{
                  borderRadius: "24px", padding: "28px",
                  background: "rgba(255,255,255,0.028)",
                  border: "1px solid rgba(56,189,248,0.18)",
                  position: "relative", overflow: "hidden",
                }}
                className="hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(56,189,248,0.08)] transition-all duration-300 group"
              >
                {/* Accent stripe */}
                <div style={{
                  position: "absolute", top: 0, left: "24px", right: "24px", height: "1px",
                  background: "linear-gradient(90deg, #38bdf850, transparent)",
                }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "14px",
                    background: "rgba(56,189,248,0.08)",
                    border: "1px solid rgba(56,189,248,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <User size={20} style={{ color: "#38bdf8" }} />
                  </div>
                  <div style={{
                    padding: "4px 12px", borderRadius: "999px",
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    fontSize: "10px", fontWeight: 800,
                    color: "#10b981", textTransform: "uppercase", letterSpacing: "0.12em",
                  }}>
                    #{customer.customer_number}
                  </div>
                </div>

                <h3 style={{
                  fontSize: "19px", fontWeight: 800,
                  color: "#ffffff", margin: "0 0 16px",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                }} className="group-hover:text-cyan-400 transition-colors">
                  {customer.name}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <Phone size={14} style={{ color: "rgba(255,255,255,0.3)", marginTop: "3px" }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Phone</span>
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{customer.phone || "—"}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <MapPin size={14} style={{ color: "rgba(255,255,255,0.3)", marginTop: "3px" }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Address</span>
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {customer.address || "—"}
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "8px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Service Plan</span>
                     <span style={{ 
                       padding: "3px 8px", borderRadius: "6px",
                       background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)",
                       fontSize: "11px", fontWeight: 700, color: "#38bdf8"
                     }}>
                        {customer.service?.name || "Standard"}
                     </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", position: "relative", zIndex: 20 }}>
                  <Link
                    href={`/admin/customer/edit/${customer.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300"
                  >
                    <svg className="h-4 w-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                  <DropCustomerButton selectedData={customer.id} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Statistics */}
        <div style={{
          borderRadius: "20px", padding: "20px 28px",
          background: "rgba(255,255,255,0.015)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Info size={18} style={{ color: "#38bdf8" }} />
            </div>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
              Displaying <span style={{ color: "#ffffff", fontWeight: 700 }}>{displayCount}</span> of <span style={{ color: "#ffffff", fontWeight: 700 }}>{count}</span> total records
            </span>
          </div>
          {search?.trim() && (
            <div style={{
              padding: "7px 16px", borderRadius: "12px",
              background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.15)",
              fontSize: "12px", color: "rgba(255,255,255,0.3)"
            }}>
              Filtering by keyword: <span style={{ color: "#38bdf8", fontWeight: 800 }}>"{search}"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
