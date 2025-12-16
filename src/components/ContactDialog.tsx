"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import countries from "@/config/countriesGlobal";
import { toast } from "sonner";

interface ContactDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        companyName: "",
        country: "",
        comments: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check if all required fields are filled
    const isFormValid =
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.companyName.trim() !== "" &&
        formData.country.trim() !== "" &&
        formData.comments.trim() !== "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Thank you for your interest! We have received your request and our team will reach out to you shortly.");

                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    companyName: "",
                    country: "",
                    comments: "",
                });

                // Close dialog
                onOpenChange(false);
            } else {
                toast.error(data.error || "Failed to send your request. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while sending your request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)}>
                <DialogHeader>
                    <DialogTitle>Please provide your details to reach back to you.</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Company Name Field */}
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Company Name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Country Field */}
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Country <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                            >
                                <option value="">Select a country</option>
                                {countries.map((country) => (
                                    <option key={country.key} value={country.value}>
                                        {country.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Comments Field */}
                        <div>
                            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                                Comments <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="comments"
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                placeholder="Additional Comments"
                                rows={4}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4">
                            <Button
                                type="submit"
                                variant="outline"
                                disabled={!isFormValid || isSubmitting}
                                className="px-12 py-6 text-base font-medium border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}
