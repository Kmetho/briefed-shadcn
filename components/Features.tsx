import { FileText, Upload, Download, Share2, Zap, Shield } from "lucide-react";

export default function Features() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 sm:py-24">
      <p className="text-xs uppercase tracking-widest text-primary font-medium text-center mb-3">
        Features
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">
        Everything you need to brief like a pro.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
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
          <div key={title} className="flex gap-3.5">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-0.5 text-sm">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
