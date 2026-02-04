// use client digunakan untuk menunjukkan halaman tersebut merupakan halaman client side rendering
// client side rendering berarti halaman tersebut dirender di sisi klien (browser) bukan di sisi server

// waktu yang tepat untuk menggunakan "use client":
// 1. ketika halaman tersebut membutuhkan interaksi user secara langsung
// 2. ketika halaman tersebut membutuhkan state management
// 3. ketika halaman tersebut membutuhkan efek samping (side effects) seperti fetching data di sisi klien
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    // Define state
    // State adalah variabel yang menyimpan informasi yang dapat berubah selama proses rendering komponen
    // State adalah variabel yang memyimpan data dinamis yang dapat berubah seiring interaksi user atau perubahan data lainnya

    const [username, setUsername] = useState<string>("");
    // Username : nama state yang menyimpan nilai input username
    // setUsername : fungsi untuk mengubah nilai state username
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const router = useRouter();

    async function handleSignUp(e : React.FormEvent) {
        e.preventDefault();
        try{
            const request = JSON.stringify({ //Mengubah data JavaScript menjadi format JSON string
                username,
                password,
                phone,
                name
            })
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admins`
            const response = await fetch(url , { //melakukan request ke server 
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json",
                    "app-key" : `${process.env.NEXT_PUBLIC_APP_KEY}`
                },
                body: request
            })
            if (!response.ok) { //false
                setErrorMessage("Failed to register admin");
                setShowError(true);
                return;
            }
            const responseData = await response.json();
            setShowSuccess(true);
        }catch (error) {
            console.error("Error during sign up :" , error)
        }
    }

    return (
        <div
            className="w-full min-h-dvh 
            bg-linear-to-br from-pink-100 via-rose-100 to-pink-200
            flex items-center justify-center p-6"
        >
            <div
                className="relative w-full max-w-lg 
                bg-white/70 backdrop-blur-xl
                rounded-2xl shadow-xl border border-white/40
                p-8"
            >
                {/* Decorative blur */}
                <div className="absolute -top-16 -right-16 w-48 h-48 
                    bg-pink-300/40 rounded-full blur-3xl"></div>

                <div className="relative">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-pink-700">
                            Register Admin PDAM
                        </h1>
                        <p className="text-sm text-gray-600 mt-2">
                            Create your admin account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignUp} className="space-y-6">
                        <Input
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            icon={
                                <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            }
                        />

                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create password"
                            icon={
                                <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-600"
                                >
                                    {showPassword ? (
                                        
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 012.563-4.306m5.858 5.858a3 3 0 104.243 4.243m-4.243-4.243L3 3m6.872 6.872a3 3 0 014.243 4.243m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            }
                        />

                        <Input
                            label="Nama Lengkap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full name"
                            icon={
                                <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                </svg>
                            }
                        />

                        <Input
                            label="No. Telepon"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="08xxxxxxxxxx"
                            icon={
                                <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            }
                        />

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl
                            bg-linear-to-r from-pink-500 to-rose-500
                            text-white font-semibold text-lg
                            hover:opacity-90 active:scale-[0.98]
                            transition shadow-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4">
                        <div className="w-16 h-16 bg-linear-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-pink-700 mb-2">Registration Successful! 🎉</h2>
                        <p className="text-gray-600">Welcome to PDAM! You can now sign in.</p>
                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                router.push('/sign-in');
                            }}
                            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                        >
                            Go to Sign In
                        </button>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {showError && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center max-w-sm mx-4">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-red-700 mb-2">Registration Failed</h2>
                        <p className="text-gray-600">{errorMessage}</p>
                        <button
                            onClick={() => setShowError(false)}
                            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}        </div>
    )
}

/* Reusable input component */
function Input({
    label,
    icon,
    rightIcon,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
    icon?: React.ReactNode
    rightIcon?: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-2 text-sm">
            <label className="text-gray-700 font-medium">{label}</label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        {icon}
                    </div>
                )}
                <input
                    {...props}
                    className={`px-55 py-4 rounded-xl
                    bg-white/90 border border-pink-200
                    focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                    text-gray-800 transition-all duration-200
                    ${icon ? 'pl-14' : ''} ${rightIcon ? 'pr-55' : ''}`}
                    required
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {rightIcon}
                    </div>
                )}
            </div>
        </div>
    )
}