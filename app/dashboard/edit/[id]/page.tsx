"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser, useSession } from "@clerk/nextjs";
import { getBriefById, updateBrief, type Brief } from "@/lib/supabase/briefs";
import BriefForm, { type BriefFormData } from "@/components/BriefForm";
import { toast } from "sonner";

export default function EditBriefPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();
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
        <p className="text-muted-foreground">Loading brief...</p>
      </div>
    );
  }

  return (
    <BriefForm mode="edit" briefId={id as string} initialData={formData} />
  );
}
