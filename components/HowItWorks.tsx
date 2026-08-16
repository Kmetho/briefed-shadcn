import { Share2, FileText, Download } from "lucide-react";

const steps = [
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
];

export default function HowItWorks() {
  return (
    <section className="bg-card border-y border-border min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28 w-full">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          {/* Left heading */}
          <div className="lg:max-w-xs lg:sticky lg:top-24 shrink-0">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
              Three steps
              <br />
              to a clean brief.
            </h2>
          </div>

          {/* Right steps */}
          <div className="flex-1 lg:max-w-lg space-y-10">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-xs font-bold tracking-tight text-accent-foreground font-display">
                    {step}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
