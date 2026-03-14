import { createClient } from "@supabase/supabase-js";

export function createBrowserClient(session: any) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      async accessToken() {
          return session?.getToken() ?? null;
      },
    }
  );
}
