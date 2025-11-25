"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ArrowDownAZ } from "lucide-react";
import { useState, useEffect } from "react";

const sortOptions = [
    { value: "relevant", label: "Most Relevant" },
    { value: "recent", label: "Most Recent" },
];

export default function ReviewsSortSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const currentSort = searchParams.get("sort") || "relevant";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-sort-selector]')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", newSort);
        params.set("page", "1"); // Reset to first page when changing sort
        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    };

    const getCurrentLabel = () => {
        return sortOptions.find(opt => opt.value === currentSort)?.label || "Most Relevant";
    };

    return (
        <div className="relative" data-sort-selector>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors text-sm font-medium"
            >
                <ArrowDownAZ className="h-4 w-4" />
                <span>{getCurrentLabel()}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors text-sm ${currentSort === option.value ? "bg-muted/30 font-semibold" : ""
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
