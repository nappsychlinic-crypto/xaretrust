"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

import PageHero from "@/components/PageHero";

export default function XareviewPage() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                title="Xareview"
                subtitle="Product"
                description="Our proprietary platform for market readiness assessment. Analyze your business's potential in new markets with data-driven insights."
            />
            <Section className="pt-0 pb-16 text-center">
                <Button size="lg" className="text-lg px-8">Request Demo</Button>
            </Section>

            <Section className="bg-card/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-accent/10 rounded-2xl h-64 w-full flex items-center justify-center border border-accent/20"
                    >
                        <span className="text-accent font-medium">Product Dashboard Placeholder</span>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
