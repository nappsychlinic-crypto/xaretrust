"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    description?: string;
    className?: string;
}

export default function PageHero({ title, subtitle, description, className }: PageHeroProps) {
    return (
        <Section className={`pt-32 pb-20 relative overflow-hidden border-b border-border/40 bg-muted/10 ${className}`}>
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center relative z-10"
            >
                {subtitle && (
                    <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
                        {subtitle}
                    </span>
                )}
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {title}
                </h1>
                {description && (
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </motion.div>
        </Section>
    );
}
