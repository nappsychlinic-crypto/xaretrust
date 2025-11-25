"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companies = [
    { id: 1, name: "EGA Master", url: "https://upload.wikimedia.org/wikipedia/en/b/be/EGA_Master_logo.svg" },
    { id: 2, name: "Panther", url: "https://www.mixcoindustry.com/cdn/shop/collections/logo_05d133b3-7824-466e-b1c4-69a9debe10c3_1024x.jpg?v=1583117557" },
    { id: 3, name: "Irudek", url: "https://i.ytimg.com/vi/zIzyaX8Rybs/hqdefault.jpg" },
    { id: 4, name: "ACE Safety", url: "https://cdn.store-assets.com/s/369545/f/4923228.png?width=350&format=webp" },
    { id: 5, name: "Bondflex", url: "https://static.wixstatic.com/media/257e98_ebe3fc401c644e52a1b8550bd5e71d3a~mv2.png/v1/fill/w_2500,h_1162,al_c/257e98_ebe3fc401c644e52a1b8550bd5e71d3a~mv2.png" },
    { id: 6, name: "Eyevex", url: "https://eyevexonline.com/cdn/shop/files/shopify_eyevex_logo_1500x750.png?v=1692188998" },
    { id: 7, name: "Eligere", url: "https://eligere.ai/wp-content/uploads/2021/08/eligere-logo.png" },
    { id: 9, name: "Submer", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Submer_logo.png/1200px-Submer_logo.png" },
    { id: 11, name: "Nabakem", url: "https://www.nabakem.com/images/common/logo.png" },
    { id: 12, name: "Viridian", url: "https://viridian-nutrition.com/cdn/shop/files/header-logo.png?v=1674663394" },
    { id: 13, name: "USA Group", url: "https://usagroup.es/wp-content/uploads/2023/12/apple-touch-icon.png" },
    { id: 14, name: "Cypet", url: "https://cypet.eu/wp-content/uploads/2020/11/CYPET.png" }
];

export default function CompaniesCarousel() {
    return (
        <div className="w-full overflow-hidden bg-background py-12">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-2xl font-semibold text-muted-foreground uppercase tracking-widest">Verified Businesses</h2>
            </div>
            <div className="relative flex w-full overflow-hidden">
                <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

                <motion.div
                    className="flex shrink-0 gap-16 py-4 pr-16"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 60,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
                        <div key={`${company.id}-${index}`} className="flex h-20 w-40 shrink-0 items-center justify-center grayscale transition-all hover:grayscale-0 opacity-70 hover:opacity-100">
                            <img
                                src={company.url}
                                alt={company.name}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
