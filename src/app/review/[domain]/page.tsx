"use client";

import { notFound } from "next/navigation";
import { Star, ShieldCheck, MapPin, Globe, Mail, Phone, CheckCircle, ExternalLink, ThumbsUp, Filter, ChevronLeft, ChevronRight, Eye, Briefcase } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import ReviewsPerPageSelector from "@/components/ReviewsPerPageSelector";
import ReviewsSortSelector from "@/components/ReviewsSortSelector";
import { ReviewActionButtons, SeeAllActivityButton } from "@/components/ReviewActions";
import CompanyDescription from "@/components/CompanyDescription";
import RatingBreakdown from "@/components/RatingBreakdown";
import { useEffect, useState, use } from "react";

import { API_ENDPOINTS } from "@/config/api";
import type { Company } from "@/types/company";

interface CompanyPageProps {
    params: Promise<{ domain: string }>;
    searchParams: Promise<{ page?: string; pageSize?: string }>;
}

export default function CompanyPage({ params, searchParams }: CompanyPageProps) {

    const categories = [
        { id: 1, name: "HR/Accounting/Legal services", image: "/legal1.jpeg", server_company_category: "HR_ACCOUNTING_LEGAL" },
        { id: 2, name: "Manufacturer/Brand Owner", image: "/brand1.jpeg", server_company_category: "MANUFACTURER_BRAND_OWNER" },
        { id: 3, name: "Importer/Distributor", image: "/distributor1.jpeg", server_company_category: "IMPORTER_DISTRIBUTOR" },
        { id: 4, name: "Consulting/Advisory", image: "/consulting1.jpeg", server_company_category: "CONSULTING_ADVISORY" },
        { id: 5, name: "Tech Solution Provider", image: "/it1.jpeg", server_company_category: "TECH_SOLUTION_PROVIDER" },
    ];

    // Unwrap promises
    const { domain } = use(params);
    const { page, pageSize: pageSizeParam } = use(searchParams);

    const companyId = domain; // Using domain param as companyId
    const currentPage = Number(page) || 1;
    const pageSize = Number(pageSizeParam) || 5;

    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompany() {
            try {
                const response = await fetch(API_ENDPOINTS.xareview());
                const companies: Company[] = await response.json();
                const foundCompany = companies.find((c) => c.companyId === companyId);

                if (!foundCompany) {
                    setCompany(null);
                } else {
                    setCompany(foundCompany);
                }
            } catch (error) {
                console.error("Failed to fetch company:", error);
                setCompany(null);
            } finally {
                setLoading(false);
            }
        }

        fetchCompany();
    }, [companyId]);

    if (loading) {
        return (
            <main className="min-h-screen bg-muted/10">
                <div className="container mx-auto px-4 py-16">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 bg-muted rounded-lg"></div>
                        <div className="h-64 bg-muted rounded-lg"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (!company) {
        notFound();
    }

    // Get public reviews for display
    const publicReviews = company.scoreBreakdown.remarks.filter(
        (remark) => remark.remarkPublic && remark.showAsTestimonial
    );

    const displayedReviewsCount = publicReviews.length;
    const totalReviewCount = company.scoreBreakdown.remarks.length;

    const totalPages = Math.ceil(displayedReviewsCount / pageSize);
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const currentReviews = publicReviews.slice(startIdx, endIdx);

    return (
        <main className="min-h-screen bg-muted/10">
            {/* Breadcrumbs & Header Section */}
            <div className="bg-background border-b border-border sticky top-16 z-30">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-sm text-muted-foreground mb-4">
                        <Link href="/" className="hover:underline">Home</Link> &gt; <span className="text-foreground">{company.companyName}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <div className="w-32 h-32 bg-white rounded-lg border-2 border-border p-2 shrink-0 shadow-sm">
                            {company.brandLogoUID ? (
                                <img
                                    src={API_ENDPOINTS.document(company.brandLogoUID)}
                                    alt={company.companyName}
                                    className="w-full h-full object-contain rounded"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-primary">
                                    {company.companyName.charAt(0)}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.companyName}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <span className="text-sm text-muted-foreground">Reviews</span>
                                <span className="font-semibold">{totalReviewCount}</span>
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">
                                    {company.score >= 4.5 ? "Excellent" : company.score >= 3.5 ? "Great" : company.score >= 2.5 ? "Good" : "Average"}
                                </span>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <div className="flex text-[#1e40af]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-6 w-6 ${i < Math.round(company.score) ? "fill-current" : "text-gray-300"}`} />
                                    ))}
                                </div>
                                <span className="text-2xl font-bold">Trust Score {company.score.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className="shrink-0">
                            {company.brandWebsite && (
                                <a
                                    href={company.brandWebsite.startsWith('http') ? company.brandWebsite : `https://${company.brandWebsite}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background border-2 border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-semibold"
                                >
                                    Visit Website <ExternalLink className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Sidebar (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Rating Breakdown Section */}
                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-3 border-b border-border/50">
                                <CardTitle className="text-lg">Trust Score Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <RatingBreakdown companyId={company.companyId} />
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-3 border-b border-border/50">
                                <CardTitle className="text-lg">About {company.companyName}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-4 text-sm">
                                    {(company.server_company_category || company.companyCategory || (company as any).companyType) && (
                                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                            <Briefcase className="h-5 w-5 text-muted-foreground" />
                                            <span className="font-medium">
                                                {(() => {
                                                    const categoryKey = company.server_company_category || (company as any).companyType || company.companyCategory;
                                                    const matchedCategory = categories.find(c => c.server_company_category === categoryKey);

                                                    if (matchedCategory) {
                                                        return matchedCategory.name;
                                                    }

                                                    return (categoryKey || '')
                                                        .split('_')
                                                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                        .join(' ');
                                                })()}
                                            </span>
                                        </div>
                                    )}
                                    {company.emailAddress && (
                                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                            <a href={`mailto:${company.emailAddress}`} className="hover:underline font-medium truncate">{company.emailAddress}</a>
                                        </div>
                                    )}
                                    {company.brandContactNumber && (
                                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                            <Phone className="h-5 w-5 text-muted-foreground" />
                                            <span className="font-medium">{company.brandContactNumber}</span>
                                        </div>
                                    )}
                                    {company.brandCountry && (
                                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <span className="font-medium">{company.brandCountry}</span>
                                        </div>
                                    )}
                                    {company.brandWebsite && (
                                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                            <Globe className="h-5 w-5 text-muted-foreground" />
                                            <a
                                                href={company.brandWebsite.startsWith('http') ? company.brandWebsite : `https://${company.brandWebsite}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline font-medium truncate"
                                            >
                                                {company.brandWebsite}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Reviews (9 cols) */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* Company Description Section */}
                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-3 border-b border-border/50">
                                <CardTitle className="text-lg">Company Description</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <CompanyDescription companyId={company.companyId} />
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border shadow-sm">
                            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <h2 className="text-xl font-bold">Reviews</h2>
                                <div className="flex items-center gap-2">
                                    <ReviewsPerPageSelector />
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Filter className="h-4 w-4" /> Filter
                                    </Button>
                                    <ReviewsSortSelector />
                                </div>
                            </CardContent>
                        </Card>

                        {currentReviews.map((review) => (
                            <Card key={review.uniqueId} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* User Info Column */}
                                        <div className="md:w-48 shrink-0 flex md:flex-col items-center md:items-start gap-3 border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-4">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-bold">
                                                {review.contact ? review.contact.firstName.charAt(0) : "A"}
                                            </div>
                                            <div className="text-sm">
                                                <div className="font-semibold">
                                                    {review.contact ? `${review.contact.firstName} ${review.contact.lastName}` : "Anonymous"}
                                                </div>
                                                <div className="text-muted-foreground text-xs flex items-center gap-1">
                                                    <CheckCircle className="h-3 w-3 text-green-500" /> Verified
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review Content Column */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex text-[#1e40af]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-5 w-5 ${i < Math.round(company.score) ? "fill-current" : "text-gray-300"}`} />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                                            </div>

                                            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                                                {review.remark}
                                            </p>

                                            <div className="text-xs text-muted-foreground mb-4">
                                                <span className="font-semibold">Date of experience:</span> {new Date(review.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </div>

                                            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                                                <ReviewActionButtons />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <Link
                                    href={`/review/${companyId}?page=${currentPage - 1}&pageSize=${pageSize}`}
                                    className={`p-2 rounded-full border border-border hover:bg-muted transition-colors ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>

                                {[...Array(totalPages)].map((_, i) => {
                                    const p = i + 1;
                                    if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                                        return (
                                            <Link
                                                key={p}
                                                href={`/review/${companyId}?page=${p}&pageSize=${pageSize}`}
                                                className={`w-10 h-10 flex items-center justify-center rounded-full border border-border transition-colors ${currentPage === p ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}
                                            >
                                                {p}
                                            </Link>
                                        );
                                    } else if (p === currentPage - 2 || p === currentPage + 2) {
                                        return <span key={p} className="text-muted-foreground">...</span>;
                                    }
                                    return null;
                                })}

                                <Link
                                    href={`/review/${companyId}?page=${currentPage + 1}&pageSize=${pageSize}`}
                                    className={`p-2 rounded-full border border-border hover:bg-muted transition-colors ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Link>
                            </div>
                        )}

                        {displayedReviewsCount === 0 && (
                            <Card className="bg-card border-border shadow-sm">
                                <CardContent className="p-12 text-center">
                                    <p className="text-muted-foreground">No public reviews available yet.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
