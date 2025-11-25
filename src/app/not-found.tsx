import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <div className="h-px w-32 mx-auto bg-border mb-4"></div>
                <p className="text-xl text-muted-foreground mb-8">This page could not be found.</p>
                <Link href="/">
                    <Button style={{ cursor: "pointer" }} className="px-6 py-3">
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
