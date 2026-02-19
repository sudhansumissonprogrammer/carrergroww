import React from "react";
import { Link } from "react-router-dom";

function Remote() {
  const remoteJobs = [
    { id: 1, title: "Frontend Engineer", company: "RemoteCo", time: "Full-time" },
    { id: 2, title: "Backend Developer", company: "CloudSystems", time: "Contract" },
  ];

  const handleApply = (job) => {
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    // Note: Mock data IDs might conflict with other job pages.
    const isApplied = appliedJobs.some(appliedJob => appliedJob.id === job.id);

    if (isApplied) {
      alert(`You have already applied for "${job.title}".`);
    } else {
      appliedJobs.push(job);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      alert(`Application for "${job.title}" was successful!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#efefef] p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Remote Jobs</h1>

        <div className="grid gap-4">
          {remoteJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-slate-600">{job.company} • {job.time}</p>
              </div>
              <button onClick={() => handleApply(job)} className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-black transition-colors">Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Remote;

