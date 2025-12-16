"use client";

import { notFound, useParams } from "next/navigation";
import companies from "@/data/companies.json";
import { Star, ArrowLeft, ShieldCheck, ThumbsUp, Share2, Flag, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { toast } from "sonner";

export default function ReviewPage() {
    const params = useParams();
    const id = params.id as string;

    let review = null;
    let company = null;

    for (const c of companies) {
        const r = c.reviews.find((rev) => rev.id === id);
        if (r) {
            review = r;
            company = c;
            break;
        }
    }

    if (!review || !company) {
        notFound();
    }

    const handleFeatureClick = (feature: string) => {
        toast.info("This feature will be available soon", {
            description: `${feature} functionality is coming in the next update.`,
        });
    };

    return (
        <main className="min-h-screen bg-muted/10 py-12 font-sans">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link
                    href={`/review/${company.domain}`}
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to {company.name}
                </Link>

                <Card className="bg-card border-border shadow-sm">
                    <CardHeader className="border-b border-border/50 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold shrink-0">
                                {review.user.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{review.user}</h1>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>1 review</span>
                                    <span>•</span>
                                    <span>{company.location}</span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-6 w-6 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            {review.verified && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground bg-green-500/10 text-green-600 px-2 py-1 rounded-full">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Verified</span>
                                </div>
                            )}
                            <span className="text-muted-foreground text-sm ml-auto">
                                {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold mb-4">{review.title}</h2>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {review.content}
                        </p>

                        <div className="bg-muted/30 p-4 rounded-lg mb-8">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">Date of experience:</span> {new Date(review.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-border">
                            <button
                                onClick={() => handleFeatureClick("Helpful")}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium cursor-pointer"
                            >
                                <ThumbsUp className="h-4 w-4" /> Helpful
                            </button>
                            <button
                                onClick={() => handleFeatureClick("Share")}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium cursor-pointer"
                            >
                                <Share2 className="h-4 w-4" /> Share
                            </button>
                            <button
                                onClick={() => handleFeatureClick("Report")}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium ml-auto text-muted-foreground hover:text-red-500 hover:border-red-200 cursor-pointer"
                            >
                                <Flag className="h-4 w-4" /> Report
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Rating Breakdown */}
                <Card className="bg-card border-border shadow-sm mt-6">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4">Trust Score Breakdown</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Service Quality", key: "serviceQuality" },
                                { label: "Communication & Collaboration", key: "communication" },
                                { label: "Delivery & Timeliness", key: "delivery" },
                                { label: "Value for Money", key: "valueForMoney" },
                                { label: "Recommendation Score", key: "recommendation" }
                            ].map(({ label, key }) => {
                                const rating = company.ratingBreakdown?.[key as keyof typeof company.ratingBreakdown] || 0;
                                return (
                                    <div key={key} className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">{label}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-3 w-3 ${i < Math.round(Number(rating)) ? "fill-current" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold min-w-[2rem]">{rating}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
