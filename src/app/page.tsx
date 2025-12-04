import { Star, ShieldCheck } from "lucide-react";
import { Eye } from "lucide-react";
import Link from "next/link";
import homeData from "@/data/home.json";
import CompaniesCarousel from "@/components/CompaniesCarousel";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import HomeHero from "@/components/HomeHero";
import WhyXareTrust from "@/components/WhyXareTrust";
import { Card, CardContent } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <HomeHero />

      {/* Categories Section */}
      <CategoriesCarousel />

      {/* Verified Businesses Carousel */}
      <CompaniesCarousel />

      {/* Recent Reviews Section */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Recent Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {homeData.recentReviews.slice(0, 3).map((review, idx) => (
              <Card key={idx} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg line-clamp-1 flex-1">{review.title}</h3>
                    <Link
                      href={`/reviews/${review.id}`}
                      className="shrink-0 p-1 hover:bg-muted rounded-full transition-colors"
                      title="View review"
                    >
                      <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </Link>
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
                        <Link href={`/review/${review.companyDomain}`} className="ml-1 font-semibold hover:underline text-foreground">
                          {review.company}
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why XareTrust Section */}
      <WhyXareTrust />
    </main>
  );
}
