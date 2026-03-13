import { createBrowserClient } from "./client";

export type Brief = {
  id: string;
  user_id: string;
  project_name: string;
  client_name: string | null;
  client_email: string | null;
  project_type: string | null;
  goals: string | null;
  target_audience: string | null;
  timeline: string | null;
  budget: string | null;
  additional_notes: string | null;
  moodboard_urls: string[] | null;
  share_token: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
};

// Fetch all briefs for the current user
export async function getUserBriefs(userId: string): Promise<Brief[]> {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("briefs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// Create a new brief
export async function createBrief(brief: Partial<Brief>): Promise<Brief> {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("briefs")
    .insert(brief)
    .select()
    .single();

  if (error) throw error;
  return data ?? [];
}

// Delete a brief
export async function deleteBrief(id: string): Promise<void> {
  const supabase = createBrowserClient();
  await supabase.from("briefs").delete().eq("id", id);
}

// Get a single brief by share token (for public view)
export async function getBriefByShareToken(
  token: string,
): Promise<Brief | null> {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("briefs")
    .select("*")
    .eq("share_token", token)
    .single();

  if (error) throw error;
  return data ?? [];
}
