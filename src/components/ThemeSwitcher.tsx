"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";

type Theme = "light" | "dark" | "system";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>("system");
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
        setTheme(savedTheme);
        applyTheme(savedTheme);

        // Close dropdown when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-theme-switcher]')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;

        if (newTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.remove("light", "dark");
            root.classList.add(systemTheme);
        } else {
            root.classList.remove("light", "dark");
            root.classList.add(newTheme);
        }
    };

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
        setIsOpen(false);
    };

    if (!mounted) return null;

    const getCurrentIcon = () => {
        if (theme === "dark") return <Moon className="h-5 w-5" />;
        if (theme === "light") return <Sun className="h-5 w-5" />;
        return <Monitor className="h-5 w-5" />;
    };

    return (
        <div className="relative" data-theme-switcher>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                title="Change theme"
            >
                {getCurrentIcon()}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                    <button
                        onClick={() => handleThemeChange("light")}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${theme === "light" ? "bg-muted/30" : ""
                            }`}
                    >
                        <Sun className="h-5 w-5" />
                        <span className="font-medium">Light</span>
                    </button>
                    <button
                        onClick={() => handleThemeChange("dark")}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${theme === "dark" ? "bg-muted/30" : ""
                            }`}
                    >
                        <Moon className="h-5 w-5" />
                        <span className="font-medium">Dark</span>
                    </button>
                    <button
                        onClick={() => handleThemeChange("system")}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${theme === "system" ? "bg-muted/30" : ""
                            }`}
                    >
                        <Monitor className="h-5 w-5" />
                        <span className="font-medium">System</span>
                    </button>
                </div>
            )}
        </div>
    );
}
