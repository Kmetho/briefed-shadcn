import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, PenLine } from "lucide-react";

export default function Hero({ userId }: { userId: string | null }) {
  return !userId ? (
    <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-6">
        Built for creative freelancers
      </p>

      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] mb-6 font-display">
        Stop losing
        <br />
        briefs in{" "}
        <span className="bg-linear-to-r from-[#ff7f11] via-[#9d8df1] to-[#b9ffb7] bg-clip-text text-transparent">
          your DMs.
        </span>
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
        Turn chaotic client messages into structured, actionable briefs. Send a
        guided form, get a clean PDF. That simple.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" asChild className="gap-2 text-sm font-semibold">
          <Link href="/sign-up">
            Start for free <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild className="text-sm">
          <Link href="/brief/00000000-0000-0000-0000-000000000001">
            See example brief
          </Link>
        </Button>
      </div>

      {/* Social proof strip */}
      <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {[
          "No credit card required",
          "Set up in 2 minutes",
          "Works with any creative service",
        ].map((t) => (
          <span key={t} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}
          </span>
        ))}
      </div>
    </section>
  ) : (
    <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-6">
        Welcome back
      </p>

      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6 font-display">
        Your briefs,
        <br />
        <span className="bg-linear-to-r from-[#ff7f11] via-[#9d8df1] to-[#b9ffb7] bg-clip-text text-transparent">
          all in one place.
        </span>
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
        Pick up where you left off or start a new project.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" asChild className="gap-2 text-sm font-semibold">
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4" /> See your briefs
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild className="gap-2 text-sm">
          <Link href="/dashboard/new">
            <PenLine className="h-4 w-4" /> Create a new brief
          </Link>
        </Button>
      </div>
    </section>
  );
}
