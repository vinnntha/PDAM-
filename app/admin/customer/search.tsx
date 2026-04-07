"use client"

import { KeyboardEvent, useState, useEffect } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import { Search as SearchIcon, X, Command } from "lucide-react";

type Props = {
    search: string
}

export default function Search(props: Props) {
    const [keyword, setKeyword] = useState<string>(props.search || "");
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    // Sync state with props when search changes
    useEffect(() => {
        setKeyword(props.search || "");
    }, [props.search]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setKeyword(value);

        // If input becomes empty, immediately clear search
        if (value.trim() === "") {
            const params = new URLSearchParams(window.location.search);
            params.delete("search");
            router.push(`?${params.toString()}`);
        }
    }

    function handleSearch(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            const params = new URLSearchParams(window.location.search);
            if (keyword.trim() === "") {
                params.delete("search")
            } else {
                params.set("search", keyword.trim())
            }
            router.push(`?${params.toString()}`)
        }
    }

    const clearSearch = () => {
        setKeyword("");
        const params = new URLSearchParams(window.location.search);
        params.delete("search");
        router.push(`?${params.toString()}`);
    }

    return (
        <div style={{ width: "100%", position: "relative" }}>
            <div style={{
                position: "absolute",
                inset: "-2px",
                background: isFocused 
                    ? "linear-gradient(90deg, #38bdf8, #4ade80)" 
                    : "transparent",
                borderRadius: "20px",
                filter: "blur(10px)",
                opacity: isFocused ? 0.3 : 0,
                transition: "all 0.4s ease",
                zIndex: 0
            }} />
            
            <div style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                backgroundColor: isFocused ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                border: isFocused ? "1px solid rgba(56,189,248,0.4)" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "18px",
                padding: "2px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isFocused ? "0 8px 30px rgba(0,0,0,0.4)" : "none",
                zIndex: 1
            }}>
                <div style={{
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                    color: isFocused ? "#38bdf8" : "rgba(255,255,255,0.3)",
                    transition: "color 0.3s ease"
                }}>
                    <SearchIcon size={20} strokeWidth={2.5} />
                </div>

                <input 
                    type="text"
                    id="search"
                    placeholder="Search customers by name or number..."
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        padding: "18px 0",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 500,
                        outline: "none",
                        width: "100%"
                    }}
                    value={keyword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleInputChange}
                    onKeyUp={handleSearch}
                />

                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingRight: "16px" }}>
                    {keyword && (
                        <button 
                            onClick={clearSearch}
                            style={{
                                background: "rgba(255,255,255,0.08)",
                                border: "none",
                                borderRadius: "10px",
                                padding: "6px",
                                cursor: "pointer",
                                color: "rgba(255,255,255,0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                                e.currentTarget.style.color = "#ef4444";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                            }}
                        >
                            <X size={16} strokeWidth={3} />
                        </button>
                    )}
                    
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "10px",
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.05em"
                    }}>
                        <Command size={12} />
                        <span>ENTER</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
