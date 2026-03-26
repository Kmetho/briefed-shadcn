"use client";

import {
  deleteBrief,
  updateBriefStatus,
  getUserBriefs,
  createInvite,
  type Brief,
} from "@/lib/supabase/briefs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser, useSession } from "@clerk/nextjs";
import { generatePDF } from "@/lib/generatePDF";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Download,
  Trash2,
  Plus,
  FileText,
  Clock,
  DollarSign,
  Link as LinkIcon,
  Check,
  Share2,
  Pencil,
} from "lucide-react";
import Nav from "@/components/Nav";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Footer from "@/components/Footer";

const STATUSES = ["all", "draft", "in progress", "completed"] as const;
type StatusFilter = (typeof STATUSES)[number];

export default function Dashboard() {
  const { user } = useUser();
  const userId = user?.id || null;
  const { session } = useSession();
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const filteredBriefs =
    statusFilter === "all"
      ? briefs
      : briefs.filter((b) => b.status === statusFilter);

  useEffect(() => {
    async function loadBriefs() {
      if (!user?.id) return;
      try {
        const data = await getUserBriefs(user.id, session);
        setBriefs(data);
      } catch (error) {
        console.error("Error loading briefs:", error);
        toast.error("Failed to load briefs");
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
    try {
      await deleteBrief(id, session);
      setBriefs((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting brief:", error);
      toast.error("Failed to delete brief");
    }
  }

  function handleCopyLink(shareToken: string, briefId: string) {
    const shareUrl = `${window.location.origin}/brief/${shareToken}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(briefId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleCreateInvite() {
    if (!user?.id || !session) return;
    try {
      const invite = await createInvite({ user_id: user.id }, session);
      const url = `${window.location.origin}/fill/${invite.token}`;
      await navigator.clipboard.writeText(url);
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2000);
      toast.success("Invite link copied! Send it to your client.");
    } catch (error) {
      console.error("Error creating invite:", error);
      toast.error("Failed to create an invite.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav variant="dashboard" userId={userId} />

      <div className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-10 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
              Dashboard
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-[family-name:var(--font-display)]">
              My Briefs
            </h1>
          </div>
          <div className="flex gap-2">
            <Button size="sm" asChild className="text-xs gap-1.5 font-semibold">
              <Link href="/dashboard/new">
                <Plus className="h-3.5 w-3.5" /> New Brief
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreateInvite}
              disabled={inviteCopied}
              className="text-xs gap-1.5"
            >
              {inviteCopied ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Copied!
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" /> Send form
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
              <FileText className="h-3 w-3" /> Total
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-[family-name:var(--font-display)]">
              {briefs.length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
              <CheckCircle className="h-3 w-3" /> Completed
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-[family-name:var(--font-display)]">
              {briefs.filter((b) => b.status === "completed").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
              <Clock className="h-3 w-3" /> In Progress
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-[family-name:var(--font-display)]">
              {briefs.filter((b) => b.status === "in progress").length}
            </p>
          </div>
        </div>

        {/* Status filters */}
        <div className="flex gap-1.5 mb-6">
          {STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`capitalize text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                statusFilter === status
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredBriefs.length === 0 ? (
          <div className="border border-dashed border-border rounded-lg flex flex-col items-center justify-center py-20 text-center">
            <FileText className="h-8 w-8 text-muted-foreground/40 mb-4" />
            {statusFilter === "all" ? (
              <>
                <h2 className="text-lg font-semibold mb-1.5 font-[family-name:var(--font-display)]">
                  No briefs yet
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Create your first brief to get started.
                </p>
                <Button size="sm" asChild className="text-xs gap-1.5">
                  <Link href="/dashboard/new">
                    <Plus className="h-3.5 w-3.5" /> Create Your First Brief
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-1.5 font-[family-name:var(--font-display)]">
                  No {statusFilter} briefs
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  You don&apos;t have any briefs with this status.
                </p>
                <button
                  className="text-xs text-primary font-medium hover:underline"
                  onClick={() => setStatusFilter("all")}
                >
                  Show all briefs
                </button>
              </>
            )}
          </div>
        ) : (
          /* Briefs grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBriefs.map((brief) => (
              <Card
                key={brief.id}
                className="flex flex-col bg-card border-border hover:border-primary/30 transition-colors"
              >
                {/* Card header area */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold truncate">
                        {brief.project_name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {brief.client_name}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="shrink-0 capitalize text-[10px] px-2 py-0.5"
                    >
                      {brief.project_type}
                    </Badge>
                  </div>
                  <Select
                    value={brief.status}
                    onValueChange={async (
                      newStatus: "draft" | "completed" | "in progress",
                    ) => {
                      try {
                        await updateBriefStatus(brief.id, newStatus, session);
                        setBriefs((prev) =>
                          prev.map((b) =>
                            b.id === brief.id
                              ? { ...b, status: newStatus }
                              : b,
                          ),
                        );
                        toast.success("Status updated!");
                      } catch (error) {
                        console.error("Error updating status:", error);
                        toast.error("Failed to update status.");
                      }
                    }}
                  >
                    <SelectTrigger className="w-32 h-6 text-[11px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Card body */}
                <CardContent className="flex-1 pt-0 px-5">
                  {brief.goals && (
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-3 leading-relaxed">
                      {brief.goals}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {brief.timeline && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        <Clock className="h-2.5 w-2.5" /> {brief.timeline}
                      </span>
                    )}
                    {brief.budget && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        <DollarSign className="h-2.5 w-2.5" /> {brief.budget}
                      </span>
                    )}
                  </div>
                </CardContent>

                {/* Card footer */}
                <CardFooter className="flex flex-col gap-2.5 pt-0 px-5 pb-5">
                  <div className="flex flex-wrap gap-1.5 w-full">
                    <Button
                      className="flex-1 gap-1.5 text-xs font-semibold"
                      size="sm"
                      onClick={() => handleDownloadPDF(brief)}
                    >
                      <Download className="h-3 w-3" /> PDF
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-8 w-8 p-0"
                    >
                      <Link href={`/dashboard/edit/${brief.id}`}>
                        <Pencil className="h-3 w-3" />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2.5 text-xs gap-1"
                      onClick={() =>
                        handleCopyLink(brief.share_token, brief.id)
                      }
                    >
                      {copiedId === brief.id ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <LinkIcon className="h-3 w-3" /> Share
                        </>
                      )}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-[family-name:var(--font-display)]">
                            Delete this brief?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete &quot;{brief.project_name}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(brief.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <p className="text-[11px] text-muted-foreground/70 w-full">
                    Created{" "}
                    {new Date(brief.created_at).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
