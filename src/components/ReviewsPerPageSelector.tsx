"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const pageSizeOptions = [5, 10, 20, 50, 100];

export default function ReviewsPerPageSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const currentPageSize = Number(searchParams.get("pageSize")) || 20;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-pagesize-selector]')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handlePageSizeChange = (newSize: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("pageSize", newSize.toString());
        params.set("page", "1"); // Reset to first page when changing page size
        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    };

    return (
        <div className="relative" data-pagesize-selector>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors text-sm font-medium"
            >
                <span>{currentPageSize} per page</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                    {pageSizeOptions.map((size) => (
                        <button
                            key={size}
                            onClick={() => handlePageSizeChange(size)}
                            className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors text-sm ${currentPageSize === size ? "bg-muted/30 font-semibold" : ""
                                }`}
                        >
                            {size} per page
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
