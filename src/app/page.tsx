"use client";

import { Star, ShieldCheck } from "lucide-react";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CompaniesCarousel from "@/components/CompaniesCarousel";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import HomeHero from "@/components/HomeHero";
import WhyXareTrust from "@/components/WhyXareTrust";
import { Card, CardContent } from "@/components/ui/Card";
import { API_ENDPOINTS } from "@/config/api";
import type { Company } from "@/types/company";

interface Review {
  id: string;
  user: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  company: string;
  companyId: string;
  companyWebsite: string | null;
}

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(API_ENDPOINTS.xareview());
        const companies: Company[] = await response.json();

        // Extract public testimonial reviews from all companies
        const allReviews: Review[] = [];
        companies.forEach(company => {
          const testimonials = company.scoreBreakdown.remarks
            .filter(remark => remark.remarkPublic && remark.showAsTestimonial)
            .map(remark => ({
              id: remark.uniqueId,
              user: remark.contact
                ? `${remark.contact.firstName} ${remark.contact.lastName}`
                : 'Anonymous',
              rating: Math.round(company.score),
              title: remark.contact?.title || 'Customer',
              content: remark.remark,
              date: remark.date,
              verified: true,
              company: company.companyName,
              companyId: company.companyId,
              companyWebsite: company.brandWebsite,
            }));
          allReviews.push(...testimonials);
        });

        // Sort by date (newest first) and take top 3
        allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setReviews(allReviews.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <br />
      <br />
      {/* Hero Section */}
      <HomeHero />
      <br />
      <br />


      {/* Categories Section */}
      <CategoriesCarousel />

      {/* Verified Businesses Carousel */}
      <CompaniesCarousel />

      {/* Recent Reviews Section */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Recent Reviews</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card border-border animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-20 bg-muted rounded mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-[#1e40af]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {review.content}
                    </p>
                    <div className="flex items-center mt-auto pt-4 border-t border-border">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{review.user}</span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          {review.verified && <ShieldCheck className="h-3 w-3 mr-1 text-green-500" />}
                          <span>reviewed</span>
                          <Link href={`/review/${review.companyId}`} className="ml-1 font-semibold hover:underline text-foreground">
                            {review.company}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No reviews available yet.</p>
          )}
        </div>
      </section>

      {/* Why XareTrust Section */}
      <WhyXareTrust />
    </main>
  );
}
