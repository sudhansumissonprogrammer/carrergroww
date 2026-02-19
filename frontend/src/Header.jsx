import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const jobMenu = [
    { label: "All Jobs", to: "/jobs" },
    { label: "Frontend", to: "/jobs?category=Frontend" },
    { label: "Backend", to: "/jobs?category=Backend" },
    { label: "Remote", to: "/jobs?category=Remote" },
    { label: "Internship", to: "/jobs?category=Internship" },
  ];

  const companyMenu = [
    { label: "All Companies", to: "/companies" },
    { label: "Product", to: "/companies?category=Product" },
    { label: "Startup", to: "/companies?category=Startup" },
    { label: "Enterprise", to: "/companies?category=Enterprise" },
    { label: "Remote-First", to: "/companies?category=Remote-First" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-slate-300/80 bg-white/90 px-6 py-3 shadow-[0_6px_20px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 font-bold text-white">
            C
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Career<span className="text-slate-900">Grow</span>
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <div className="relative group">
            <Link to="/jobs" className="transition hover:text-slate-950">Jobs</Link>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                {jobMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link to="/companies" className="transition hover:text-slate-950">Companies</Link>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                {companyMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link to="/resources" className="transition hover:text-slate-950">Resources</Link>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                <Link to="/resources" className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">Overview</Link>
                <Link to="/resources/articles" className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">Articles</Link>
                <Link to="/resources/videos" className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">Videos</Link>
              </div>
            </div>
          </div>
          <Link to="/contact" className="transition hover:text-slate-950">Contact</Link>
          <Link to="/about" className="transition hover:text-slate-950">About</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-black">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-black">
              Register
            </button>
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 focus:outline-none">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-slate-200/70 bg-white/95 shadow-lg backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-start gap-4 p-6 text-slate-700">
            <Link to="/jobs" className="hover:text-slate-950" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
            <div className="w-full rounded-lg bg-slate-50 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Job Categories</p>
              <div className="flex flex-wrap gap-2">
                {jobMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-full bg-white px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/companies" className="hover:text-slate-950" onClick={() => setIsMenuOpen(false)}>Companies</Link>
            <div className="w-full rounded-lg bg-slate-50 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Company Categories</p>
              <div className="flex flex-wrap gap-2">
                {companyMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-full bg-white px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/resources" className="hover:text-slate-950" onClick={() => setIsMenuOpen(false)}>Resources</Link>
            <Link to="/contact" className="hover:text-slate-950" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/about" className="hover:text-slate-950" onClick={() => setIsMenuOpen(false)}>About</Link>

            <div className="w-full border-t pt-4 flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-black">
                  Login
                </button>
              </Link>

              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-4 py-2 text-sm rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 transition">
                  Register
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
