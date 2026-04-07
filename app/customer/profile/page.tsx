import { getCookies } from "@/helper/cookies";
import Link from "next/link";
import { User, Hash, Phone, MapPin, Calendar, ArrowRight, FileText, Droplet } from "lucide-react";

export interface ResponseCustomerProfile {
  success: boolean;
  message: string;
  data: Customer;
}

export interface Customer {
  id: number;
  user_id: number;
  customer_number: string;
  name: string;
  phone: string;
  address: string;
  service_id: number;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
  user: UserProfile;
}

export interface UserProfile {
  id: number;
  username: string;
  password: string;
  role: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}

async function getCustomerProfile(): Promise<Customer | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customers/me`;
    const appKey = (process.env.NEXT_PUBLIC_APP_KEY || "").trim();
    const token = await getCookies("token");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "app-key": appKey,
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log(`Customer Profile Fetch Status: ${response.status}`);
    const responseData: ResponseCustomerProfile = await response.json();
    
    if (!response.ok) {
      console.log("Customer Profile Fetch Failed:", responseData.message);
      return null;
    }
    return responseData.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function ProfilePage() {
  const customerProfile = await getCustomerProfile();

  if (customerProfile == null) {
    return (
      <div style={{
        minHeight: "100vh", width: "100%",
        backgroundColor: "#0a0f1e",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", position: "relative",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          padding: "40px", borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center", maxWidth: "400px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4ade80", marginBottom: "12px" }}>
            Profile Not Found
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "24px" }}>
            We couldn't retrieve your customer profile at this moment.
          </p>
          <Link href="/sign-in" style={{
            display: "inline-block", padding: "12px 24px",
            background: "#4ade80", color: "#0a0f1e",
            borderRadius: "12px", fontWeight: 700, textDecoration: "none",
          }}>
            Back to Sign In
          </Link>
        </div>
        <style>{`
          .view-bills-btn:hover {
            transform: translateY(-2px) scale(1.02) !important;
            box-shadow: 0 15px 30px rgba(74,222,128,0.4) !important;
            filter: brightness(1.1);
          }
          .view-bills-btn:active {
            transform: translateY(0) scale(0.98) !important;
          }
        `}</style>
      </div>
    );
  }

  const joinDate = new Date(customerProfile.createdAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      backgroundColor: "#0a0f1e",
      padding: "60px 24px", position: "relative", overflow: "hidden",
    }}>
      {/* ── Background Effects ── */}
      <div style={{
        position: "absolute", width: "600px", height: "600px",
        borderRadius: "50%", top: "-200px", left: "-200px",
        background: "rgba(56,189,248,0.12)", filter: "blur(120px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%", bottom: "-150px", right: "-150px",
        background: "rgba(74,222,128,0.08)", filter: "blur(100px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px),
          linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* ── Main Layout Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "32px", alignItems: "start" }}>
          
          {/* Sidebar: Profile Summary */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            borderRadius: "28px", border: "1px solid rgba(255,255,255,0.05)",
            padding: "40px 32px", textAlign: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          }}>
            <div style={{
              width: "120px", height: "120px", borderRadius: "40px",
              background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(74,222,128,0.15))",
              border: "1px solid rgba(56,189,248,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 15px 35px rgba(56,189,248,0.15)",
            }}>
              <span style={{ fontSize: "44px", fontWeight: 900, color: "#38bdf8", textShadow: "0 0 20px rgba(56,189,248,0.5)" }}>
                {customerProfile.name?.charAt(0)}
              </span>
            </div>
            
            <h1 style={{ fontSize: "24px", fontWeight: 900, color: "#ffffff", margin: 0, letterSpacing: "-0.01em" }}>
              {customerProfile.name}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginTop: "8px", marginBottom: "20px" }}>
              Customer User
            </p>
            
            <div style={{
              padding: "12px", borderRadius: "16px",
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.15)",
              display: "flex", flexDirection: "column", gap: "4px",
            }}>
              <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#38bdf8", letterSpacing: "0.1em" }}>
                ID Pelanggan
              </span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", fontFamily: "monospace" }}>
                {customerProfile.customer_number}
              </span>
            </div>

            <div style={{ marginTop: "32px" }}>
               <Link href="/customer/bills" 
                 className="view-bills-btn"
                 style={{
                   display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                   width: "100%", padding: "16px", borderRadius: "16px",
                   background: "#4ade80", color: "#0a0f1e", fontWeight: 800,
                   textDecoration: "none", transition: "all 0.3s ease",
                   boxShadow: "0 10px 25px rgba(74,222,128,0.25)",
                 }}
               >
                 <FileText size={18} />
                 View My Bills
                 <ArrowRight size={16} />
               </Link>
            </div>
          </div>

          {/* Main Content: Detailed Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            <div style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(20px)",
              borderRadius: "28px", border: "1px solid rgba(255,255,255,0.05)",
              padding: "40px",
            }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "24px", background: "#38bdf8", borderRadius: "4px" }} />
                Account Information
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <DetailItem 
                  label="Username" 
                  value={customerProfile?.user?.username || customerProfile?.name || "N/A"} 
                  icon={<User size={18} />} 
                  color="#38bdf8" 
                />
                <DetailItem label="Phone Connection" value={customerProfile.phone} icon={<Phone size={18} />} color="#4ade80" />
                <DetailItem label="Service Address" value={customerProfile.address} icon={<MapPin size={18} />} color="#fbbf24" fullWidth />
                <DetailItem label="Registered Since" value={joinDate} icon={<Calendar size={18} />} color="#f472b6" fullWidth />
              </div>
            </div>

            {/* Service Status Mini Card */}
            <div style={{
              background: "linear-gradient(90deg, rgba(56,189,248,0.1), transparent)",
              borderRadius: "20px", border: "1px solid rgba(56,189,248,0.15)",
              padding: "24px 32px", display: "flex", alignItems: "center", gap: "20px",
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#38bdf8",
              }}>
                <Droplet size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>Active Connection</h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>Your water service is currently operational and monitoring usage.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "60px", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>
            Terima kasih telah menggunakan layanan PDAM Baru • 2024
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon, color, fullWidth = false }: any) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderRadius: "20px", border: "1px solid rgba(255,255,255,0.04)",
      padding: "24px", gridColumn: fullWidth ? "span 2" : "span 1",
      display: "flex", alignItems: "flex-start", gap: "16px",
    }}>
      <div style={{
        width: "40px", height: "40px", borderRadius: "12px",
        background: color + "15", border: "1px solid " + color + "33",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: color, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", marginBottom: "6px" }}>
          {label}
        </div>
        <div style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", lineHeight: "1.4" }}>
          {value}
        </div>
      </div>
    </div>
  );
}