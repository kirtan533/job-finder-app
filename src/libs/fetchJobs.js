export const fetchJobs = async () => {
  const res = await fetch(`https://remotive.com/api/remote-jobs`);
  const data = await res.json();
  return data.jobs;
};
