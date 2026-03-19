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
    <div className="min-h-screen flex flex-col">
      <Nav variant="form" />
      <main className="flex-1 bg-white py-20 px-4">
        <BriefForm mode="edit" briefId={id as string} initialData={formData} />
      </main>
      <Footer />
    </div>
  );
}
