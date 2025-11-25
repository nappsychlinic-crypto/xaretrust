"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Image from "next/image";

const solutions = [
    {
        title: "Trust Score",
        display: 'block',
        description: "Convey trust to new B2B customers quicker by leveraging current customer satisfaction levels",
        media: { type: 'image', url: 'https://www.xaregrowth.com/images/solutions/ts.png' },
        details: [
            "Mass email a 5 question survey to your current customer base",
            "Identify trends and track customer sentiment by running periodic surveys",
            "Use your Trust Score to convey trust quicker and reduce sales cycles",
            "You decide if you want your Trust Score to be public or not"
        ]
    },
    {
        title: "Growth Readiness Assessment",
        display: 'block',
        description: "Assess your readiness for expanding your business in new international markets and new customer segments",
        media: { type: 'image', url: 'https://www.xaregrowth.com/images/solutions/rsa.png' },
        details: [
            "Free Self Assessment across 6 different categories",
            "Receive score and recommendations via email",
            "Third party assessment to get your Readiness Score",
            "Use your Readiness Score to convey trust to distributors and customers"
        ]
    },
    {
        title: "My Document Sharing",
        display: 'block',
        description: "Make it easy for your partners, clients and sales teams to access up to date sales and marketing material",
        media: { type: 'image', url: 'https://www.xaregrowth.com/images/solutions/mds.png' },
        details: [
            "Allow partners to access all supplier materials from a single portal",
            "Ensure documents accessed are always up to date",
            "Control who has access to the material at any given time",
            "Option: Feed your sales material to our AI Smart Sales engine"
        ]
    },
    {
        title: "Online Business Development Training (Coming Soon)",
        display: 'block',
        description: "Train your teams for more effective Business Development in your domestic and international markets",
        media: { type: 'image', url: 'https://www.xaregrowth.com/images/solutions/ot.png' },
        details: [
            "International Business Development Course",
            "Account Management Course",
            "Channel Sales Management Course",
            "Digital Lead Generation Course"
        ]
    },
    {
        title: "Smart Admin Document Share & Exchange (xarex.co)",
        display: 'block',
        description: "Reduce invoice payment delays and costs while cutting down time waste in sales & procurement document processing",
        media: { type: 'image', url: 'https://www.xaregrowth.com/images/solutions/sde.png' },
        details: [
            "Share your documents through a cloud folder rather than email",
            "Automate invoice payment reminders pre & post due date",
            "Reduce transaction costs when paying international suppliers",
            "Protect sensitive information from phishing attacks"
        ]
    }
];

export default function SolutionsPage() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                title="Our Solutions"
                subtitle="What We Do"
                description="Specialized expansion services for the world's most dynamic markets."
            />

            <Section>
                <div className="space-y-16">
                    {solutions.filter(s => s.display === 'block').map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-card border-border/50 hover:border-primary/50 transition-all overflow-hidden">
                                <div className={`grid grid-cols-1 ${index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-8`}>
                                    {/* Image Section */}
                                    <motion.div
                                        className={`relative h-64 lg:h-full min-h-[300px] bg-muted/20 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                                    >
                                        <Image
                                            src={solution.media.url}
                                            alt={solution.title}
                                            fill
                                            className="object-contain p-4"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </motion.div>

                                    {/* Content Section */}
                                    <div className={`flex flex-col justify-center p-6 lg:p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <CardHeader className="p-0 mb-4">
                                            <CardTitle className="text-2xl lg:text-3xl mb-3">{solution.title}</CardTitle>
                                            <CardDescription className="text-base">{solution.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <ul className="space-y-3 mb-6">
                                                {solution.details.map((detail, i) => (
                                                    <motion.li
                                                        key={i}
                                                        className="flex items-start text-sm text-muted-foreground"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + (i * 0.05) }}
                                                    >
                                                        <span className="mr-2 text-primary font-bold">•</span>
                                                        {detail}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                            <Button variant="ghost" className="group p-0 hover:bg-transparent hover:text-primary">
                                                Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
