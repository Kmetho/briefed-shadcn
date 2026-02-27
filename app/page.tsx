import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  FileText,
  Download,
  Share2,
  Upload,
  Zap,
  Shield,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight">briefed</span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
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
          Turn chaotic client messages into structured, actionable project
          briefs — in minutes. Send a guided form, get a clean PDF.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild className="gap-2">
            <Link href="/sign-up">
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/brief/example">See example brief</Link>
          </Button>
        </div>
      </section>

      {/* Social proof strip */}
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

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-center">
          How it works
        </h2>
        <p className="text-muted-foreground text-center mb-14">
          Three steps to a clean, professional brief.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Share2,
              step: "01",
              title: "Share your link",
              desc: "Send your client a personalised brief form — no account needed on their end.",
            },
            {
              icon: FileText,
              step: "02",
              title: "Client fills it in",
              desc: "A guided, step-by-step form collects goals, budget, timeline, and moodboard.",
            },
            {
              icon: Download,
              step: "03",
              title: "Download the PDF",
              desc: "Get a clean, structured brief you can reference throughout the whole project.",
            },
          ].map(({ icon: Icon, step, title, desc }) => (
            <Card key={step}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-muted-foreground">
                    {step}
                  </span>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight mb-14 text-center">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: FileText,
              title: "Multi-step form",
              desc: "Guided questions that clients actually fill in completely.",
            },
            {
              icon: Upload,
              title: "Moodboard uploads",
              desc: "Clients can attach inspiration images directly to the brief.",
            },
            {
              icon: Download,
              title: "PDF export",
              desc: "One-click export to a professional, shareable PDF.",
            },
            {
              icon: Share2,
              title: "Shareable links",
              desc: "Send a unique link for each project — no client login needed.",
            },
            {
              icon: Zap,
              title: "Dashboard",
              desc: "Manage all your briefs in one place. Search, filter, archive.",
            },
            {
              icon: Shield,
              title: "Secure by default",
              desc: "Auth powered by Clerk. Your data stays yours.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Ready to get organised?
        </h2>
        <p className="text-muted-foreground mb-8">
          Join freelancers who stopped chasing clients for project details.
        </p>
        <Button size="lg" asChild className="gap-2">
          <Link href="/sign-up">
            Create your account <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">briefed</span>
          <span>Built for creatives. © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
