import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Download, Share2, Zap, Shield } from "lucide-react";

export default function Features() {
  return (
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
  );
}
