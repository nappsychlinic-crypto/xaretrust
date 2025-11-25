import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
    company: [
        { label: "About Us", href: "/about-us" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
    ],
    resources: [
        { label: "Blog", href: "/knowledge-centre1" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Help Center", href: "/help" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 text-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block">
                            Xare<span className="text-white/90">Trust</span>
                        </Link>
                        <p className="text-white/80 text-sm mb-6">
                            Helping businesses expand into international markets with trust and confidence.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/60 text-sm">
                        © {new Date().getFullYear()} XareTrust. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
