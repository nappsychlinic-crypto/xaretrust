"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { FileText, Video, Headphones, Crown, GraduationCap } from "lucide-react";
import PageHero from "@/components/PageHero";

const articles = [
    {
        title: "Global Expansion Trends 2025",
        category: "Trends",
        description: "Comprehensive analysis of emerging markets and expansion opportunities across ASEAN, LATAM, and Middle East regions. Learn about regulatory changes, market dynamics, and strategic entry points.",
        mediaType: "article",
        isPaid: true,
        isTraining: false,
        readTime: "15 min read",
        author: "Dr. Sarah Chen",
        keyPoints: ["Market analysis", "Regulatory insights", "Entry strategies"],
        className: "md:col-span-2 md:row-span-2",
    },
    {
        title: "Legal Pitfalls to Avoid",
        category: "Legal",
        description: "Essential regulatory considerations and common legal mistakes when expanding internationally.",
        mediaType: "article",
        isPaid: false,
        isTraining: false,
        readTime: "8 min read",
        author: "James Rodriguez",
        keyPoints: ["Compliance basics", "Common mistakes"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Hiring in New Markets",
        category: "HR",
        description: "Best practices for recruiting and managing international teams across different cultures.",
        mediaType: "video",
        isPaid: false,
        isTraining: true,
        readTime: "45 min",
        author: "Maria Santos",
        keyPoints: ["Recruitment strategies", "Cultural adaptation"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Cultural Nuances in Marketing",
        category: "Marketing",
        description: "Understanding cultural differences and adapting your marketing strategy for international success.",
        mediaType: "article",
        isPaid: false,
        isTraining: false,
        readTime: "12 min read",
        author: "Ahmed Al-Rashid",
        keyPoints: ["Cultural insights", "Localization tips", "Case studies"],
        className: "md:col-span-3 md:row-span-1",
    },
    {
        title: "Financial Planning for International Growth",
        category: "Finance",
        description: "Strategic financial planning, budgeting, and risk management for cross-border expansion.",
        mediaType: "article",
        isPaid: false,
        isTraining: false,
        readTime: "10 min read",
        author: "Robert Kim",
        keyPoints: ["Budget planning", "Risk assessment"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Supply Chain Management Podcast",
        category: "Operations",
        description: "Expert insights on building resilient international supply chains and logistics networks.",
        mediaType: "audio",
        isPaid: false,
        isTraining: true,
        readTime: "32 min",
        author: "Lisa Thompson",
        keyPoints: ["Logistics optimization", "Supplier management"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Digital Marketing Masterclass",
        category: "Marketing",
        description: "Complete video series on digital marketing strategies for emerging markets and international audiences.",
        mediaType: "video",
        isPaid: true,
        isTraining: true,
        readTime: "2.5 hours",
        author: "Carlos Mendez",
        keyPoints: ["SEO strategies", "Social media", "Analytics"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Tax Optimization Strategies",
        category: "Finance",
        description: "Navigate international tax regulations and optimize your tax structure for global operations.",
        mediaType: "article",
        isPaid: true,
        isTraining: false,
        readTime: "18 min read",
        author: "Jennifer Lee",
        keyPoints: ["Tax planning", "Compliance", "Optimization techniques"],
        className: "md:col-span-2 md:row-span-1",
    },
    {
        title: "Partnership Development Guide",
        category: "Strategy",
        description: "Building strategic partnerships and distribution networks in new international markets.",
        mediaType: "article",
        isPaid: false,
        isTraining: false,
        readTime: "11 min read",
        author: "Michael Brown",
        keyPoints: ["Partner selection", "Negotiation tips"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "E-commerce Localization",
        category: "Technology",
        description: "Technical and strategic considerations for localizing your e-commerce platform for international markets.",
        mediaType: "video",
        isPaid: false,
        isTraining: true,
        readTime: "55 min",
        author: "Priya Sharma",
        keyPoints: ["Platform setup", "Payment gateways", "UX design"],
        className: "md:col-span-1 md:row-span-2",
    },
    {
        title: "Customer Service Excellence",
        category: "Operations",
        description: "Delivering exceptional customer service across different time zones and cultural expectations.",
        mediaType: "article",
        isPaid: false,
        isTraining: false,
        readTime: "9 min read",
        author: "David Wilson",
        keyPoints: ["24/7 support", "Cultural sensitivity", "Best practices"],
        className: "md:col-span-2 md:row-span-1",
    },
    {
        title: "Market Entry Strategies",
        category: "Strategy",
        description: "Comprehensive guide to choosing the right market entry strategy for your business goals.",
        mediaType: "article",
        isPaid: true,
        isTraining: false,
        readTime: "14 min read",
        author: "Elena Popov",
        keyPoints: ["Entry modes", "Risk analysis"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Compliance & Regulations Webinar",
        category: "Legal",
        description: "Stay compliant with international regulations, data privacy laws, and industry standards.",
        mediaType: "video",
        isPaid: false,
        isTraining: true,
        readTime: "1.5 hours",
        author: "Thomas Anderson",
        keyPoints: ["GDPR", "Data privacy", "Industry standards"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Brand Positioning Internationally",
        category: "Marketing",
        description: "How to position your brand effectively in diverse international markets while maintaining consistency.",
        mediaType: "article",
        isPaid: false,
        isTraining: false,
        readTime: "10 min read",
        author: "Sophie Martin",
        keyPoints: ["Brand strategy", "Market positioning"],
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Risk Management Framework",
        category: "Strategy",
        description: "Identifying, assessing, and mitigating risks in international business expansion.",
        mediaType: "article",
        isPaid: true,
        isTraining: false,
        readTime: "16 min read",
        author: "John Patterson",
        keyPoints: ["Risk identification", "Mitigation strategies", "Monitoring"],
        className: "md:col-span-2 md:row-span-1",
    },
];

const getMediaIcon = (type: string) => {
    switch (type) {
        case "video":
            return Video;
        case "audio":
            return Headphones;
        default:
            return FileText;
    }
};

export default function KnowledgeCentrePage() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                title="Knowledge Centre"
                subtitle="Insights & Resources"
                description="Insights, guides, and resources to help you grow."
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
                    {articles.map((article, i) => {
                        const MediaIcon = getMediaIcon(article.mediaType);
                        return (
                            <motion.div
                                key={i}
                                className={cn("flex flex-col", article.className)}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                <Card className={cn("bg-card border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 flex flex-col h-full group cursor-pointer")}>
                                    <CardHeader className="flex-grow space-y-3 p-6">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                <MediaIcon className="h-4 w-4 text-primary flex-shrink-0" />
                                                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                                    {article.category}
                                                </span>
                                                <span className="text-xs text-muted-foreground">•</span>
                                                <span className="text-xs text-muted-foreground truncate">{article.author}</span>
                                                <span className="text-xs text-muted-foreground">•</span>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">{article.readTime}</span>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                {article.isPaid && (
                                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                        <Crown className="h-3 w-3" />
                                                        <span className="text-xs font-medium">Paid</span>
                                                    </div>
                                                )}
                                                {article.isTraining && (
                                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                        <GraduationCap className="h-3 w-3" />
                                                        <span className="text-xs font-medium">Training</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </CardTitle>

                                        {/* Key Points - Below title */}
                                        {article.keyPoints && article.keyPoints.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {article.keyPoints.slice(0, 3).map((point, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground"
                                                    >
                                                        {point}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <CardDescription className="line-clamp-2 text-sm">
                                            {article.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
}
