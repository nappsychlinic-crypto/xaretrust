"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";
import type { Company } from "@/types/company";

interface CompanyWithCount extends Company {
    totalReviewCount: number;
}

export default function CompaniesCarousel() {
    const [companies, setCompanies] = useState<CompanyWithCount[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const response = await fetch(API_ENDPOINTS.xareview());
                const data: Company[] = await response.json();
                // Filter companies with reviews and sort by score
                const companiesWithReviews = data
                    .map(company => ({
                        ...company,
                        totalReviewCount: company.scoreBreakdown.remarks.length
                    }))
                    .filter(company => company.totalReviewCount > 0)
                    .sort((a, b) => b.score - a.score);
                setCompanies(companiesWithReviews);
            } catch (error) {
                console.error("Failed to fetch companies:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCompanies();
    }, []);

    if (loading) {
        return (
            <div className="w-full bg-background py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-center text-muted-foreground uppercase tracking-widest mb-12">
                        Company Reviews
                    </h2>
                    <div className="max-w-3xl mx-auto animate-pulse">
                        <div className="bg-muted rounded-lg h-48"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (companies.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-background py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold text-center text-muted-foreground uppercase tracking-widest mb-12">
                    Company Reviews
                </h2>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {companies.slice(0, 8).map((company) => (
                        <Link
                            key={company.companyId}
                            href={`/review/${company.companyId}`}
                            className="block"
                        >
                            <Card className="bg-card border border-border hover:shadow-lg transition-all duration-200 h-full">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        {/* Logo */}
                                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center shrink-0 border border-border">
                                            {company.brandLogoUID ? (
                                                <img
                                                    src={API_ENDPOINTS.document(company.brandLogoUID)}
                                                    alt={company.companyName}
                                                    className="max-w-full max-h-full object-contain p-1"
                                                />
                                            ) : (
                                                <div className="text-xl font-bold text-primary">
                                                    {company.companyName.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Company Info and Rating */}
                                        <div className="flex-1 min-w-0 flex flex-col gap-2">
                                            <div>
                                                <h3 className="font-semibold text-sm text-foreground truncate">
                                                    {company.companyName}
                                                </h3>

                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex text-[#1e40af]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.round(company.score)
                                                                ? "fill-current"
                                                                : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm font-semibold text-foreground">
                                                    {company.score.toFixed(1)}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({company.totalReviewCount})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
