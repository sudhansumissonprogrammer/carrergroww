import React from "react";
import { Outlet, Link } from "react-router-dom";

function Resources() {
  return (
    <div className="min-h-screen bg-[#efefef] p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Resources</h1>

        <div className="mb-4 flex gap-3">
          <Link to="/resources" className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm">Overview</Link>
          <Link to="articles" className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm">Articles</Link>
          <Link to="videos" className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm">Videos</Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Resources;

