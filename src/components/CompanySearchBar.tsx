"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Star } from "lucide-react";
import Link from "next/link";
import { API_ENDPOINTS } from "@/config/api";
import type { Company } from "@/types/company";

interface CompanyWithCount extends Company {
    publicTestimonialCount: number;
}

export default function CompanySearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [companies, setCompanies] = useState<CompanyWithCount[]>([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const response = await fetch(API_ENDPOINTS.xareview());
                const data: Company[] = await response.json();
                // Filter out companies with zero public testimonials
                const companiesWithReviews = data
                    .map(company => ({
                        ...company,
                        publicTestimonialCount: company.scoreBreakdown.remarks.filter(
                            remark => remark.remarkPublic && remark.showAsTestimonial
                        ).length
                    }))
                    .filter(company => company.publicTestimonialCount > 0);
                setCompanies(companiesWithReviews);
            } catch (error) {
                console.error("Failed to fetch companies:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCompanies();
    }, []);

    const filteredCompanies = companies
        .filter((company) =>
            company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 8); // Limit to 8 results

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

                    {loading ? (
                        <div className="p-8 text-center text-muted-foreground">
                            Loading companies...
                        </div>
                    ) : filteredCompanies.length > 0 ? (
                        <div className="py-2">
                            {filteredCompanies.map((company) => (
                                <Link
                                    key={company.companyId}
                                    href={`/review/${company.companyId}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 p-1 border border-border">
                                        {company.brandLogoUID ? (
                                            <img
                                                src={API_ENDPOINTS.document(company.brandLogoUID)}
                                                alt={company.companyName}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="text-2xl font-bold text-primary">
                                                {company.companyName.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-foreground truncate text-left">
                                            {company.companyName}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex text-[#1e40af]">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${i < Math.round(company.score)
                                                            ? "fill-current"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-foreground">
                                                {company.score.toFixed(1)}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                • {company.publicTestimonialCount} reviews
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-muted-foreground">
                            {searchQuery ? `No companies found matching "${searchQuery}"` : "No companies available"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
