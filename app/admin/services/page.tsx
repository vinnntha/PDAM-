import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import Search from "./search"
import DropServiceButton from "./drop"
import { Plus, Zap, Settings, Info, Package, Filter, Search as SearchIcon } from "lucide-react"

export interface ServiceResponse {
  success: boolean
  message: string
  data: ServiceType[]
  count: number
}

export interface ServiceType {
  id: number
  name: string
  min_usage: number
  max_usage: number
  price: number
  owner_token: string
  createdAt: string
  updatedAt: string
}

async function getServices(): Promise<ServiceResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services`, {
      method: "GET",
      headers: {
        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        "Authorization": `Bearer ${await getCookies("token")}`,
      },
      next: { revalidate: 0 },
    })
    const data: ServiceResponse = await response.json()
    if (!response.ok) return { success: false, message: data.message, data: [], count: 0 }
    return data
  } catch {
    return { success: false, message: "Failed to fetch service", data: [], count: 0 }
  }
}

type PageProps = { searchParams: Promise<{ search: string }> }

export default async function ServicePage(props: PageProps) {
  const { search } = await props.searchParams
  const { success, message, data, count } = await getServices()

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

  const filteredData = search && search.trim() !== ""
    ? data.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    : data
  const displayCount = filteredData.length

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0a0f1e",
      color: "#ffffff", position: "relative", overflow: "hidden",
    }}>
      {/* Orbs */}
      <div style={{
        position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
        top: "-120px", right: "-120px",
        background: "rgba(56,189,248,0.09)", filter: "blur(110px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "450px", height: "450px", borderRadius: "50%",
        bottom: "-100px", left: "-100px",
        background: "rgba(74,222,128,0.07)", filter: "blur(100px)", pointerEvents: "none",
      }} />
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `linear-gradient(#00e5ff 1px,transparent 1px),linear-gradient(90deg,#00e5ff 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        position: "relative", zIndex: 10,
        padding: "40px 48px", maxWidth: "1280px", margin: "0 auto",
      }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "50px", height: "50px", borderRadius: "14px",
              background: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.25)",
              boxShadow: "0 0 20px rgba(56,189,248,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Zap size={22} style={{ color: "#38bdf8" }} />
            </div>
            <div>
              <h1 style={{
                fontSize: "clamp(24px,4vw,36px)", fontWeight: 900,
                color: "#38bdf8", margin: 0, letterSpacing: "-0.02em",
                textShadow: "0 0 24px rgba(56,189,248,0.3)",
              }}>
                Service Management
              </h1>
              <p style={{
                fontSize: "13px", color: "rgba(255,255,255,0.4)",
                margin: "4px 0 0", display: "flex", alignItems: "center", gap: "6px",
              }}>
                <Package size={13} style={{ color: "#4ade80" }} />
                {displayCount} active services currently available
              </p>
            </div>
          </div>

          <Link href="/admin/services/add" style={{ textDecoration: "none" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "12px 24px", borderRadius: "12px",
              background: "#38bdf8", color: "#0a0f1e",
              fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer",
              boxShadow: "0 0 20px rgba(56,189,248,0.4)", transition: "all 0.2s",
            }}>
              <Plus size={16} />
              Add New Service
            </button>
          </Link>

        </div>

        {/* ── Main Card ── */}
        <div style={{
          borderRadius: "24px", padding: "32px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(74,222,128,0.18)",
          marginBottom: "24px", position: "relative", overflow: "hidden",
        }}>
          {/* Top accent */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, #38bdf8, #4ade80, transparent)",
          }} />

          {/* Search */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px",
            }}>
              <Filter size={16} style={{ color: "#4ade80" }} />
              <h2 style={{
                fontSize: "13px", fontWeight: 700, color: "#4ade80",
                textTransform: "uppercase", letterSpacing: "0.1em", margin: 0,
              }}>
                Filter Services
              </h2>
            </div>
            <Search search={search} />
          </div>

          {/* Empty state */}
          {displayCount === 0 ? (
            <div style={{
              padding: "64px 24px", textAlign: "center",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <SearchIcon size={28} style={{ color: "rgba(255,255,255,0.2)" }} />
              </div>
              <h3 style={{
                fontSize: "20px", fontWeight: 700,
                color: "rgba(255,255,255,0.6)", margin: "0 0 8px",
              }}>
                No Services Found
              </h3>
              <p style={{
                fontSize: "14px", color: "rgba(255,255,255,0.3)",
                maxWidth: "380px", margin: "0 auto", lineHeight: 1.7,
              }}>
                {search?.trim()
                  ? `No service matches "${search}". Try a different keyword.`
                  : "No services yet. Click 'Add New Service' to get started."}
              </p>
            </div>
          ) : (
            /* ── Service Cards Grid ── */
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}>
              {filteredData.map(service => (
                <div
                  key={service.id}
                  style={{
                    borderRadius: "20px", padding: "24px",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(56,189,248,0.18)",
                    position: "relative", overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  className="hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(56,189,248,0.1)] transition-all duration-300"
                >
                  {/* Card top accent */}
                  <div style={{
                    position: "absolute", top: 0, left: "20px", right: "20px", height: "1px",
                    background: "linear-gradient(90deg, #38bdf850, transparent)",
                  }} />

                  {/* Card header */}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: "20px",
                  }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "12px",
                      background: "rgba(56,189,248,0.08)",
                      border: "1px solid rgba(56,189,248,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Settings size={18} style={{ color: "#38bdf8" }} />
                    </div>
                    <div style={{
                      padding: "3px 10px", borderRadius: "999px",
                      background: "rgba(74,222,128,0.08)",
                      border: "1px solid rgba(74,222,128,0.25)",
                      fontSize: "10px", fontWeight: 700,
                      color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em",
                    }}>
                      Active
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: "16px", fontWeight: 700,
                    color: "#ffffff", margin: "0 0 16px",
                  }}>
                    {service.name}
                  </h3>

                  {/* Stats */}
                  <div style={{ marginBottom: "20px" }}>
                    {[
                      { label: "Min Usage", value: `${service.min_usage} m³` },
                      { label: "Max Usage", value: `${service.max_usage} m³` },
                    ].map(item => (
                      <div key={item.label} style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", padding: "8px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        fontSize: "13px",
                      }}>
                        <span style={{ color: "rgba(255,255,255,0.35)" }}>{item.label}</span>
                        <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{item.value}</span>
                      </div>
                    ))}
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", paddingTop: "12px",
                    }}>
                      <span style={{
                        fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.3)",
                        textTransform: "uppercase", letterSpacing: "0.1em",
                      }}>
                        Base Price
                      </span>
                      <span style={{
                        fontSize: "18px", fontWeight: 900,
                        color: "#4ade80",
                        textShadow: "0 0 12px rgba(74,222,128,0.4)",
                      }}>
                        Rp {service.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Link
                      href={`/admin/services/edit/${service.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300"
                    >
                      <svg className="h-4 w-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <DropServiceButton selectedData={service.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer Stats ── */}
        <div style={{
          borderRadius: "16px", padding: "16px 24px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Info size={16} style={{ color: "#38bdf8" }} />
            </div>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
              Displaying{" "}
              <span style={{ color: "#ffffff", fontWeight: 700 }}>{displayCount}</span>
              {" "}of{" "}
              <span style={{ color: "#ffffff", fontWeight: 700 }}>{count}</span>
              {" "}services
            </span>
          </div>
          {search?.trim() && (
            <div style={{
              padding: "6px 14px", borderRadius: "10px",
              background: "rgba(56,189,248,0.06)",
              border: "1px solid rgba(56,189,248,0.18)",
              fontSize: "12px", color: "rgba(255,255,255,0.4)",
            }}>
              Filtering by:{" "}
              <span style={{ color: "#38bdf8", fontWeight: 700 }}>"{search}"</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}