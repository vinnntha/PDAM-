import AddBillForm from "./form"
import { getCookies } from "@/helper/cookies"

interface Customer {
  id: number
  name: string
  customer_number: string
  service_id: number
  service?: {
    id: number
    name: string
    price: number
  }
}

interface CustomerResponse {
  data: Customer[]
}

async function getAllCustomers(): Promise<Customer[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customers`
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        "authorization": `Bearer ${await getCookies("token")}`,
      },
    })
    if (!response.ok) return []
    const responseData: CustomerResponse = await response.json()
    return responseData.data ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getAllServices() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services`
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        "authorization": `Bearer ${await getCookies("token")}`,
      },
    })
    if (!response.ok) return []
    const responseData = await response.json()
    return responseData.data ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function AddBillPage() {
  const [customers, services] = await Promise.all([
    getAllCustomers(),
    getAllServices(),
  ])

  return (
    <div className="w-full">
      <AddBillForm customers={customers} services={services} />
    </div>
  )
}
