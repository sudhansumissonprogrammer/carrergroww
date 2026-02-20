import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJobSearch } from "./JobSearchContext";

function Home() {
  const navigate = useNavigate();
  const { keyword, setKeyword, location, setLocation } = useJobSearch();

  const popularCategories = [
    { name: "Design", jobs: "124 open jobs" },
    { name: "Frontend", jobs: "211 open jobs" },
    { name: "Backend", jobs: "186 open jobs" },
    { name: "Marketing", jobs: "93 open jobs" },
    { name: "Data", jobs: "77 open jobs" },
    { name: "Remote", jobs: "158 open jobs" },
  ];

  const featuredRoles = [
    { title: "Product Designer", company: "Adobe", salary: "$95k - $130k", location: "San Jose, CA" },
    { title: "React Developer", company: "Google", salary: "$115k - $155k", location: "Mountain View, CA" },
    { title: "Growth Marketer", company: "Notion", salary: "$80k - $115k", location: "Remote" },
  ];

  const faqItems = [
    { q: "Do I need to pay to apply?", a: "No. Applying to jobs is free for all job seekers." },
    { q: "Are jobs verified?", a: "Yes, listings go through a basic screening process before publishing." },
    { q: "Can I find remote jobs?", a: "Yes. Use category filters or search by location with Remote." },
  ];

  const handleSearch = () => {
    navigate("/jobs");
  };

  return (
    <div className="skeuo-page text-slate-900">
      <section className="relative -mt-20 min-h-[68vh] overflow-hidden pt-20 md:min-h-[72vh]">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.62),rgba(15,23,42,0.70)),url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072')",
          }}
        />

        <div className="relative z-10 flex min-h-[68vh] flex-col items-center justify-center px-6 py-14 text-center text-white md:min-h-[72vh]">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Find Jobs That Match <span className="text-slate-200">Your Skills</span>
          </h1>

          <p className="max-w-xl text-slate-100">
            Apply to verified jobs from startups to top companies - faster and smarter.
          </p>

          <div className="skeuo-banner mt-8 flex w-full max-w-3xl flex-col gap-3 p-5 sm:flex-row sm:items-center">
            <input
              className="skeuo-input w-full text-slate-900 placeholder:text-slate-500"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input
              className="skeuo-input w-full text-slate-900 placeholder:text-slate-500 sm:max-w-xs"
              placeholder="Location or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="skeuo-btn skeuo-btn-primary rounded-2xl px-6 py-3 font-semibold sm:shrink-0"
              onClick={handleSearch}
            >
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="skeuo-surface grid grid-cols-1 gap-6 p-8 text-slate-900 sm:grid-cols-3">
            <div className="skeuo-card-inset p-4 text-center">
              <h3 className="text-3xl font-bold">10k+</h3>
              <p className="skeuo-text-muted">Active Job Seekers</p>
            </div>

            <div className="skeuo-card-inset p-4 text-center">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="skeuo-text-muted">Hiring Companies</p>
            </div>

            <div className="skeuo-card-inset p-4 text-center">
              <h3 className="text-3xl font-bold">Fast</h3>
              <p className="skeuo-text-muted">Hiring Process</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Popular Job Categories</h2>
            <Link to="/jobs" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
              View all jobs
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularCategories.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(`/jobs?category=${item.name}`)}
                className="skeuo-card skeuo-card-hover p-5 text-left"
              >
                <p className="text-lg font-semibold text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-600">{item.jobs}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <h2 className="mb-10 text-3xl font-bold">How It Works</h2>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {["Create Profile", "Search Jobs", "Apply Instantly"].map((item) => (
            <div
              key={item}
              className="skeuo-card skeuo-card-hover p-6"
            >
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold">Featured Opportunities</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredRoles.map((job) => (
              <div key={job.title} className="skeuo-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{job.company}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{job.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{job.salary}</p>
                <p className="text-sm text-slate-500">{job.location}</p>
                <button
                  onClick={handleSearch}
                  className="skeuo-btn skeuo-btn-primary mt-4 px-4 py-2 text-sm font-semibold text-white"
                >
                  Apply now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <p className="mb-8 text-lg font-semibold text-slate-600">Companies Hiring on JobPortal</p>

        <div className="mx-auto max-w-5xl overflow-x-auto pb-2">
          <div className="flex min-w-max gap-4">
            {[
              { name: "Google", logo: "/logos/google.png" },
              { name: "Amazon", logo: "/logos/amazon.png" },
              { name: "Meta", logo: "/logos/meta.png" },
              { name: "Adobe", logo: "/logos/adobe.png" },
              { name: "Airbnb", logo: "/logos/airbnb.png" },
              { name: "Apple", logo: "/logos/apple.png" },
              { name: "Oracle", logo: "/logos/oracle.png" },
              { name: "Slack", logo: "/logos/slack.png" },
              { name: "Stripe", logo: "/logos/stripe.png" },
              { name: "Notion", logo: "/logos/notion.png" },
              { name: "Dribbble", logo: "/logos/dribbble.png" },
            ].map((company) => (
              <div
                key={company.name}
                className="skeuo-card flex h-20 w-28 flex-shrink-0 items-center justify-center p-3"
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-10 w-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Easy Apply", "Apply with one click"],
            ["Best Salary", "Get paid what you deserve"],
            ["Verified Jobs", "No fake listings"],
            ["Fast Hiring", "Quick recruiter response"],
            ["Remote Jobs", "Work from anywhere"],
            ["Career Growth", "Level up your career"],
          ].map(([title, text]) => (
            <div
              key={title}
              className="skeuo-card skeuo-card-hover p-6"
            >
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="mb-8 text-3xl font-bold">What users say</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            "Got my first dev job in 3 weeks. - Aman",
            "Clean UI and real jobs. - Neha",
          ].map((text) => (
            <div
              key={text}
              className="skeuo-card max-w-xs p-6 italic"
            >
              {text}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="skeuo-surface mx-auto max-w-6xl p-8">
          <h2 className="mb-6 text-2xl font-bold">Quick Answers</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {faqItems.map((item) => (
              <div key={item.q} className="skeuo-card-inset p-4">
                <h3 className="font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 text-center">
        <div className="skeuo-surface mx-auto max-w-6xl p-12">
          <h2 className="mb-4 text-3xl font-bold">Ready to get hired?</h2>
          <Link to="/register">
            <button className="skeuo-btn skeuo-btn-primary px-8 py-3 text-white">
              Create Your Profile
            </button>
          </Link>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="skeuo-shell mx-auto grid max-w-6xl grid-cols-3 py-10 text-center">
          {[
            ["10k+", "Users"],
            ["500+", "Companies"],
            ["100+", "Cities"],
          ].map(([num, label]) => (
            <div key={label}>
              <h3 className="text-2xl font-bold">{num}</h3>
              <p className="text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="pb-8 text-center text-sm text-slate-500">
        (c) 2026 JobPortal - Built for growth
      </footer>
    </div>
  );
}

export default Home;
