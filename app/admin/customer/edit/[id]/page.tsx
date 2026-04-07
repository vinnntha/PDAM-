import EditCustomer from "./form"
import { getCookies } from "@/helper/cookies"

export interface CustomerResponse {
  success: boolean
  message: string
  data: Customer
}

export interface Customer {
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
}

interface Service {
  id: number
  name: string
}

async function getCustomerById(id: string): Promise<Customer | null> {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customers/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "authorization": `Bearer ${await getCookies("token")}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) return null

    return data.data

  } catch (error) {
    console.log(error)
    return null
  }
}

async function getServices(): Promise<Service[]> {

  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "authorization": `Bearer ${await getCookies("token")}`,
        },
      }
    )

    if (!response.ok) return []

    const result = await response.json()
    return result.data ?? []

  } catch {
    return []
  }

}

export default async function EditPage({
  params,
}:{
  params:Promise<{id:string}>
}) {

  const { id } = await params
  const customer = await getCustomerById(id)
  const services = await getServices()

  if (!customer) {
    return <div>Customer not found</div>
  }

  return (
    <div className="w-full">
      <EditCustomer customer={customer} services={services}/>
    </div>
  )
}