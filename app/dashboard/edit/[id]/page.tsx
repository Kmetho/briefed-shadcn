"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { getBriefById } from "@/lib/supabase/briefs";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BriefForm, { type BriefFormData } from "@/components/BriefForm";
import { toast } from "sonner";

export default function EditBriefPage() {
  const { id } = useParams();
  const router = useRouter();
  const { session } = useSession();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<BriefFormData>({
    project_name: "",
    client_name: "",
    client_email: "",
    project_type: "",
    goals: "",
    target_audience: "",
    timeline: "",
    budget: "",
    additional_notes: "",
    moodboard_urls: [],
    submitted_by: "freelancer",
  });

  useEffect(() => {
    async function loadBrief() {
      if (!session || !id) return;
      try {
        const brief = await getBriefById(id as string, session);
        if (!brief) {
          toast.error("Brief not found.");
          router.push("/dashboard");
          return;
        }
        setFormData({
          project_name: brief.project_name,
          client_name: brief.client_name,
          client_email: brief.client_email,
          project_type: brief.project_type,
          goals: brief.goals,
          target_audience: brief.target_audience ?? "",
          timeline: brief.timeline ?? "",
          budget: brief.budget ?? "",
          additional_notes: brief.additional_notes ?? "",
          moodboard_urls: brief.moodboard_urls ?? [],
          submitted_by: brief.submitted_by ?? "freelancer",
        });
      } catch (error) {
        console.error("Error loading brief:", error);
        toast.error("Failed to load brief.");
      } finally {
        setLoading(false);
      }
    }
    loadBrief();
  }, [session, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading brief...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav variant="form" />
      <main className="flex-1 py-10 sm:py-16 px-4">
        <div className="max-w-lg mx-auto mb-8 px-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
            Edit brief
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Update your brief
          </h1>
        </div>
        <BriefForm mode="edit" briefId={id as string} initialData={formData} />
      </main>
      <Footer />
    </div>
  );
}
