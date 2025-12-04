"use client";

import { useEffect, useState } from "react";

interface CompanyDescriptionProps {
    companyId: string;
}

export default function CompanyDescription({ companyId }: CompanyDescriptionProps) {
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDescription() {
            try {
                const response = await fetch(
                    `https://www.xaregrowth.com/api/review/companyDescription/${companyId}`
                );
                const data = await response.json();
                setDescription(data.companyDescriptionMarkup || "");
            } catch (error) {
                console.error("Failed to fetch company description:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDescription();
    }, [companyId]);

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
        );
    }

    return (
        <div
            className="company-description prose prose-sm max-w-none
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-4 [&_h2]:first:mt-0
                [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
                [&_strong]:font-semibold [&_strong]:text-foreground
                [&_br]:block [&_br]:my-2"
            dangerouslySetInnerHTML={{ __html: description }}
        />
    );
}
