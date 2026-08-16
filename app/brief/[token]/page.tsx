import { getBriefByShareToken } from "@/lib/supabase/briefs";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import MoodboardGallery from "@/components/MoodboardGallery";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign, FileText, Image, Mail, Target, User } from "lucide-react";

export default async function SharedBriefPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const brief = await getBriefByShareToken(token);

  if (!brief) {
    notFound();
  }

  const moodboardUrls: string[] = brief.moodboard_urls || [];

  const dateStr = new Date(brief.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav variant="public" />

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <Badge variant="secondary" className="capitalize text-[10px] px-2 py-0.5">
              {brief.project_type}
            </Badge>
            <span className="text-xs text-muted-foreground">{dateStr}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tighter mb-3 font-display">
            {brief.project_name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Project brief by{" "}
            <span className="text-foreground font-semibold">
              {brief.client_name}
            </span>
          </p>
        </div>

        <Separator className="mb-10" />

        <div className="space-y-6">
          {/* Client info */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-4">
              <User className="h-3 w-3" />
              Client Information
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-muted-foreground mb-0.5">Name</p>
                <p className="text-sm font-semibold">{brief.client_name}</p>
              </div>
              {brief.client_email && (
                <div>
                  <p className="text-[11px] text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm font-semibold flex items-center gap-1.5">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    {brief.client_email}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-4">
              <FileText className="h-3 w-3" />
              Project Goals
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {brief.goals}
            </p>
          </div>

          {/* Target audience */}
          {brief.target_audience && (
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-4">
                <Target className="h-3 w-3" />
                Target Audience
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {brief.target_audience}
              </p>
            </div>
          )}

          {/* Timeline & Budget */}
          {(brief.timeline || brief.budget) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brief.timeline && (
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-4">
                    <Clock className="h-3 w-3" />
                    Timeline
                  </div>
                  <p className="text-xl font-extrabold tracking-tight font-display">
                    {brief.timeline}
                  </p>
                </div>
              )}
              {brief.budget && (
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-4">
                    <DollarSign className="h-3 w-3" />
                    Budget
                  </div>
                  <p className="text-xl font-extrabold tracking-tight font-display">
                    {brief.budget}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Additional notes */}
          {brief.additional_notes && (
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-4">
                <FileText className="h-3 w-3" />
                Additional Notes
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {brief.additional_notes}
              </p>
            </div>
          )}

          {/* Moodboard */}
          {moodboardUrls.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-4">
                <Image className="h-3 w-3" />
                Moodboard
              </div>
              <MoodboardGallery urls={moodboardUrls} />
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-border px-6 py-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="font-bold text-foreground text-sm tracking-tight font-display">
            briefed
          </span>
          <span>
            Want to create your own briefs?{" "}
            <Link
              href="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Get started free
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
