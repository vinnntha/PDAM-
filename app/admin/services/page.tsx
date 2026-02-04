import { getCookies } from "@/helper/cookies"
import Link from "next/link"
import Search from "./search"
import DropServiceButton from "./drop"

export interface ServiceResponse {
  success: boolean
  message: string
  data: ServiceType[]
  count: number
}

export interface ServiceType {
  id: number
  name: string
  min_usage: number
  max_usage: number
  price: number
  owner_token: string
  createdAt: string
  updatedAt: string
}


// fetch service
async function getServices(): Promise<ServiceResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
      {
        method: "GET",
        headers: {
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
          "Authorization": `Bearer ${await getCookies("token")}`
        }
      }
    )

    const data: ServiceResponse = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message,
        data: [],
        count: 0
      }
    }

    return data
  } catch {
    return {
      success: false,
      message: "Failed to fetch service",
      data: [],
      count: 0
    }
  }
}

type PageProps = {
  searchParams: Promise<{
    search: string
  }>
}

export default async function ServicePage(props: PageProps) {
  const { search } = await props.searchParams
  const { success, message, data, count } = await getServices()

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

  // Filter services based on search term
  const filteredData = search && search.trim() !== ''
    ? data.filter(service => 
        service.name.toLowerCase().includes(search.toLowerCase())
      )
    : data

  const displayCount = filteredData.length

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-pink-700">
            Service List
          </h1>

          <Link
            href="/admin/services/add"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg
            hover:bg-pink-700 transition font-semibold shadow-md"
          >
            + Add Service
          </Link>
        </div>

        {/* SEARCH */}
       <Search search={search}/>    

        {displayCount === 0 ? (
          <div className="bg-sky-100 text-sky-600 p-5 rounded-lg">
            {search && search.trim() !== '' ? `Tidak ada service yang cocok dengan "${search}"` : "Tidak ada service tersedia"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map(service => (
              <div
                key={service.id}
                className="bg-white border border-pink-200 rounded-lg p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-pink-700 mb-2">
                  {service.name}
                </h3>
                <div className="text-sm text-gray-600 mb-4">
                  <p><strong>Min Usage:</strong> {service.min_usage}</p>
                  <p><strong>Max Usage:</strong> {service.max_usage}</p>
                  <p className="text-green-600 font-semibold"><strong>Price:</strong> Rp {service.price.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <Link
                    href={`/admin/services/edit/${service.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                  <DropServiceButton selectedData={service.id} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Count */}
        <div className="mt-8 p-4 bg-pink-50 rounded-lg border border-pink-200">
          <div className="flex justify-between items-center">
            <span className="text-pink-700 font-semibold">
              Total Services: {displayCount}
            </span>
            {search && search.trim() !== '' && (
              <span className="text-sm text-gray-600">
                Filtered from {count} total services
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}