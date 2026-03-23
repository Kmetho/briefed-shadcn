import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, LayoutDashboard, PenLine } from "lucide-react";

export default function Hero({ userId }: { userId: string | null }) {
  return !userId ? (
    <div>
      <section className="max-w-3xl mx-auto px-6 pt-20 sm:pt-28 pb-16 sm:pb-20 text-center">
        <Badge variant="secondary" className="mb-5 text-xs tracking-wide uppercase">
          Built for creative freelancers
        </Badge>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-5 leading-[1.05]">
          Stop losing briefs
          <br />
          <span className="text-muted-foreground">in your DMs.</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
          Turn chaotic client messages into structured, actionable briefs.
          Send a guided form, get a clean PDF.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild className="gap-2">
            <Link href="/sign-up">
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/brief/00000000-0000-0000-0000-000000000001">
              See example brief
            </Link>
          </Button>
        </div>
      </section>
      <div className="border-y border-border bg-secondary/40 py-5">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {[
            "No credit card required",
            "Set up in 2 minutes",
            "Works with any creative service",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-primary font-medium">&#10003;</span> {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <section className="max-w-3xl mx-auto px-6 pt-20 sm:pt-28 pb-16 sm:pb-20 text-center">
      <Badge variant="secondary" className="mb-5 text-xs tracking-wide uppercase">
        Welcome back
      </Badge>
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-5 leading-[1.05]">
        Your briefs,
        <br />
        <span className="text-muted-foreground">all in one place.</span>
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
        Pick up where you left off or start a new project.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" asChild className="gap-2">
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4" /> See your briefs
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild className="gap-2">
          <Link href="/dashboard/new">
            <PenLine className="h-4 w-4" /> Create a new brief
          </Link>
        </Button>
      </div>
    </section>
  );
}
