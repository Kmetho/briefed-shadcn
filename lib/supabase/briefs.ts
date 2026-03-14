import { createBrowserClient } from "./client";
import { createClient } from "@supabase/supabase-js";

export type Brief = {
  id: string;
  user_id: string;
  project_name: string;
  client_name: string;
  client_email: string;
  project_type: string;
  goals: string;
  target_audience: string | null;
  timeline: string | null;
  budget: string | null;
  additional_notes: string | null;
  moodboard_urls: string[] | null;
  share_token: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
  status: "draft" | "completed";
};

// Fetch all briefs for the current user
export async function getUserBriefs(
  userId: string,
  session: any,
): Promise<Brief[]> {
  const supabase = createBrowserClient(session);
  const { data, error } = await supabase
    .from("briefs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// Create a new brief
export async function createBrief(
  brief: Partial<Brief>,
  session: any,
): Promise<Brief> {
  const supabase = createBrowserClient(session);
  const { data, error } = await supabase
    .from("briefs")
    .insert(brief)
    .select()
    .single();

  if (error) throw error;
  return data ?? [];
}

// Delete a brief
export async function deleteBrief(id: string, session: any): Promise<void> {
  const supabase = createBrowserClient(session);
  await supabase.from("briefs").delete().eq("id", id);
}

// Get a single brief by share token (for public view)
export async function getBriefByShareToken(token: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const { data, error } = await supabase
    .from("briefs")
    .select("*")
    .eq("share_token", token)
    .single();

  if (error) throw error;
  return data ?? [];
}
