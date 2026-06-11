"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-white rounded-2xl">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          🚀 Find Your Dream Job Easily
        </h1>
        <p className="text-gray-300 dark:text-gray-400 mb-6">
          Discover remote jobs, save your favorites, and apply faster — all in
          one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/jobs">
            <button className="bg-white dark:bg-gray-100 text-black px-6 py-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-300 transition">
              Browse Jobs
            </button>
          </Link>
          <Link href="/saved">
            <button className="border border-gray-400 dark:border-gray-500 text-white px-6 py-3 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition">
              Saved Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
