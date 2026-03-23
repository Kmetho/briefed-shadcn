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
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-5" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
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
