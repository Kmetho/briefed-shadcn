import { getInviteByToken } from "@/lib/supabase/briefs";
import { notFound } from "next/navigation";
import ClientBriefForm from "@/components/ClientBriefForm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default async function FillBriefPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invite = await getInviteByToken(token);

  if (!invite) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Nav variant="public" />

      <main className="flex-1 py-10 sm:py-16 px-4">
        <div className="max-w-lg mx-auto mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
            Brief form
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 font-[family-name:var(--font-display)]">
            Fill in your project brief
          </h1>
          <p className="text-sm text-muted-foreground">
            This brief was requested by a freelancer. Fill it in to get started!
          </p>
        </div>
        <ClientBriefForm inviteToken={token} userId={invite.user_id} />
      </main>

      <Footer />
    </div>
  );
}
