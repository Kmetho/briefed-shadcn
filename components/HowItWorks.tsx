import { Card, CardContent } from "@/components/ui/card";
import { Share2, FileText, Download } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 sm:py-24">
      <p className="text-xs uppercase tracking-widest text-primary font-medium text-center mb-3">
        How it works
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">
        Three steps to a clean, professional brief.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
          <Card key={step} className="border-border/60">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold tracking-tight">
                  {step}
                </div>
                <Icon className="h-4 w-4 text-primary/70" />
              </div>
              <h3 className="font-semibold mb-1.5 text-sm">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
