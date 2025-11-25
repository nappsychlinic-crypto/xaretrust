"use client";

import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
    {
        id: 1,
        title: "Navigating the ASEAN Market in 2025",
        excerpt: "Key strategies for successful market entry in Southeast Asia's fastest-growing economies.",
        date: "October 15, 2025",
        category: "Strategy",
        gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
        id: 2,
        title: "The Rise of FinTech in LATAM",
        excerpt: "How financial technology is reshaping business landscapes across Latin America.",
        date: "October 10, 2025",
        category: "Trends",
        gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
        id: 3,
        title: "Middle East Expansion: A Legal Guide",
        excerpt: "Essential regulatory considerations for setting up operations in the GCC region.",
        date: "October 5, 2025",
        category: "Legal",
        gradient: "from-orange-500/10 to-red-500/10",
    },
    {
        id: 4,
        title: "Digital Transformation in Emerging Markets",
        excerpt: "How technology is accelerating business growth in developing economies worldwide.",
        date: "September 28, 2025",
        category: "Technology",
        gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
        id: 5,
        title: "Cross-Border Payment Solutions",
        excerpt: "Streamlining international transactions for SMEs expanding into new markets.",
        date: "September 20, 2025",
        category: "Finance",
        gradient: "from-indigo-500/10 to-blue-500/10",
    },
    {
        id: 6,
        title: "Building Trust in International Markets",
        excerpt: "Strategies for establishing credibility and customer confidence in new regions.",
        date: "September 15, 2025",
        category: "Business",
        gradient: "from-teal-500/10 to-cyan-500/10",
    },
];

export default function RecentPosts() {
    return (
        <Section className="bg-muted/30">
            <div className="flex justify-between items-end mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Insights</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Stay ahead of the curve with our latest analysis and market trends.
                    </p>
                </motion.div>
                <Button variant="outline" className="hidden md:flex group">
                    View All Posts <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 group overflow-hidden">
                            {/* Gradient Header */}
                            <div className={`h-2 bg-gradient-to-r ${post.gradient}`} />

                            {/* Category Badge */}
                            <CardHeader className="relative">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary">
                                        <Tag className="h-3 w-3" />
                                        <span className="text-xs font-medium uppercase tracking-wider">{post.category}</span>
                                    </div>
                                </div>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1.5 text-xs">
                                    <Calendar className="h-3 w-3" />
                                    {post.date}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="text-sm font-medium text-foreground hover:text-primary flex items-center gap-2 transition-colors group/link"
                                >
                                    Read Article
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                </Link>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 md:hidden">
                <Button variant="outline" className="w-full group">
                    View All Posts <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </Section>
    );
}
