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

      <main className="flex-1 bg-background py-10 sm:py-16 px-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Fill in your project brief
          </h1>
          <p className="text-sm text-muted-foreground">
            This brief was requested by a freelancer. Fill it in to get started!
          </p>
        </div>
        <ClientBriefForm
          inviteToken={token}
          userId={invite.user_id}
          clientName={invite.client_name}
          projectName={invite.project_name}
        />
      </main>

      <Footer />
    </div>
  );
}
