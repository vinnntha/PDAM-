"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookies } from "@/helper/cookies"
import { 
  User, 
  Key, 
  Fingerprint, 
  Phone, 
  MapPin, 
  Layout, 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Loader2,
  Save,
  ShieldCheck,
  ChevronDown
} from "lucide-react"

export default function AddCustomer({ services }: any) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [customerNumber, setCustomerNumber] = useState("")
  const [address, setAddress] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const request = JSON.stringify({
        username,
        password,
        customer_number: customerNumber,
        address,
        service_id: parseInt(serviceId),
        name,
        phone,
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "authorization": `Bearer ${await getCookies("token")}`,
        },
        body: request,
      })

      if (!response.ok) {
        const err = await response.json()
        setErrorMessage(err.message || "Failed to add customer")
        setShowError(true)
        setIsLoading(false)
        return
      }

      setShowSuccess(true)
      setIsLoading(false)
      setTimeout(() => {
        setShowSuccess(false)
        router.push("/admin/customer")
      }, 2000)
    } catch (error) {
      setErrorMessage("Something went wrong. Please check your connection.")
      setShowError(true)
      setIsLoading(false)
    }
  }

  const inputStyle = (fieldName: string) => ({
    width: "100%",
    backgroundColor: focusedField === fieldName ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
    border: focusedField === fieldName ? "1px solid rgba(56,189,248,0.5)" : "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "16px 20px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 500,
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: focusedField === fieldName ? "0 0 20px rgba(56,189,248,0.1)" : "none",
  });

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.5)",
    marginBottom: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0a0f1e", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px", position: "relative", overflow: "hidden",
    }}>
      {/* Background Orbs */}
      <div style={{
        position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
        top: "-150px", left: "-150px",
        background: "rgba(56,189,248,0.07)", filter: "blur(120px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
        bottom: "-100px", right: "-100px",
        background: "rgba(16,185,129,0.05)", filter: "blur(100px)", pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: "800px", position: "relative", zIndex: 10 }}>
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: "none", border: "none", color: "rgba(255,255,255,0.4)",
            cursor: "pointer", marginBottom: "32px", fontSize: "14px", fontWeight: 600,
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "#38bdf8"}
          onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
        >
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ArrowLeft size={18} strokeWidth={2.5} />
          </div>
          Return to Customer List
        </button>

        {/* Form Container */}
        <div style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(24px)",
          borderRadius: "32px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "48px 48px 32px",
            textAlign: "center" as const,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            position: "relative",
          }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(16,185,129,0.2))",
              border: "1px solid rgba(56,189,248,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 10px 30px rgba(56,189,248,0.2)",
            }}>
              <ShieldCheck size={32} style={{ color: "#38bdf8" }} />
            </div>
            <h1 style={{ fontSize: "32px", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Register <span style={{ color: "#38bdf8" }}>New Customer</span>
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
              Complete the profile information to initiate a new service connection.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAddCustomer} style={{ padding: "48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px", marginBottom: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>
                  <User size={14} style={{ color: "#38bdf8" }} />
                  Full Name
                </label>
                <input
                  type="text" required value={name}
                  onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full legal name"
                  style={inputStyle("name")}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>
                  <Fingerprint size={14} style={{ color: "#10b981" }} />
                  National ID (NIK)
                </label>
                <input
                  type="text" required value={customerNumber}
                  onFocus={() => setFocusedField("nik")} onBlur={() => setFocusedField(null)}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  placeholder="16-digit identity number"
                  style={inputStyle("nik")}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>
                   <User size={14} style={{ color: "#38bdf8" }} />
                   Username
                </label>
                <input
                  type="text" required value={username}
                  onFocus={() => setFocusedField("username")} onBlur={() => setFocusedField(null)}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Account identifier"
                  style={inputStyle("username")}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>
                  <Key size={14} style={{ color: "#10b981" }} />
                  Password
                </label>
                <input
                  type="password" required value={password}
                  onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Secure credentials"
                  style={inputStyle("password")}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px", marginBottom: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>
                   <Phone size={14} style={{ color: "#38bdf8" }} />
                   Phone Number
                </label>
                <input
                  type="text" required value={phone}
                  onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xx..."
                  style={inputStyle("phone")}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>
                  <Layout size={14} style={{ color: "#10b981" }} />
                  Service Plan
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    required value={serviceId}
                    onFocus={() => setFocusedField("service")} onBlur={() => setFocusedField(null)}
                    onChange={(e) => setServiceId(e.target.value)}
                    style={{
                      ...inputStyle("service"),
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="" style={{ backgroundColor: "#1e293b" }}>Select assigned plan</option>
                    {services?.map((service: any) => (
                      <option key={service.id} value={service.id} style={{ backgroundColor: "#1e293b" }}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} style={{
                    position: "absolute", right: "20px", top: "50%",
                    transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)",
                    pointerEvents: "none"
                  }} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: "40px" }}>
              <label style={labelStyle}>
                <MapPin size={14} style={{ color: "#10b981" }} />
                Detailed Address
              </label>
              <textarea
                required rows={3} value={address}
                onFocus={() => setFocusedField("address")} onBlur={() => setFocusedField(null)}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full residential or property address"
                style={{
                  ...inputStyle("address"),
                  resize: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
               <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    flex: 1.5,
                    padding: "18px",
                    borderRadius: "18px",
                    background: "linear-gradient(135deg, #0891b2, #10b981)",
                    border: "none",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 800,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    boxShadow: "0 10px 25px rgba(8,145,178,0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    if(!isLoading) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 15px 30px rgba(8,145,178,0.4)";
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(8,145,178,0.3)";
                  }}
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  {isLoading ? "PROVISIONING..." : "REGISTER CUSTOMER"}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/admin/customer")}
                  style={{
                    flex: 1,
                    padding: "18px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                >
                  CANCEL
                </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(10,15,30,0.85)",
          backdropFilter: "blur(18px)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000, padding: "24px"
        }}>
          <div style={{
             backgroundColor: "#0f172a", border: "1px solid rgba(16,185,129,0.3)",
             borderRadius: "32px", padding: "40px", maxWidth: "420px", width: "100%",
             textAlign: "center", boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
          }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px"
            }}>
              <CheckCircle2 size={40} style={{ color: "#10b981" }} />
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "12px" }}>Registration Complete</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: "32px" }}>
              New customer has been successfully integrated. Access will be granted shortly.
            </p>
            <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{
                height: "100%", backgroundColor: "#10b981", borderRadius: "2px",
                width: "100%", animation: "progress 2s linear forwards"
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {showError && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(10,15,30,0.7)",
          backdropFilter: "blur(10px)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000, padding: "24px"
        }}>
          <div style={{
             backgroundColor: "#1e1b1e", border: "1px solid rgba(239,68,68,0.3)",
             borderRadius: "28px", padding: "32px", maxWidth: "400px", width: "100%",
             textAlign: "center"
          }}>
            <XCircle size={48} style={{ color: "#ef4444", margin: "0 auto 20px" }} />
            <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>Action Interrupted</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "24px", lineHeight: 1.5 }}>{errorMessage}</p>
            <button
              onClick={() => setShowError(false)}
              style={{
                width: "100%", padding: "14px", borderRadius: "14px",
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444", fontWeight: 700, cursor: "pointer"
              }}
            >
              CLOSE AND REVIEW
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}