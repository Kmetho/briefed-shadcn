"use client";

import { deleteBrief, getUserBriefs, type Brief } from "@/lib/supabase/briefs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser, useSession, UserButton } from "@clerk/nextjs";
import { generatePDF } from "@/lib/generatePDF";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Trash2,
  Plus,
  FileText,
  Clock,
  DollarSign,
  Link as LinkIcon,
  Check,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const { session } = useSession();
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const freeBriefsLeft = Math.max(0, 3 - briefs.length);

  useEffect(() => {
    async function loadBriefs() {
      if (!user?.id) return;
      try {
        const data = await getUserBriefs(user.id, session);
        setBriefs(data);
      } catch (error) {
        console.log("Error loading briefs:", error);
        alert("Failed to load briefs");
      } finally {
        setLoading(false);
      }
    }
    loadBriefs();
  }, [user?.id]);

  async function handleDownloadPDF(brief: Brief) {
    await generatePDF(brief);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this brief?")) return;
    try {
      await deleteBrief(id, session);
      const updated = briefs.filter((b) => b.id !== id);
      setBriefs(updated);
    } catch (error) {
      console.log("Error deleting brief:", error);
      alert("Failed to delete brief");
    }
  }

  function handleCopyLink(shareToken: string, briefId: string) {
    const shareUrl = `${window.location.origin}/brief/${shareToken}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(briefId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            briefed
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Briefs</CardDescription>
              <CardTitle className="text-4xl text-primary">
                {briefs.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-4xl text-primary">
                {briefs.filter((b) => b.status === "completed").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Free Briefs Left</CardDescription>
              <CardTitle className="text-4xl text-primary">
                {freeBriefsLeft}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Separator className="mb-10" />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Briefs</h1>
          <Button asChild>
            <Link href="/dashboard/new" className="gap-2">
              <Plus className="h-4 w-4" /> New Brief
            </Link>
          </Button>
        </div>

        {/* Empty state */}
        {briefs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No briefs yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first brief to get started.
              </p>
              <Button asChild>
                <Link href="/dashboard/new">
                  <Plus className="h-4 w-4 mr-2" /> Create Your First Brief
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Briefs grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {briefs.map((brief) => (
              <Card key={brief.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">
                        {brief.project_name}
                      </CardTitle>
                      <CardDescription className="mt-0.5">
                        {brief.client_name}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="shrink-0 capitalize">
                      {brief.project_type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  {brief.goals && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {brief.goals}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {brief.timeline && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        <Clock className="h-3 w-3" /> {brief.timeline}
                      </span>
                    )}
                    {brief.budget && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        <DollarSign className="h-3 w-3" /> {brief.budget}
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <div className="flex gap-2 w-full">
                    <Button
                      className="flex-1 gap-2"
                      size="sm"
                      onClick={() => handleDownloadPDF(brief)}
                    >
                      <Download className="h-3.5 w-3.5" /> Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(brief.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 border-border"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCopyLink(brief.share_token, brief.id)
                      }
                    >
                      {copiedId === brief.id ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <LinkIcon className="h-3.5 w-3.5" /> Share
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground w-full">
                    Created {new Date(brief.created_at).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
