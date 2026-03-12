import FormService from "./form"
import { getCookies } from "@/helper/cookies"

interface Service {
  id: number
  name: string
}

interface ServiceResponse {
  data: Service[]
}

async function getAllServices(): Promise<Service[]> {
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

    if (!response.ok) {
      return []
    }

    const responseData: ServiceResponse = await response.json()
    return responseData.data ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function AddPage() {
  const services = await getAllServices()

  return (
    <div className="w-full p-5">
      <FormService services={services} />
    </div>
  )
}