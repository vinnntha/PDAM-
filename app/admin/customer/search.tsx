"use client"

import { KeyboardEvent, useState, useEffect } from "react";
import { useRouter } from "next/dist/client/components/navigation";

type Props =
  {
    search: string
  }
// elemen name = search have property
// "search" with string type

export default function Search(props: Props) {
    const [keyword, setKeyword] = useState<string>(props.search || "");
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
        e.preventDefault();
        if (e.key == "Enter") {
            //* if users press Enter key
            const params = new URLSearchParams(window.location.search);
            //* get current URL of Browser *//
            if (keyword.trim() === "") {
                params.delete("search")
                /** delete "search" from URL */
            } else {
                params.set("search", keyword.trim())
                /** set "search" in URL  */
            }
            router.push(`?${params.toString()}`)
        }
    }

    return (
        <div className="w-full p-4">
            <div className="relative">
                <input type="text"
                    id="search"
                    placeholder="Search customers by name..."
                    className="border border-pink-300 rounded-md p-3 pl-10 w-full text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={keyword}
                    onChange={handleInputChange}
                    onKeyUp={handleSearch}
                />
                <svg className="absolute left-3 top-3 h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    )
}
