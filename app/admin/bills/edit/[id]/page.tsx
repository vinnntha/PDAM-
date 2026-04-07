import EditBillForm from "./form"
import { getCookies } from "@/helper/cookies"

export interface BillResponse {
  success: boolean
  message: string
  data: Bill
}

export interface Bill {
  id: number
  customer_id: number
  measurement_number: string
  usage_value: number
  usage?: number  // fallback for older responses
  amount: number
  status: string
  month: number
  year: number
  owner_token: string
  createdAt: string
  updatedAt: string
}

interface Customer {
  id: number
  name: string
  customer_number: string
}

async function getBillById(id: string): Promise<Bill | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/bills/${id}`,
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

async function getAllCustomers(): Promise<Customer[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
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

export default async function EditBillPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [bill, customers] = await Promise.all([
    getBillById(id),
    getAllCustomers(),
  ])

  if (!bill) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 text-yellow-700 p-5 rounded-xl">
          <h1 className="font-bold text-lg">Bill not found</h1>
          <p>The requested bill could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <EditBillForm bill={bill} customers={customers} />
    </div>
  )
}
