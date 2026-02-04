import { getCookies } from "@/helper/cookies"

export interface ResponseCustomerProfile {
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
    user: User
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

async function getCustomerProfile(): Promise<Customer | null> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customers/me`
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || '',
                    "Authorization": `Bearer ${await getCookies('token')}`
                }
            }
        )
        const responseData: ResponseCustomerProfile = await response.json()
        if (!response.ok) {
            return null
        }
        return responseData.data

    } catch (error) {
        console.log(error)
        return null
    }
}

export default async function ProfilePage() {
    const customerProfile = await getCustomerProfile()
    if (customerProfile == null) {
        return (
            <div className="w-full min-h-screen bg-linear-to-br from-pink-100 via-rose-100 to-pink-200 flex justify-center items-center p-6">
                <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/40 text-center">
                    <h1 className="font-semibold text-xl text-pink-700">Sorry, customer profile does not exist.</h1>
                </div>
            </div>
        )
    }
    return (
        <div className="w-full min-h-screen bg-linear-to-br from-pink-100 via-rose-100 to-pink-200 p-6">
            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">

                {/* Decorative blur */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl"></div>

                {/* Header */}
                <div className="relative bg-linear-to-r from-pink-500 to-rose-500 p-8 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-pink-500 text-3xl font-bold shadow-lg">
                        {customerProfile.name?.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-white text-3xl font-bold">
                            {customerProfile.name}
                        </h1>
                        <p className="text-pink-100 text-lg">
                            Customer Profile
                        </p>
                        <span className="inline-block mt-2 px-4 py-2 rounded-full bg-white/20 text-white font-semibold text-sm">
                            {customerProfile.user.role.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                            <div className="flex items-center space-x-3 mb-2">
                                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm text-gray-500 font-medium">Name</span>
                            </div>
                            <span className="font-bold text-gray-800 text-lg">
                                {customerProfile.name}
                            </span>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                            <div className="flex items-center space-x-3 mb-2">
                                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-sm text-gray-500 font-medium">Phone</span>
                            </div>
                            <span className="font-bold text-gray-800 text-lg">
                                {customerProfile.phone}
                            </span>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                            <div className="flex items-center space-x-3 mb-2">
                                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm text-gray-500 font-medium">Username</span>
                            </div>
                            <span className="font-bold text-gray-800 text-lg">
                                {customerProfile.user.username}
                            </span>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                            <div className="flex items-center space-x-3 mb-2">
                                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-gray-500 font-medium">Role</span>
                            </div>
                            <span className="inline-block w-fit px-4 py-2 rounded-full text-sm font-bold bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-md">
                                {customerProfile.user.role}
                            </span>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Thank you for choosing PDAM 💖
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}