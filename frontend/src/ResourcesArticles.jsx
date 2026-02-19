import React from "react";

function ResourcesArticles() {
  const articles = [
    { id: 1, title: "How to write a resume", summary: "Short guide to resumes" },
    { id: 2, title: "Ace your interviews", summary: "Preparation tips and common questions" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Articles</h2>
      <ul className="space-y-4">
        {articles.map((a) => (
          <li key={a.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-medium">{a.title}</h3>
            <p className="text-sm text-slate-600">{a.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourcesArticles;


