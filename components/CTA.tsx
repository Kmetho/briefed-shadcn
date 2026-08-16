import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-card border-y border-border min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 font-display">
            Ready to get organised?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Join freelancers who stopped chasing clients for project details.
          </p>
        </div>
        <Button size="lg" asChild className="gap-2 text-sm font-semibold shrink-0">
          <Link href="/sign-up">
            Create your account <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
