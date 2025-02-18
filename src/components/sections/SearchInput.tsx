"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function SearchInput() {
  const t = useTranslations("Gallery");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);

  const createQueryString = useCallback((query: string) => {
    const newParams = new URLSearchParams();
    if (query) {
      newParams.set("q", query);
    }
    return newParams.toString();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString() || "";

    setIsSearching(true);
    router.replace(query ? `?${createQueryString(query)}` : "/", {
      scroll: false,
    });
  };

  // Reset search state when results are loaded
  useEffect(() => {
    setIsSearching(false);
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <Search
          className={cn(
            "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400",
            isSearching && "animate-spin"
          )}
        />
        <input
          type="search"
          name="query"
          placeholder={t("searchPlaceholder")}
          defaultValue={searchParams.get("q") || ""}
          className="w-full rounded-full border border-gray-200 bg-white px-10 py-2 text-sm outline-none focus:border-gray-400 focus:ring-0 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-gray-600"
          onChange={(e) => {
            if (e.target.value === "") {
              router.replace("/", { scroll: false });
            }
          }}
        />
      </div>
    </form>
  );
}
