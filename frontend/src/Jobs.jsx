import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useJobSearch } from "./JobSearchContext";
import { jobs } from "./jobData";

function CompanyLogo({ src, name }) {
  const [failed, setFailed] = React.useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!src || failed) {
    return <span className="text-sm font-bold text-slate-700">{initials}</span>;
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      className="h-7 w-7 object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Jobs() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { keyword, location } = useJobSearch();
  const selectedCategory = searchParams.get("category") || "All";
  const availableCategories = ["All", ...new Set(jobs.flatMap((job) => (job.remote ? [job.category, "Remote"] : [job.category])))];

  const normalizedKeyword = keyword.trim().toLowerCase();
  const normalizedLocation = location.trim().toLowerCase();

  const filteredJobs = jobs.filter((job) => {
    const titleMatches = !normalizedKeyword || job.title.toLowerCase().includes(normalizedKeyword);
    const companyMatches = !normalizedKeyword || job.company.toLowerCase().includes(normalizedKeyword);
    const locationMatches = !normalizedLocation || job.location.toLowerCase().includes(normalizedLocation);
    const categoryMatches =
      selectedCategory === "All" ||
      (selectedCategory === "Remote" && job.remote) ||
      job.category === selectedCategory;

    return (titleMatches || companyMatches) && locationMatches && categoryMatches;
  });

  const handleApply = (job) => {
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const isApplied = appliedJobs.some((appliedJob) => appliedJob.id === job.id);

    if (isApplied) {
      alert(`You have already applied for "${job.title}".`);
      return;
    }

    appliedJobs.push(job);
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    alert(`Application for "${job.title}" was successful!`);
  };

  const handleCategoryChange = (category) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }
    setSearchParams(nextParams);
  };

  return (
    <div className="skeuo-page p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-xl font-bold text-slate-900">Jobs</h1>
        <p className="mb-8 text-slate-600">
          Category: <span className="font-semibold text-slate-900">{selectedCategory}</span>
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {availableCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                data-active={isActive}
                className="skeuo-chip text-xs"
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="skeuo-card skeuo-card-hover flex h-full cursor-pointer flex-col p-4"
              onClick={() => navigate(`/jobs/${job.id}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(`/jobs/${job.id}`);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="skeuo-icon-well flex h-10 w-10 items-center justify-center">
                  <CompanyLogo src={job.logo} name={job.company} />
                </div>
                <button
                  onClick={(event) => event.stopPropagation()}
                  className="skeuo-btn skeuo-btn-secondary px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                >
                  Save
                </button>
              </div>

              <p className="text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wide text-slate-700">{job.company}</span>
                <span className="ml-2">{job.posted}</span>
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900">{job.title}</h3>
              <p className="mt-2 text-xs text-slate-500">{job.location}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <span key={tag} className="skeuo-chip px-2.5 py-1 text-[11px] font-medium text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <div className="skeuo-card-inset mb-3 px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">Yearly CTC</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{job.salary}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/jobs/${job.id}`);
                    }}
                    className="skeuo-btn skeuo-btn-secondary px-3 py-2 text-xs font-semibold text-slate-700"
                  >
                    View details
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleApply(job);
                    }}
                    className="skeuo-btn skeuo-btn-primary px-3 py-2 text-xs font-semibold text-white"
                  >
                    Apply now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="skeuo-surface mt-4 p-8 text-center text-slate-600">
            No demo jobs found for this category and search.
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
