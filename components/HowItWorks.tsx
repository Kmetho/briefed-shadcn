import { Card, CardContent } from "@/components/ui/card";
import { Share2, FileText, Download } from "lucide-react";

export default function HowItWorks() {
  return (
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
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {step}
                </div>
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
