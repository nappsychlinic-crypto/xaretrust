"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";

export default function CompaniesCarousel() {
    return (
        <div className="w-full bg-background py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold text-center text-muted-foreground uppercase tracking-widest mb-12">
                    Featured Business
                </h2>

                <div className="max-w-3xl mx-auto">
                    <Link href="/review/sekiminternational.com" className="block">
                        <Card className="bg-gradient-to-br from-primary/10 to-background border-2 border-primary/30 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    {/* Company Logo */}
                                    <div className="flex-shrink-0">
                                        <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border border-border">
                                            <img
                                                src="/logos/sekim.png"
                                                alt="SEKIM International"
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* Company Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-3xl font-bold text-foreground mb-2">
                                            SEKIM International
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                            <div className="flex text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-6 w-6 fill-current"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-2xl font-bold text-foreground">4.9/5</span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            At SEKIM International, we help small and medium-sized enterprises (SMEs) and start-ups to achieve successful international expansion through proven strategies and hands-on execution.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
