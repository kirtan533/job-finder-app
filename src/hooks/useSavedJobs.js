"use client";

import { useEffect, useState } from "react";

export default function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("savedJobs");
    setSavedJobs(stored ? JSON.parse(stored) : []);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs, loaded]);

  const toggleSave = (job) => {
    const jobData = {
      id: job.id,
      title: job.title,
      company_name: job.company_name,
    };

    setSavedJobs((prev) => {
      const exists = prev.some((j) => String(j.id) === String(jobData.id));

      if (exists) {
        return prev.filter((j) => String(j.id) !== String(jobData.id));
      } else {
        return [...prev, jobData];
      }
    });
  };

  return { savedJobs, toggleSave };
}
