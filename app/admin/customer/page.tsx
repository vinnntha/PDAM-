import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import Search from "./search"
import DropCustomerButton from "./drop"

export const dynamic = "force-dynamic"

export interface CustomersResponse {
  success: boolean
  message: string
  data: CustomerData[]
  count: number
}

export interface CustomerData {
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
  user: User
  service: Service
}

export interface User {
  id: number
  username: string
  password: string
  role: string
  owner_token: string
  createdAt: string
  updatedAt: string
}

export interface Service {
  [x: string]: any
  id: number
  name: string
  min_usage: number
  max_usage: number
  price: number
  owner_token: string
  createdAt: string
  updatedAt: string
}

// fetch customers
async function getCustomers(): Promise<CustomersResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "Authorization": `Bearer ${await getCookies("token")}`
        }
      }
    )

    const data: CustomersResponse = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Failed to fetch customers",
        data: [],
        count: 0
      }
    }

    return data
  } catch {
    return {
      success: false,
      message: "Failed to fetch customers",
      data: [],
      count: 0
    }
  }
}

export default async function customersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const search =
    (Array.isArray(resolvedSearchParams.search) ? resolvedSearchParams.search[0] : resolvedSearchParams.search) || ""

  const { success, message, data } = await getCustomers()

  if (!success) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 text-yellow-700 p-5 rounded-xl">
          <h1 className="font-bold text-lg">Warning</h1>
          <p>{message}</p>
        </div>
      </div>
    )
  }

  const filteredData =
    search && search.trim() !== ""
      ? data.filter(customer =>
          customer.name.toLowerCase().includes(search.toLowerCase())
        )
      : data

  const displayCount = filteredData.length

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-rose-100 to-pink-200 p-6">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-pink-700">
          Customers List
        </h1>

        <Link
          href="/admin/customer/add"
          className="bg-pink-600 text-white px-6 py-3 rounded-lg
          hover:bg-pink-700 transition font-semibold shadow-md"
        >
          + Add Customer
        </Link>
      </div>

      <Search search={search} />

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border-white/40 p-8">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-pink-700">
            Total Customers: {displayCount}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">

            <thead>
              <tr className="bg-pink-100/50 text-left">
                <th className="px-4 py-3 text-pink-700 font-semibold">Customer Number</th>
                <th className="px-4 py-3 text-pink-700 font-semibold">Name</th>
                <th className="px-4 py-3 text-pink-700 font-semibold">Phone</th>
                <th className="px-4 py-3 text-pink-700 font-semibold">Address</th>
                <th className="px-4 py-3 text-pink-700 font-semibold">Service</th>
                <th className="px-4 py-3 text-pink-700 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((customer) => (
                <tr key={customer.id} className="border-b border-pink-200/50 hover:bg-pink-50/50">

                  <td className="px-4 py-3 text-gray-700">
                    {customer.customer_number}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {customer.name}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {customer.phone}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {customer.address}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {customer.service?.name || "N/A"}
                  </td>

                  <td className="px-4 py-3 flex gap-2 justify-center">

                    <Link href={`/admin/customer/edit/${customer.id}`}
                     className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                    </Link>

                    <DropCustomerButton
                      selectedData={customer.id}
                    />

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  )
}