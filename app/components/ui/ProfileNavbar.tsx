"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { deleteCookies } from "@/helper/cookies"
import { LogOut, User, FileText, Droplet, Users, Shield, CreditCard } from "lucide-react"

interface ProfileNavbarProps {
  role: "admin" | "customer"
}

export default function ProfileNavbar({ role }: ProfileNavbarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await deleteCookies("token")
      router.push("/sign-in")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const adminLinks = [
    { name: "Profile", href: "/admin/profile", icon: <Shield size={18} /> },
    { name: "Services", href: "/admin/services", icon: <Droplet size={18} /> },
    { name: "Customers", href: "/admin/customer", icon: <Users size={18} /> },
    { name: "Bills", href: "/admin/bills", icon: <FileText size={18} /> },
    { name: "Payments", href: "/admin/payments", icon: <CreditCard size={18} /> },
  ]

  const customerLinks = [
    { name: "Profile", href: "/customer/profile", icon: <User size={18} /> },
    { name: "Bills", href: "/customer/bills", icon: <FileText size={18} /> },
    { name: "Payments", href: "/customer/payments", icon: <CreditCard size={18} /> },
  ]

  const links = role === "admin" ? adminLinks : customerLinks

  return (
    <nav style={{
      width: "100%",
      padding: "16px 24px",
      background: "rgba(10, 15, 30, 0.7)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      justifyContent: "center",
    }}>
      <div style={{
        maxWidth: role === "admin" ? "1000px" : "1100px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          {links.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/")
            return (
              <Link key={link.name} href={link.href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "10px 16px", borderRadius: "12px",
                  background: isActive ? (role === "admin" ? "rgba(56,189,248,0.15)" : "rgba(74,222,128,0.15)") : "transparent",
                  color: isActive ? (role === "admin" ? "#38bdf8" : "#4ade80") : "rgba(255,255,255,0.6)",
                  border: `1px solid ${isActive ? (role === "admin" ? "rgba(56,189,248,0.3)" : "rgba(74,222,128,0.3)") : "transparent"}`,
                  fontSize: "14px", fontWeight: isActive ? 700 : 600,
                  transition: "all 0.2s ease",
                }}>
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            )
          })}
        </div>

        <button 
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.1)", color: "#ef4444",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            fontSize: "14px", fontWeight: 700, cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"
            e.currentTarget.style.transform = "translateY(-1px)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </nav>
  )
}
