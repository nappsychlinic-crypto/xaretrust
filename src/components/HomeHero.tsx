"use client";

import { motion } from "framer-motion";
import homeData from "@/data/home.json";
import CompanySearchBar from "./CompanySearchBar";

export default function HomeHero() {
    return (
        <section className="relative py-20 md:py-24 flex items-center justify-center bg-background">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight text-blue-800">
                        Trusted B2B Brands & Suppliers
                    </h1>

                    <CompanySearchBar />
                </motion.div>
            </div>
        </section>
    );
}
