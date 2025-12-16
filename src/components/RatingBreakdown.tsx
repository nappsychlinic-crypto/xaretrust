"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

interface BreakdownItem {
    questionId: string;
    question: string;
    breakdownScore: number;
}

interface RatingData {
    score: number;
    breakDownScore: {
        score: number;
        totalReviews: number;
        breakdown: BreakdownItem[];
    };
}

interface RatingBreakdownProps {
    companyId: string;
}

export default function RatingBreakdown({ companyId }: RatingBreakdownProps) {
    const [ratingData, setRatingData] = useState<RatingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRatingData() {
            try {
                const response = await fetch(
                    API_ENDPOINTS.userReviewDetails(companyId)
                );
                const data = await response.json();
                setRatingData(data);
            } catch (error) {
                console.error("Failed to fetch rating breakdown:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRatingData();
    }, [companyId]);

    if (loading) {
        return (
            <div className="animate-pulse space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-1">
                        <div className="h-3 bg-muted rounded w-1/3"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (!ratingData || !ratingData.breakDownScore) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {ratingData.breakDownScore.breakdown.map((item) => (
                <div key={item.questionId} className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">
                        {item.question}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex text-[#1e40af]">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.round(item.breakdownScore)
                                        ? "fill-current"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-lg font-bold">
                            {item.breakdownScore.toFixed(1)}/5
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
