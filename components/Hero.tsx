import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function Hero({ userId }: { userId: string | null }) {
  return !userId ? (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <Badge variant="secondary" className="mb-6">
          Built for creative freelancers
        </Badge>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-6 leading-none">
          Stop losing briefs
          <br />
          <span className="text-muted-foreground">in your DMs.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          Turn chaotic client messages into structured, actionable project!{" "}
          <br />
          Send a guided form, get a clean PDF.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild className="gap-2">
            <Link href="/sign-up">
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="@/app/brief/example">See example brief</Link>
          </Button>
        </div>
      </section>
      <div className="border-y border-border py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          {[
            "✓ No credit card required",
            "✓ Set up in 2 minutes",
            "✓ Works with any creative service",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
      <Badge variant="secondary" className="mb-6">
        Built for creative freelancers
      </Badge>
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-6 leading-none">
        Welcome back
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
        Let's start with a brief!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" asChild className="gap-2">
          <Link href="@/app/dashboard/page.tsx">
            Go to your dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="@/app/dashboard/new/page.tsx">Start a new brief</Link>
        </Button>
      </div>
    </section>
  );
}
