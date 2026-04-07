import { getCookies } from "@/helper/cookies"
import FormService from "./form"

export interface ServiceResponse {
    success: boolean
    message: string
    data: Service
}

export interface Service {
    id: number
    name: string
    min_usage: number
    max_usage: number
    price: number
    owner_token: string
    createdAt: string
    updatedAt: string
}

async function getServicesById(id: string): Promise<Service | null> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`
        const response = await fetch(url, {
            method: `GET`,
            cache: `no-store`,
            headers: {
                'Content-Type': 'application/json',
                'app-key': process.env.NEXT_PUBLIC_APP_KEY || '',
                'authorization': `Bearer ${await getCookies('token')}`
            },

        })
        const responseData: ServiceResponse = await response.json()
        if (!response.ok) {
            return null
        }
        return responseData.data

    } catch (error) {
        console.log(error)
        return null
    }
}

type PageProps = {
    params: Promise<{
        id: string /**sesuai dengan nama folde [id] */
    }>
}

export default async function EditServicePage(probs: PageProps) {
    /**get id from services from Params */
    const { id } = await probs.params
    /**call function to get service based on selected id */
    const selectedService = await getServicesById(id)

    if (selectedService == null) {
        return (
            <div className="bg-yellow-50 text-yellow-500 w-full p-5 rounded">
                Sorry, service does not exits, please check your url corectly.
            </div>
        )
    }

    return (
        <div className="w-full">
            {/**show editable form for service data */}
            <FormService service={selectedService} />
        </div>
    )
}