"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useState } from "react";

const tiers = [
    {
        name: "Free",
        price: "$0",
        period: "/ year",
        description: "Essential tools for early-stage startups.",
        features: [
            { name: "Readiness Self Assessment", included: true },
            { name: "Trust Score (Up to 5 contacts)", included: true },
            { name: "My Document Sharing (1MB, 2 users)", included: true },
            { name: "Access to Training Courses", included: false },
            { name: "Specialist Consultation", included: false },
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Starter",
        price: "$495",
        period: "/ year",
        description: "For small businesses ready to grow.",
        features: [
            { name: "Readiness Self Assessment", included: true },
            { name: "Trust Score (Up to 50 contacts)", included: true },
            { name: "My Document Sharing (2GB, 10 users)", included: true },
            { name: "Access to Training Courses", included: false },
            { name: "Specialist Consultation", included: false },
        ],
        cta: "Upgrade to Starter",
        popular: false,
    },
    {
        name: "Basic",
        price: "$995",
        period: "/ year",
        description: "Expanding capabilities for growing teams.",
        features: [
            { name: "Readiness Self Assessment", included: true },
            { name: "Trust Score (Up to 100 contacts)", included: true },
            { name: "My Document Sharing (50GB, 25 users)", included: true },
            { name: "Access to Training Courses", included: true },
            { name: "Specialist Consultation", included: false },
        ],
        cta: "Go Basic",
        popular: true,
    },
    {
        name: "Advance",
        price: "$1,995",
        period: "/ year",
        description: "Advanced features for established businesses.",
        features: [
            { name: "Readiness Self Assessment", included: true },
            { name: "Trust Score (Unlimited)", included: true },
            { name: "My Document Sharing (500GB, 50 users)", included: true },
            { name: "Access to Training Courses", included: true },
            { name: "Specialist Consultation", included: false },
        ],
        cta: "Choose Advance",
        popular: false,
    },
    {
        name: "Pro",
        price: "$3,795",
        period: "/ year",
        description: "Maximum power and support for scaling enterprises.",
        features: [
            { name: "Readiness Self Assessment", included: true },
            { name: "Trust Score (Unlimited)", included: true },
            { name: "My Document Sharing (1TB, 100 users)", included: true },
            { name: "Access to Training Courses", included: true },
            { name: "Specialist Consultation (1x/quarter)", included: true },
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                title="Simple, Transparent Pricing"
                subtitle="Plans for Every Stage"
                description="Choose the plan that fits your expansion goals. No hidden fees."
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Card
                                className={`relative flex flex-col h-full ${tier.popular ? 'border-primary shadow-lg shadow-primary/10 scale-105 z-10' : 'border-border/50 hover:border-primary/30'} transition-all`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Recommended
                                    </div>
                                )}
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                                    <CardDescription className="text-xs h-8">{tier.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold">{tier.price}</span>
                                        <span className="text-muted-foreground text-sm">{tier.period}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start text-xs text-muted-foreground">
                                                {feature.included ? (
                                                    <Check className="h-3.5 w-3.5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <X className="h-3.5 w-3.5 text-muted mr-2 flex-shrink-0 mt-0.5 opacity-50" />
                                                )}
                                                <span className={feature.included ? "text-foreground" : "opacity-50"}>{feature.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" variant={tier.popular ? "primary" : "outline"} size="sm">
                                        {tier.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
