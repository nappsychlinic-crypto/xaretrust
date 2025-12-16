"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import homeData from "@/data/home.json";

export default function CategoriesCarousel() {
    // Define categories with updated transparent image paths
    const categories = [
        { id: 1, name: "HR/Accounting/Legal services", image: "/legal1.jpeg" },
        { id: 2, name: "Manufacturer/Brand Owner", image: "/brand1.jpeg" },
        { id: 3, name: "Importer/Distributor", image: "/distributor1.jpeg" },
        { id: 4, name: "Consulting/Advisory", image: "/consulting1.jpeg" },
        { id: 5, name: "Tech Solution Provider", image: "/it1.jpeg" },
    ];

    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 5;
    const totalCategories = categories.length;
    const maxIndex = Math.max(0, totalCategories - visibleCount);

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(0, prev - 1));
    };

    const isAtStart = startIndex === 0;
    const isAtEnd = startIndex >= maxIndex;

    return (
        <section className="py-16 px-4 md:px-8 container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Explore Categories</h2>

            <div className="relative hidden md:flex items-center justify-center">
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 z-10 rounded-full hidden md:flex"
                    onClick={handlePrev}
                    disabled={isAtStart}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>

                <div className="overflow-hidden w-full max-w-6xl mx-12">
                    <motion.div
                        className="flex gap-4"
                        initial={false}
                        animate={{
                            x: `-${(startIndex / categories.length) * 100}%`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ width: `${(categories.length / visibleCount) * 100}%` }}
                    >
                        {categories.map((cat, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer group h-40"
                                    style={{
                                        minWidth: `calc((100% - ${(categories.length - 1) * 16}px) / ${categories.length})`,
                                        flex: `0 0 calc((100% - ${(categories.length - 1) * 16}px) / ${categories.length})`
                                    }}
                                >
                                    <div className="w-16 h-16 mb-3 rounded-lg overflow-hidden group-hover:scale-110 transition-transform">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="font-medium text-sm text-center whitespace-nowrap">{cat.name}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 z-10 rounded-full hidden md:flex"
                    onClick={handleNext}
                    disabled={isAtEnd}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>

            {/* Mobile View - Horizontal Scroll */}
            <div className="md:hidden flex overflow-x-auto gap-4 pb-4 snap-x">
                {categories.map((cat, idx) => {
                    return (
                        <div key={idx} className="flex-shrink-0 w-32 flex flex-col items-center p-4 bg-card border border-border rounded-lg snap-center">
                            <div className="w-12 h-12 mb-2 rounded-lg overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-xs text-center">{cat.name}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
