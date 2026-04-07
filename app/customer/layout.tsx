import ProfileNavbar from "@/app/components/ui/ProfileNavbar"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ProfileNavbar role="customer" />
      {children}
    </>
  )
}
