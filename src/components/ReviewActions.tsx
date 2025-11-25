"use client";

import { ThumbsUp, Share2 } from "lucide-react";
import { toast } from "sonner";

export function ReviewActionButtons() {
    const handleFeatureClick = (feature: string) => {
        toast.info("This feature will be available soon", {
            description: `${feature} functionality is coming in the next update.`,
        });
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => handleFeatureClick("Helpful")}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium cursor-pointer"
            >
                <ThumbsUp className="h-4 w-4" />
                Helpful
            </button>
            <button
                onClick={() => handleFeatureClick("Share")}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium cursor-pointer"
            >
                <Share2 className="h-4 w-4" />
                Share
            </button>
        </div>
    );
}

export function SeeAllActivityButton() {
    const handleClick = () => {
        toast.info("This feature will be available soon", {
            description: "Company activity timeline is coming in the next update.",
        });
    };

    return (
        <button
            onClick={handleClick}
            className="w-full px-4 py-2 text-xs border border-border rounded-md hover:bg-muted transition-colors cursor-pointer"
        >
            See all activity
        </button>
    );
}
