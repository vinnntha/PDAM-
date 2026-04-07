"use client"
import { KeyboardEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";

type Props = { search: string }

export default function Search({ search }: Props) {
  const [keyword, setKeyword] = useState<string>(search || "");
  const router = useRouter();

  useEffect(() => {
    setKeyword(search || "");
  }, [search]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim() === "") {
      const params = new URLSearchParams(window.location.search);
      params.delete("search");
      router.push(`?${params.toString()}`);
    }
  }

  function handleSearch(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const params = new URLSearchParams(window.location.search);
      if (keyword.trim() === "") {
        params.delete("search");
      } else {
        params.set("search", keyword.trim());
      }
      router.push(`?${params.toString()}`);
    }
  }

  function clearSearch() {
    setKeyword("");
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    router.push(`?${params.toString()}`);
  }

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Search icon */}
      <div style={{
        position: "absolute", left: "16px", top: "50%",
        transform: "translateY(-50%)",
        color: keyword ? "#38bdf8" : "rgba(56,189,248,0.45)",
        display: "flex", alignItems: "center",
        transition: "color 0.2s", pointerEvents: "none",
        zIndex: 2,
      }}>
        <SearchIcon size={18} />
      </div>

      <input
        type="text"
        id="search"
        placeholder="Search service name... (press Enter)"
        value={keyword}
        onChange={handleInputChange}
        onKeyUp={handleSearch}
        style={{
          width: "100%", padding: "13px 48px 13px 46px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.04)",
          border: keyword
            ? "1px solid rgba(56,189,248,0.4)"
            : "1px solid rgba(74,222,128,0.2)",
          color: "#ffffff", fontSize: "14px",
          outline: "none", transition: "all 0.2s",
          boxSizing: "border-box",
          boxShadow: keyword ? "0 0 0 3px rgba(56,189,248,0.07)" : "none",
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = "rgba(56,189,248,0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.08)";
          e.currentTarget.style.background = "rgba(56,189,248,0.04)";
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = keyword
            ? "rgba(56,189,248,0.4)"
            : "rgba(74,222,128,0.2)";
          e.currentTarget.style.boxShadow = keyword
            ? "0 0 0 3px rgba(56,189,248,0.07)"
            : "none";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
      />

      {/* Clear button */}
      {keyword && (
        <button
          onClick={clearSearch}
          style={{
            position: "absolute", right: "12px", top: "50%",
            transform: "translateY(-50%)",
            width: "26px", height: "26px", borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s",
            zIndex: 2,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "rgba(239,68,68,0.15)";
            el.style.borderColor = "rgba(239,68,68,0.3)";
            el.style.color = "#ef4444";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "rgba(255,255,255,0.07)";
            el.style.borderColor = "rgba(255,255,255,0.1)";
            el.style.color = "rgba(255,255,255,0.45)";
          }}
        >
          <X size={13} />
        </button>
      )}

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

