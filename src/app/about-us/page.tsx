"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

import PageHero from "@/components/PageHero";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <PageHero
                title="About XareTrust"
                subtitle="Who We Are"
                description="Headquartered in Singapore, we are your strategic partner for global expansion across the Middle East, LATAM, and ASEAN regions."
            />

            <Section className="bg-card/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-muted-foreground mb-4">
                            XareTrust is a platform committed to helping start-ups and SMEs grow their business, especially in international markets.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            We believe in the importance of SMEs in the economic development of communities around the world, helping more families put food on the table and more children in schools.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            To achieve our mission, XareTrust leverages technology and global networks to give SMEs access to the support they require at affordable rates.
                        </p>
                        <p className="text-muted-foreground font-medium text-primary">
                            If you give us the opportunity, we would love to be part of your growth journey.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center justify-center"
                    >
                        <div className="relative w-64 h-64 mb-6 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/10">
                            <img
                                src="https://www.xaregrowth.com/static/media/asier.70c4060f.png"
                                alt="Asier Sinde"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-1">Asier Sinde</h3>
                        <p className="text-muted-foreground mb-4">Founder</p>
                        <a
                            href="https://www.linkedin.com/in/asiersinde/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-[#0077b5] text-white rounded-full text-sm font-medium hover:bg-[#006396] transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            Connect on LinkedIn
                        </a>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
