"use client"

import { storeCookies } from "@/helper/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast, ToastContainer } from "react-toastify";

export interface LoginResponse {
    success?: boolean
    message: string
    token?: string
    role?: string
    error?: string
    statusCode?: number
}

export default function SignInPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    async function handleSignIn(event: FormEvent) {
        try {
            event.preventDefault();
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;
            const requestData = { username, password }
            const response = await fetch(
                url,
                {
                    method: "POST",
                    body: JSON.stringify(requestData),
                    headers: {
                        "Content-Type": "application/json",
                        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || ""
                    },

                }
            )

            const responseData: LoginResponse = await response.json();
            const message = responseData.message
            if (!response.ok) {
                // if statusCode not 200, 201, 204, etc
                toast.error(
                    message,
                    { containerId: 'toastLogin' }
                )
                return;
            }

            if (responseData?.success == true) {
                // assume that login success
                setShowSuccess(true);
                startTransition(async function () {
                    storeCookies('token', responseData?.token || "");
                    setTimeout(() => {
                        if (responseData?.role === 'ADMIN') {
                            router.replace('/admin/profile');
                        }
                        if (responseData?.role === 'CUSTOMER') {
                            router.replace('/customer/profile');
                        }
                    }, 2000); // delay redirect
                })
            } else {
                // assume that login failed
                toast.warning(
                    message,
                    { containerId: 'toastLogin' }
                )
                return;
            }

        } catch (error) {
            console.log(error);
            alert('Something were wrong')
        }
    }

    return (
        <div
            className="w-full min-h-dvh 
            bg-linear-to-br from-pink-100 via-rose-100 to-pink-200
            flex items-center justify-center p-6"
        >
            <ToastContainer containerId={'toastLogin'} />
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
                            Sign In
                        </h1>
                        <p className="text-sm text-gray-600 mt-2">
                            Use your credentials to login
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignIn} className="space-y-6">
                        <Input
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl
                            bg-linear-to-r from-pink-500 to-rose-500
                            text-white font-semibold text-lg
                            hover:opacity-90 active:scale-[0.98]
                            transition shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center text-semibold mt-6 text-gray-600">
                        If you don't have an account, please <Link className="font-semibold text-pink-600 hover:text-pink-700" href="/sign-up">sign up</Link>
                    </div>
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
                        <h2 className="text-2xl font-bold text-pink-700 mb-2">Login Successful! 🎉</h2>
                        <p className="text-gray-600">Welcome back! Redirecting you now...</p>
                        <div className="mt-4 flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-pink-500 border-t-transparent"></div>
                        </div>
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