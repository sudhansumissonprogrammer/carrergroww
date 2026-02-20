import React from 'react';

function ResourcesIndex() {
  const resources = [
    { id: 1, title: 'Resume Tips', url: 'https://example.com/resume-tips' },
    { id: 2, title: 'Interview Prep', url: 'https://example.com/interview-prep' },
    { id: 3, title: 'Career Growth', url: 'https://example.com/career-growth' },
  ];

  return (
    <div>
      <ul className="space-y-4">
        {resources.map((r) => (
          <li key={r.id} className="skeuo-card p-4">
            <a href={r.url} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
              {r.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourcesIndex;
