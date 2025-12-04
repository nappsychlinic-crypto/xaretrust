"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import ContactDialog from "@/components/ContactDialog";

export default function WhyXareTrust() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-primary/10 via-background to-muted/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                        Why XareTrust?
                    </h2>

                    <div className="space-y-6 text-lg text-muted-foreground mb-10">
                        <p className="leading-relaxed">
                            We're an independent B2B review platform to help companies grow sales and track customer sentiment.
                        </p>

                        <p className="leading-relaxed">
                            XareTrust includes a CRM that allows you to manage customer information, document engagements and more!
                        </p>

                        <p className="leading-relaxed font-semibold text-xl text-foreground">
                            Contact us now to learn more!
                        </p>
                    </div>

                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        variant="primary"
                        size="lg"
                        className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        Contact Us
                    </Button>
                </div>
            </section>

            <ContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
}
