import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { error } = await supabase
    .from("briefs")
    .select("id", { count: "exact", head: true });
  return !error
    ? Response.json({ ok: true, date: new Date().toISOString() })
    : Response.json({ ok: false, error: error.message }, { status: 500 });
};
