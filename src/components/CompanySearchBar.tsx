"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Star } from "lucide-react";
import Link from "next/link";
import companies from "@/data/companies.json";

export default function CompanySearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8); // Limit to 8 results

    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsOpen(true);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for a company or category..."
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="w-full px-6 py-4 pr-32 rounded-full border-2 border-muted bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-semibold flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search
                </button>
            </div>

            {isOpen && (searchQuery || true) && (
                <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-border">
                        <h3 className="text-sm font-semibold text-muted-foreground">
                            {searchQuery ? "Search Results" : "Suggested Searches"}
                        </h3>
                    </div>

                    {filteredCompanies.length > 0 ? (
                        <div className="py-2">
                            {filteredCompanies.map((company) => (
                                <Link
                                    key={company.id}
                                    href={`/review/${company.domain}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 p-1 border border-border">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-foreground truncate text-left">
                                            {company.name}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex text-green-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${i < Math.round(company.rating)
                                                            ? "fill-current"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-foreground">
                                                {company.rating}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                • {company.reviewCount} reviews
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-muted-foreground">
                            No companies found matching "{searchQuery}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
