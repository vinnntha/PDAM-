import { getCookies } from "@/helper/cookies";
import Link from "next/link";
import { Shield, User, Phone, Calendar, Activity, Users, FileText, Droplet } from "lucide-react";

export interface ResponAdminProfile {
  success: boolean;
  message: string;
  data: Admin;
}

export interface Admin {
  id: number;
  user_id: number;
  name: string;
  phone: string;
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

async function getAdminProfile(): Promise<Admin | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admins/me`;
    const appKey = (process.env.NEXT_PUBLIC_APP_KEY || "").trim();
    const token = await getCookies("token");

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "app-key": appKey,
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log(`Admin Profile Fetch Status: ${response.status}`);
    const responseData: ResponAdminProfile = await response.json();
    
    if (!response.ok) {
      console.log("Admin Profile Fetch Failed:", responseData.message);
      return null;
    }
    if (!response.ok) return null;

    return responseData.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function AdminProfilePage() {
  const adminProfile = await getAdminProfile();

  if (adminProfile == null) {
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
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#38bdf8", marginBottom: "12px" }}>
            Session Expired
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "24px" }}>
            Please sign in again to access your administrator profile.
          </p>
          <Link href="/sign-in" style={{
            display: "inline-block", padding: "12px 24px",
            background: "#38bdf8", color: "#0a0f1e",
            borderRadius: "12px", fontWeight: 700, textDecoration: "none",
          }}>
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const joinDate = new Date(adminProfile.createdAt).toLocaleDateString("en-US", {
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
        background: "rgba(56,189,248,0.15)", filter: "blur(120px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%", bottom: "-150px", right: "-150px",
        background: "rgba(74,222,128,0.1)", filter: "blur(100px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px),
          linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* ── Header ── */}
        <div style={{ marginBottom: "40px", display: "flex", alignItems: "flex-end", gap: "24px" }}>
          <div style={{
            width: "100px", height: "100px", borderRadius: "24px",
            background: "rgba(56,189,248,0.1)",
            border: "1px solid rgba(56,189,248,0.25)",
            boxShadow: "0 0 32px rgba(56,189,248,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Shield size={48} style={{
              color: "#38bdf8",
              filter: "drop-shadow(0 0 12px rgba(56,189,248,0.8))",
            }} />
          </div>
          <div>
            <h1 style={{
              fontSize: "36px", fontWeight: 900, color: "#ffffff",
              margin: 0, letterSpacing: "-0.02em",
            }}>
              {adminProfile.name}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
              <span style={{
                padding: "4px 12px", borderRadius: "8px",
                background: "rgba(74,222,128,0.1)",
                border: "1px solid rgba(74,222,128,0.3)",
                color: "#4ade80", fontSize: "12px", fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>
                {adminProfile?.user?.role || "ADMIN"}
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
                Administrator Profile
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px" }}>
          
          {/* Main Info Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            {/* Info Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <InfoCard 
                label="Username" 
                value={adminProfile?.user?.username || "N/A"} 
                icon={<User size={20} />} 
                color="#38bdf8" 
              />
              <InfoCard 
                label="Phone Number" 
                value={adminProfile.phone} 
                icon={<Phone size={20} />} 
                color="#4ade80" 
              />
              <InfoCard 
                label="Member Since" 
                value={joinDate} 
                icon={<Calendar size={20} />} 
                color="#f472b6" 
                fullWidth
              />
            </div>

            {/* Quick Actions Container */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)",
              padding: "40px",
            }}>
              <h2 style={{
                fontSize: "18px", fontWeight: 800, color: "#ffffff",
                marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px",
              }}>
                <Activity size={20} style={{ color: "#38bdf8" }} />
                Admin Features
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <ActionCard 
                  href="/admin/services" 
                  title="Services" 
                  desc="Manage PDAM services" 
                  icon={<Droplet size={24} />} 
                  color="#38bdf8" 
                />
                <ActionCard 
                  href="/admin/customer" 
                  title="Customers" 
                  desc="Manage user database" 
                  icon={<Users size={24} />} 
                  color="#4ade80" 
                />
                <ActionCard 
                  href="/admin/bills" 
                  title="Bills" 
                  desc="Billing operations" 
                  icon={<FileText size={24} />} 
                  color="#fbbf24" 
                />
              </div>
            </div>
          </div>

          {/* Sidebar / Status */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(74,222,128,0.1))",
              borderRadius: "24px", border: "1px solid rgba(56,189,248,0.2)",
              padding: "32px", textAlign: "center",
            }}>
              <div style={{
                width: "60px", height: "60px", borderRadius: "50%",
                background: "rgba(74,222,128,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <div style={{
                  width: "12px", height: "12px", borderRadius: "50%",
                  background: "#4ade80", boxShadow: "0 0 12px #4ade80",
                }} />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>System Active</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>
                Your administrative privileges are currently active and secure.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ marginTop: "60px", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>
          PDAM Baru © 2024 • Admin Control Center
        </div>
      </div>
      <style>{`
          .action-card {
            transition: all 0.3s ease !important;
          }
          .action-card:hover {
            transform: translateY(-5px) !important;
            background: rgba(255,255,255,0.06) !important;
            border-color: var(--hover-color) !important;
            box-shadow: 0 10px 30px -10px var(--hover-shadow) !important;
          }
        `}</style>
    </div>
  );
}

function InfoCard({ label, value, icon, color, fullWidth = false }: any) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)",
      padding: "24px", gridColumn: fullWidth ? "span 2" : "span 1",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: color, marginBottom: "12px" }}>
        {icon}
        <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff" }}>
        {value}
      </div>
    </div>
  );
}

function ActionCard({ href, title, desc, icon, color }: any) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div 
        className="action-card" 
        style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)",
          padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
          // @ts-ignore
          "--hover-color": color + "44",
          "--hover-shadow": color + "22",
        } as React.CSSProperties}
      >
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px",
          background: color + "15", border: "1px solid " + color + "33",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: color,
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff" }}>{title}</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{desc}</div>
        </div>
      </div>
    </Link>
  );
}
