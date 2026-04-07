import ProfileNavbar from "@/app/components/ui/ProfileNavbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ProfileNavbar role="admin" />
      {children}
    </>
  )
}
