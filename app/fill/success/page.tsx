import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function FillSuccess() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav variant="public" />
      <main className="flex-1 flex items-center justify-center text-center px-4">
        <div>
          <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 font-[family-name:var(--font-display)]">
            Brief submitted!
          </h1>
          <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
            Your designer will review it shortly. Thanks for taking the time!
          </p>
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/">Learn more about briefed</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
