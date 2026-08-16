import { FileText, Upload, Download, Share2, Zap, Shield } from "lucide-react";

const features = [
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
];

export default function Features() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28 min-h-screen flex flex-col justify-center">
      <div className="mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
          Features
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
          Everything you need to
          <br />
          <span className="text-muted-foreground">brief like a pro.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group">
            <div className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center mb-4 group-hover:bg-accent group-hover:border-accent transition-colors">
              <Icon className="h-4 w-4 text-primary group-hover:text-accent-foreground transition-colors" />
            </div>
            <h3 className="font-semibold mb-1 text-sm">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
