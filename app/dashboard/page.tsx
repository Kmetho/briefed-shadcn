"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { generatePDF } from "@/lib/generatePDF";

export default function Dashboard() {
  const [briefs, setBriefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const saved = JSON.parse(localStorage.getItem("briefs") || "[]");
    setBriefs(saved);
    setLoading(false);
  }, []);

  function handleDownloadPDF(brief: any) {
    generatePDF(brief);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this brief?")) return;

    const updated = briefs.filter((b) => b.id !== id);
    setBriefs(updated);
    localStorage.setItem("briefs", JSON.stringify(updated));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <nav className="border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold hover:text-[#8B5CF6] transition-colors"
            >
              Briefed
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-black hover:text-[#8B5CF6] transition-colors font-medium"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border-2 border-black rounded-xl p-6">
            <div className="text-4xl font-bold text-[#8B5CF6] mb-2">
              {briefs.length}
            </div>
            <div className="text-gray-600">Total Briefs</div>
          </div>
          <div className="bg-white border-2 border-black rounded-xl p-6">
            <div className="text-4xl font-bold text-[#8B5CF6] mb-2">
              {briefs.filter((b) => b.status === "completed").length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white border-2 border-black rounded-xl p-6">
            <div className="text-4xl font-bold text-[#8B5CF6] mb-2">
              {3 - briefs.length < 0 ? 0 : 3 - briefs.length}
            </div>
            <div className="text-gray-600">Free Briefs Left</div>
          </div>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Briefs</h1>
          <Link
            href="/dashboard/new"
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl px-6 py-3 font-medium transition-colors"
          >
            + Create New Brief
          </Link>
        </div>

        {/* EMPTY STATE */}
        {briefs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-2">No briefs yet</h2>
            <p className="text-gray-600 mb-6">
              Create your first brief to get started
            </p>
            <Link
              href="/dashboard/new"
              className="inline-block bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl px-6 py-3 font-medium transition-colors"
            >
              Create Your First Brief
            </Link>
          </div>
        ) : (
          /* BRIEFS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {briefs.map((brief) => (
              <div
                key={brief.id}
                className="bg-white border-2 border-black rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">
                      {brief.projectName}
                    </h3>
                    <p className="text-gray-600 text-sm">{brief.clientName}</p>
                  </div>
                  <span className="bg-[#EDE9FE] text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-medium">
                    {brief.projectType}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {brief.goals}
                </p>

                <div className="flex gap-2 text-xs text-gray-500 mb-6">
                  {brief.timeline && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      ⏱️ {brief.timeline}
                    </span>
                  )}
                  {brief.budget && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      💰 {brief.budget}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadPDF(brief)}
                    className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleDelete(brief.id)}
                    className="bg-white border-2 border-black text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-400">
                  Created {new Date(brief.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
