"use client";

import useDebounce from "@/hooks/useDebounce";
import useSavedJobs from "@/hooks/useSavedJobs";
import { fetchJobs } from "@/libs/fetchJobs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  // debounce value
  const debouncedSearch = useDebounce(search, 500);

  const { savedJobs, toggleSave } = useSavedJobs();

  const router = useRouter();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    keepPreviousData: true,
  });

  useEffect(() => {
    setVisibleCount(10);
  }, [debouncedSearch]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

  if (isLoading) return <p>Loading Jobs...</p>;
  if (error) return <p>Error Fetching Jobs</p>;

  // filter jobs (client-side)
  const filteredJobs = data.filter((job) =>
    job.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🚀 Find Your Dream Job
        </h1>
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full p-3 rounded-xl border border-gray-200 shadow-sm text-sm sm:text-base mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredJobs.slice(0, visibleCount).map((job) => {
            const isSaved = savedJobs.some(
              (j) => String(j.id) === String(job.id),
            );
            return (
              <div
                className="p-4 sm:p-5 rounded-2xl bg-white shadow-md hover:shadow-xl transition"
                key={job.id}
              >
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                  {job.title}
                </h2>
                <p className="text-gray-500 text-sm">{job.company_name}</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {job.candidate_required_location}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Link href={`/jobs/${job.id}?from=jobs`}>
                    <button className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-lg">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => toggleSave(job)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg ${
                      isSaved ? "bg-red-100 text-red-600" : "bg-gray-100"
                    }`}
                  >
                    {isSaved ? "Unsave" : "Save"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {visibleCount < filteredJobs.length ? (
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="mt-6 sm:mt-8 w-full sm:w-auto mx-auto block bg-black text-white px-6 py-3 rounded-full"
          >
            Load More
          </button>
        ) : (
          <p className="mt-4 text-gray-600 text-lg justify-self-center">
            No More Jobs Available!
          </p>
        )}
      </div>
    </div>
  );
}
