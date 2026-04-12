import { fetchJobs } from "@/libs/fetchJobs";
import Link from "next/link";

export async function generateStaticParams() {
  const jobs = await fetchJobs();

  return jobs.slice(0, 10).map((job) => ({ id: job.id.toString() }));
}

export default async function JobDetailsPage({ params, searchParams }) {
  const jobs = await fetchJobs();
  const { id } = await params;

  const resolvedSearchParams = await searchParams;
  const from = resolvedSearchParams?.from;
  const backHref = from === "saved" ? "/saved" : "/jobs";
  const backText = from === "saved" ? "⬅ Back to Saved" : "⬅ Back to jobs";

  const job = jobs.find((j) => String(j.id) === String(id));

  if (!job) {
    return (
      <>
        <Link href="/jobs">
          <button className="mb-4 text-sm  text-gray-500 hover:underline cursor-pointer">
            ⬅ Back to jobs
          </button>
        </Link>
        <p>No Jobs Found!</p>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <Link href={backHref}>
          <button className="mb-4 text-sm  text-gray-500 hover:underline cursor-pointer">
            {backText}
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-600 mb-2">{job.company_name}</p>
        <p className="text-sm text-gray-500 mb-4">
          {job.candidate_required_location}
        </p>
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
        <a
          href={job.url}
          target="_blank"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
