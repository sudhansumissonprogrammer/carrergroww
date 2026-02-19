import React from "react";
import { Link, useParams } from "react-router-dom";
import { jobs } from "./jobData";

const roleHighlights = {
  Frontend: {
    summary:
      "Build polished, high-performance product experiences with close collaboration across product, design, and engineering.",
    responsibilities: [
      "Design and ship user-facing features from concept to production.",
      "Collaborate with product managers and designers to refine UX flows.",
      "Improve accessibility, responsiveness, and visual consistency.",
      "Monitor and optimize performance of critical user journeys.",
    ],
    requirements: [
      "Strong portfolio that demonstrates modern product thinking.",
      "Experience with design systems and component-based workflows.",
      "Ability to communicate design rationale to technical teams.",
    ],
  },
  Remote: {
    summary:
      "Work asynchronously with a distributed team to ship high-quality product outcomes across time zones.",
    responsibilities: [
      "Own delivery timelines and communicate progress proactively.",
      "Contribute to remote-first rituals including planning and reviews.",
      "Create clear documentation that enables async collaboration.",
      "Drive quality by testing and iterating with stakeholder feedback.",
    ],
    requirements: [
      "Proven ability to self-manage and prioritize independently.",
      "Strong written communication and documentation habits.",
      "Comfort with remote collaboration tools and workflows.",
    ],
  },
  Internship: {
    summary:
      "Learn by building meaningful product work with mentorship from experienced team members.",
    responsibilities: [
      "Support production tasks across design and product workflows.",
      "Participate in feedback cycles and design critiques.",
      "Contribute ideas and lightweight prototypes for new features.",
      "Document learnings and communicate progress clearly.",
    ],
    requirements: [
      "Portfolio or case studies that show problem-solving process.",
      "Strong curiosity and willingness to iterate on feedback.",
      "Foundational understanding of modern UI/UX principles.",
    ],
  },
  Backend: {
    summary:
      "Help scale reliable platform capabilities that power product features and internal teams.",
    responsibilities: [
      "Design and improve core services for reliability and speed.",
      "Collaborate with frontend teams on API contracts and delivery.",
      "Support observability, monitoring, and incident readiness.",
      "Contribute to architecture decisions with long-term thinking.",
    ],
    requirements: [
      "Strong understanding of backend architecture fundamentals.",
      "Experience with APIs, performance tuning, and data modeling.",
      "Ability to write maintainable, testable production code.",
    ],
  },
};

const defaultRoleContent = {
  summary:
    "Join a fast-moving team where you can deliver meaningful work and grow with strong cross-functional collaboration.",
  responsibilities: [
    "Contribute to planning, implementation, and delivery of features.",
    "Collaborate across teams to improve product quality and outcomes.",
    "Maintain high standards for execution, communication, and impact.",
  ],
  requirements: [
    "Strong communication and collaboration skills.",
    "Ability to manage priorities in a dynamic environment.",
    "Demonstrated ownership and quality-focused execution.",
  ],
};

function JobDetails() {
  const { jobId } = useParams();
  const job = jobs.find((item) => item.id === Number(jobId));
  const roleContent = roleHighlights[job?.category] || defaultRoleContent;

  const handleApply = () => {
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

  if (!job) {
    return (
      <div className="min-h-screen bg-[#efefef] px-4 py-8 md:px-6">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-2xl font-bold text-slate-900">Job not found</h1>
          <p className="mt-2 text-slate-600">The selected job card does not exist.</p>
          <Link to="/jobs" className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#efefef] px-4 py-8 md:px-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-white px-6 py-4 md:px-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M12.5 4.5L7 10l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
        </div>
        <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-6 py-8 text-white md:px-8 md:py-10">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200">{job.company}</p>
              <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{job.title}</h1>
              <p className="mt-4 text-sm text-slate-200 md:text-base">
                {job.location} • {job.type} • Posted {job.posted}
              </p>
            </div>
            <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-200">Compensation</p>
              <p className="mt-1 text-2xl font-semibold">{job.salary}</p>
              <p className="mt-3 text-sm text-slate-200">Category: {job.category}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[1fr_280px] md:p-8">
          <section>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {tag}
                </span>
              ))}
              {job.remote && (
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Remote friendly
                </span>
              )}
            </div>

            <div className="mt-7 space-y-7">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">About this role</h2>
                <p className="mt-2 leading-7 text-slate-600">{roleContent.summary}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">What you will do</h2>
                <ul className="mt-3 space-y-2 text-slate-600">
                  {roleContent.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2 leading-7">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">Preferred qualifications</h2>
                <ul className="mt-3 space-y-2 text-slate-600">
                  {roleContent.requirements.map((item) => (
                    <li key={item} className="flex gap-2 leading-7">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Role Snapshot</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Company:</span> {job.company}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Location:</span> {job.location}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Work type:</span> {job.type}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Category:</span> {job.category}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <button
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                onClick={handleApply}
              >
                Apply now
              </button>
              <Link
                to="/jobs"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Back to all jobs
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
