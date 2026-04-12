import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white rounded-2xl">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          🚀 Find Your Dream Job Easily
        </h1>

        <p className="text-gray-300 mb-6">
          Discover remote jobs, save your favorites, and apply faster — all in
          one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/jobs">
            <button className="bg-white text-black px-6 py-3 rounded-full">
              Browse Jobs
            </button>
          </Link>
          <Link href="/saved">
            <button className="border border-gray-400 px-6 py-3 rounded-full">
              Saved Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
