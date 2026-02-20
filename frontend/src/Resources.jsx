import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Resources() {
  return (
    <div className="skeuo-page p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Resources</h1>

        <div className="mb-4 flex gap-3">
          <Link to="/resources" className="skeuo-btn skeuo-btn-secondary px-3 py-1 text-sm">Overview</Link>
          <Link to="articles" className="skeuo-btn skeuo-btn-secondary px-3 py-1 text-sm">Articles</Link>
          <Link to="videos" className="skeuo-btn skeuo-btn-secondary px-3 py-1 text-sm">Videos</Link>
        </div>

        <div className="skeuo-surface p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Resources;
