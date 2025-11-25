import { notFound } from "next/navigation";
import companies from "@/data/companies.json";
import { Star, ShieldCheck, MapPin, Globe, Mail, Phone, CheckCircle, ExternalLink, ThumbsUp, Filter, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import ReviewsPerPageSelector from "@/components/ReviewsPerPageSelector";
import ReviewsSortSelector from "@/components/ReviewsSortSelector";
import { ReviewActionButtons, SeeAllActivityButton } from "@/components/ReviewActions";

export default async function CompanyPage({
    params,
    searchParams
}: {
    params: Promise<{ domain: string }>,
    searchParams: Promise<{ page?: string, pageSize?: string }>
}) {
    const { domain } = await params;
    const { page, pageSize: pageSizeParam } = await searchParams;
    const currentPage = Number(page) || 1;
    const pageSize = Number(pageSizeParam) || 5;

    const company = companies.find((c) => c.domain === domain);

    if (!company) {
        notFound();
    }

    const totalReviews = company.reviews.length;
    const totalPages = Math.ceil(totalReviews / pageSize);
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const currentReviews = company.reviews.slice(startIdx, endIdx);

    return (
        <main className="min-h-screen bg-muted/10">
            {/* Breadcrumbs & Header Section */}
            <div className="bg-background border-b border-border sticky top-16 z-30">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-sm text-muted-foreground mb-4">
                        <Link href="/" className="hover:underline">Home</Link> &gt; <span className="text-foreground">{company.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <div className="w-32 h-32 bg-background rounded-lg border-2 border-border p-2 shrink-0 shadow-sm">
                            <div className="w-full h-full bg-muted/20 flex items-center justify-center rounded text-4xl font-bold text-primary">
                                {company.name.charAt(0)}
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.name}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <span className="text-sm text-muted-foreground">Reviews</span>
                                <span className="font-semibold">{company.reviewCount}</span>
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">Excellent</span>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <div className="flex bg-green-500 p-1 rounded">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-6 w-6 fill-white text-white ${i < Math.round(company.rating) ? "opacity-100" : "opacity-30"}`} />
                                    ))}
                                </div>
                                <span className="text-2xl font-bold">{company.rating}</span>
                            </div>
                        </div>

                        <div className="shrink-0">
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background border-2 border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-semibold"
                            >
                                Visit Website <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Reviews (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Rating Breakdown Section */}
                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-3 border-b border-border/50">
                                <CardTitle className="text-lg">Rating Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-muted-foreground">Service Quality</div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex text-green-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < Math.round(parseFloat(company.ratingBreakdown.serviceQuality)) ? "fill-current" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                            <span className="text-lg font-bold">{company.ratingBreakdown.serviceQuality}/5</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-muted-foreground">Communication & Collaboration</div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex text-green-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < Math.round(parseFloat(company.ratingBreakdown.communication)) ? "fill-current" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                            <span className="text-lg font-bold">{company.ratingBreakdown.communication}/5</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-muted-foreground">Delivery & Timeliness</div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex text-green-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < Math.round(parseFloat(company.ratingBreakdown.delivery)) ? "fill-current" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                            <span className="text-lg font-bold">{company.ratingBreakdown.delivery}/5</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-muted-foreground">Value for Money</div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex text-green-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < Math.round(parseFloat(company.ratingBreakdown.valueForMoney)) ? "fill-current" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                            <span className="text-lg font-bold">{company.ratingBreakdown.valueForMoney}/5</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-muted-foreground">Recommendation Score</div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex text-green-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < Math.round(parseFloat(company.ratingBreakdown.recommendation)) ? "fill-current" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                            <span className="text-lg font-bold">{company.ratingBreakdown.recommendation}/5</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Company Description Section */}
                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-3 border-b border-border/50">
                                <CardTitle className="text-lg">Company Description</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div
                                    className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                                    dangerouslySetInnerHTML={{ __html: company.description }}
                                />
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
                            <Card key={review.id} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* User Info Column */}
                                        <div className="md:w-48 shrink-0 flex md:flex-col items-center md:items-start gap-3 border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-4">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-bold">
                                                {review.user.charAt(0)}
                                            </div>
                                            <div className="text-sm">
                                                <div className="font-semibold">{review.user}</div>
                                                <div className="text-muted-foreground text-xs flex items-center gap-1">
                                                    {review.verified ? (
                                                        <>
                                                            <CheckCircle className="h-3 w-3 text-green-500" /> Verified
                                                        </>
                                                    ) : "Reviewer"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review Content Column */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex text-green-500">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-5 w-5 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                                            </div>

                                            <h3 className="font-bold text-lg mb-2">{review.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                                                {review.content}
                                            </p>

                                            <div className="text-xs text-muted-foreground mb-4">
                                                <span className="font-semibold">Date of experience:</span> {new Date(review.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </div>

                                            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                                                <ReviewActionButtons />
                                                <Link href={`/reviews/${review.id}`}>
                                                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium cursor-pointer ml-auto">
                                                        <Eye className="h-4 w-4" /> View
                                                    </button>
                                                </Link>
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
                                    href={`/review/${domain}?page=${currentPage - 1}&pageSize=${pageSize}`}
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
                                                href={`/review/${domain}?page=${p}&pageSize=${pageSize}`}
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
                                    href={`/review/${domain}?page=${currentPage + 1}&pageSize=${pageSize}`}
                                    className={`p-2 rounded-full border border-border hover:bg-muted transition-colors ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-3 border-b border-border/50">
                                <CardTitle className="text-lg">About {company.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                    {company.about}
                                </p>

                                <div className="space-y-4 text-sm">
                                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <a href={`mailto:${company.email}`} className="hover:underline font-medium truncate">{company.email}</a>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                        <Phone className="h-5 w-5 text-muted-foreground" />
                                        <span className="font-medium">{company.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                        <MapPin className="h-5 w-5 text-muted-foreground" />
                                        <span className="font-medium">{company.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-3 border-b border-border/50">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <ShieldCheck className="h-5 w-5 text-green-500" />
                                    Company Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-4 text-sm text-muted-foreground">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 bg-primary/10 p-1 rounded-full">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">Claimed Profile</div>
                                            <div className="text-xs">This company has claimed their profile.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 bg-primary/10 p-1 rounded-full">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">Active</div>
                                            <div className="text-xs">Replied to 98% of negative reviews within 24 hours.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-6">
                                    <SeeAllActivityButton />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </main>
    );
}
