"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

interface DialogContentProps {
    className?: string;
    children: React.ReactNode;
    onClose: () => void;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
            />
            {/* Content */}
            {children}
        </div>
    );
}

export function DialogContent({ className, children, onClose }: DialogContentProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={contentRef}
            className={cn(
                "relative z-50 w-full max-w-2xl bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto",
                className
            )}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Close dialog"
            >
                <X className="h-5 w-5 text-gray-500" />
            </button>
            {children}
        </div>
    );
}

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("px-8 pt-8 pb-4", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h2 className={cn("text-2xl font-semibold text-gray-800", className)}>{children}</h2>;
}

export function DialogBody({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("px-8 pb-8", className)}>{children}</div>;
}
