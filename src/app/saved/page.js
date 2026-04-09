"use client";

import Link from "next/link";
import useSavedJobs from "@/hooks/useSavedJobs";

export default function SavedPage() {
  const { savedJobs, toggleSave } = useSavedJobs();

  return (
    <div className="max-w-3xl mx-auto">
      {/* 🔝 TITLE */}
      <h1 className="text-2xl font-bold mb-6 text-center">⭐ Saved Jobs</h1>

      {/* ❌ EMPTY STATE */}
      {savedJobs.length === 0 && (
        <p className="text-center text-gray-500">No saved jobs yet.</p>
      )}

      {/* ✅ JOB LIST */}
      <div className="space-y-4">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            {/* 🔥 CLICKABLE AREA */}
            <Link href={`/jobs/${job.id}?from=saved`}>
              <div className="cursor-pointer">
                <h2 className="font-semibold text-lg">{job.title}</h2>
                <p className="text-gray-500 text-sm">{job.company_name}</p>
                <p className="text-gray-400 text-xs">
                  {job.candidate_required_location}
                </p>
              </div>
            </Link>

            {/* 🔘 ACTION BUTTON */}
            <button
              onClick={() => toggleSave(job)}
              className="mt-3 bg-red-100 text-red-600 px-4 py-1 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
