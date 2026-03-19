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

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="capitalize">
              {brief.project_type}
            </Badge>
            <span className="text-sm text-muted-foreground">{dateStr}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-3">
            {brief.project_name}
          </h1>
          <p className="text-muted-foreground">
            Project brief by{" "}
            <span className="text-foreground font-medium">
              {brief.client_name}
            </span>
          </p>
        </div>

        <Separator className="mb-10" />

        <div className="space-y-8">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                CLIENT INFORMATION
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{brief.client_name}</p>
                </div>
                {brief.client_email && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="font-medium flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      {brief.client_email}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4" />
                PROJECT GOALS
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="leading-relaxed whitespace-pre-wrap">
                {brief.goals}
              </p>
            </CardContent>
          </Card>

          {brief.target_audience && (
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Target className="h-4 w-4" />
                  TARGET AUDIENCE
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="leading-relaxed whitespace-pre-wrap">
                  {brief.target_audience}
                </p>
              </CardContent>
            </Card>
          )}

          {(brief.timeline || brief.budget) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brief.timeline && (
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      TIMELINE
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-2xl font-bold tracking-tight">
                      {brief.timeline}
                    </p>
                  </CardContent>
                </Card>
              )}
              {brief.budget && (
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      BUDGET
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-2xl font-bold tracking-tight">
                      {brief.budget}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {brief.additional_notes && (
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  ADDITIONAL NOTES
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="leading-relaxed whitespace-pre-wrap">
                  {brief.additional_notes}
                </p>
              </CardContent>
            </Card>
          )}

          {brief.moodboard_urls && (
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  MOODBOARD PICTURES
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <MoodboardGallery urls={moodboardUrls} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <footer className="border-t border-border px-6 py-8 mt-12">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">briefed</span>
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
