"use client";

import Link from "next/link";
import useSavedJobs from "@/hooks/useSavedJobs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function SavedPage() {
  const { savedJobs, toggleSave } = useSavedJobs();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">⭐ Saved Jobs</h1>

      {savedJobs.length === 0 && (
        <p className="text-center text-gray-500">No saved jobs yet.</p>
      )}

      <div className="space-y-4">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <Link href={`/jobs/${job.id}?from=saved`}>
              <div className="cursor-pointer">
                <h2 className="font-semibold text-lg">{job.title}</h2>
                <p className="text-gray-500 text-sm">{job.company_name}</p>
                <p className="text-gray-400 text-xs">
                  {job.candidate_required_location}
                </p>
              </div>
            </Link>
            <button
              onClick={() => toggleSave(job)}
              className="mt-3 bg-red-100 text-red-600 px-4 py-1 rounded-lg cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
