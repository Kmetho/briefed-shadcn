import { getBriefByShareToken } from "@/lib/supabase/briefs";
import { notFound } from "next/navigation";

export default async function SharedBriefPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const brief = await getBriefByShareToken(token);

  if (!brief) {
    notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{brief.project_name}</h1>
      <p className="text-gray-700 mb-4">{brief.client_name}</p>
      <p className="text-gray-700 mb-4">{brief.client_email}</p>
        <p className="text-gray-700 mb-4">{brief.project_type}</p>
        <p className="text-gray-700 mb-4">{brief.goals}</p>
    </div>
  );
}
