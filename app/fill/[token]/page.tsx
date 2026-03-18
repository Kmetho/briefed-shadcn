import { getInviteByToken } from "@/lib/supabase/briefs";
import { notFound } from "next/navigation";
import ClientBriefForm from "@/components/ClientBriefForm";

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
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <span className="text-xl font-semibold tracking-tight">briefed</span>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Fill in your project brief
          </h1>
          <p className="text-muted-foreground">
            This brief was requested by a freelancer. Fill it in to get started!
          </p>
        </div>
        <ClientBriefForm
          inviteToken={token}
          userId={invite.user_id}
          clientName={invite.client_name}
          projectName={invite.project_name}
        />
      </div>
    </div>
  );
}
