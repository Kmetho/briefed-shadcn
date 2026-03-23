import { getBriefByShareToken } from "@/lib/supabase/briefs";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import MoodboardGallery from "@/components/MoodboardGallery";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign, FileText, Mail, Target, User } from "lucide-react";

export default async function SharedBriefPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const brief = await getBriefByShareToken(token);
  const moodboardUrls: string[] = brief?.moodboard_urls || [];

  if (!brief) {
    notFound();
  }

  const dateStr = new Date(brief.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Nav variant="public" />

      <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-3">
            <Badge variant="secondary" className="capitalize text-[10px] px-2 py-0.5">
              {brief.project_type}
            </Badge>
            <span className="text-xs text-muted-foreground">{dateStr}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-2">
            {brief.project_name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Project brief by{" "}
            <span className="text-foreground font-medium">
              {brief.client_name}
            </span>
          </p>
        </div>

        <Separator className="mb-8" />

        <div className="space-y-5">
          <Card className="border-border/60">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                <User className="h-3 w-3" />
                Client Information
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground mb-0.5">Name</p>
                  <p className="text-sm font-medium">{brief.client_name}</p>
                </div>
                {brief.client_email && (
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm font-medium flex items-center gap-1.5">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {brief.client_email}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                <FileText className="h-3 w-3" />
                Project Goals
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {brief.goals}
              </p>
            </CardContent>
          </Card>

          {brief.target_audience && (
            <Card className="border-border/60">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                  <Target className="h-3 w-3" />
                  Target Audience
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {brief.target_audience}
                </p>
              </CardContent>
            </Card>
          )}

          {(brief.timeline || brief.budget) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brief.timeline && (
                <Card className="border-border/60">
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Timeline
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <p className="text-xl font-bold tracking-tight">
                      {brief.timeline}
                    </p>
                  </CardContent>
                </Card>
              )}
              {brief.budget && (
                <Card className="border-border/60">
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      Budget
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <p className="text-xl font-bold tracking-tight">
                      {brief.budget}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {brief.additional_notes && (
            <Card className="border-border/60">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  Additional Notes
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {brief.additional_notes}
                </p>
              </CardContent>
            </Card>
          )}

          {brief.moodboard_urls && brief.moodboard_urls.length > 0 && (
            <Card className="border-border/60">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  Moodboard
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <MoodboardGallery urls={moodboardUrls} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <footer className="border-t border-border/60 px-6 py-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground text-sm tracking-tight">briefed</span>
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
