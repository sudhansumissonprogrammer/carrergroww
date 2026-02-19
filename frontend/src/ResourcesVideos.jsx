import React from "react";

function ResourcesVideos() {
  const videos = [
    { id: 1, title: "Interview tips video", length: "5:12" },
    { id: 2, title: "Resume walkthrough", length: "3:45" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Videos</h2>
      <ul className="space-y-4">
        {videos.map((v) => (
          <li key={v.id} className="flex justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span>{v.title}</span>
            <span className="text-sm text-slate-500">{v.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourcesVideos;


