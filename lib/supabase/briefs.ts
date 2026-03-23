import { createBrowserClient, createPublicClient } from "./client";
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
  status: "draft" | "completed" | "in progress";
  submitted_by: "freelancer" | "client";
};

export type BriefInvite = {
  id: string;
  user_id: string;
  token: string;
  // client_name: string | null;
  // project_name: string | null;
  created_at: string;
  used: boolean;
};

// fetch all briefs for the current user
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

// create a new brief
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
  return data;
}

// delete a brief
export async function deleteBrief(id: string, session: any): Promise<void> {
  const supabase = createBrowserClient(session);
  await supabase.from("briefs").delete().eq("id", id);
}

// update a brief
export async function updateBrief(
  id: string,
  updates: Partial<Brief>,
  session: any,
): Promise<Brief> {
  const supabase = createBrowserClient(session);
  const { data, error } = await supabase
    .from("briefs")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// update brief's status
export async function updateBriefStatus(
  id: string,
  status: string,
  session: any,
): Promise<void> {
  const supabase = createBrowserClient(session);
  const { error } = await supabase
    .from("briefs")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

// get a single brief by id
export async function getBriefById(
  id: string,
  session: any,
): Promise<Brief | null> {
  const supabase = createBrowserClient(session);
  const { data, error } = await supabase
    .from("briefs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

// get a single brief by share token (for public view)
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
  return data;
}

// invite (client-side, need session)
export async function createInvite(
  invite: Partial<BriefInvite>,
  session: any,
): Promise<BriefInvite> {
  const supabase = createBrowserClient(session);
  const { data, error } = await supabase
    .from("brief_invites")
    .insert(invite)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserInvites(
  userId: string,
  session: any,
): Promise<BriefInvite[]> {
  const supabase = createBrowserClient(session);
  const { data, error } = await supabase
    .from("brief_invites")
    .select("*")
    .eq("user_id", userId);
    // .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// invite (public, no auth needed)
export async function getInviteByToken(
  token: string,
): Promise<BriefInvite | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("brief_invites")
    .select("*")
    .eq("token", token)
    .eq("used", false)
    .single();

  if (error) throw error;
  return data;
}

export async function markInviteUsed(token: string): Promise<void> {
  const supabase = createPublicClient();
  const { error } = await supabase
    .from("brief_invites")
    .update({ used: true })
    .eq("token", token);

  if (error) throw error;
}

// public client for anonymous access - client filling in the form
export async function createBriefFromInvite(
  brief: Partial<Brief>,
): Promise<Brief> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("briefs")
    .insert(brief)
    .select()
    .single();

  if (error) throw error;
  return data;
}
