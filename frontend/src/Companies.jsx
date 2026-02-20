import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const companies = [
  { id: 1, name: "Google", type: "Product", size: "Large team", location: "Mountain View, CA", openRoles: 42, posted: "2 days ago", logo: "/logos/google.png", tags: ["Product", "Enterprise"] },
  { id: 2, name: "StartupX", type: "Startup", size: "Small team", location: "Remote", openRoles: 8, posted: "5 days ago", logo: "/logos/notion.png", tags: ["Startup", "Remote-first"] },
  { id: 3, name: "Acme Corp", type: "Enterprise", size: "Medium team", location: "New York, NY", openRoles: 19, posted: "1 week ago", logo: "/logos/oracle.png", tags: ["Enterprise", "Hybrid"] },
  { id: 4, name: "Adobe", type: "Product", size: "Large team", location: "San Jose, CA", openRoles: 27, posted: "4 days ago", logo: "/logos/adobe.png", tags: ["Product", "Design"] },
  { id: 5, name: "RemoteLabs", type: "Remote-First", size: "Medium team", location: "Remote", openRoles: 14, posted: "3 days ago", logo: "/logos/slack.png", tags: ["Remote-first", "Tech"] },
  { id: 6, name: "DataForge", type: "Startup", size: "Small team", location: "Austin, TX", openRoles: 11, posted: "6 days ago", logo: "/logos/stripe.png", tags: ["Startup", "Data"] },
];

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

function Companies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const availableCategories = ["All", ...new Set(companies.map((company) => company.type))];

  const filteredCompanies = companies.filter(
    (company) => selectedCategory === "All" || company.type === selectedCategory,
  );

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
        <h1 className="mb-2 text-xl font-bold text-slate-900">Companies</h1>
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
          {filteredCompanies.map((company) => (
            <div key={company.id} className="skeuo-card p-3.5">
              <div className="mb-3 flex items-start justify-between">
                <div className="skeuo-icon-well flex h-9 w-9 items-center justify-center rounded-full">
                  <CompanyLogo src={company.logo} name={company.name} />
                </div>
                <button className="skeuo-btn skeuo-btn-secondary rounded-md px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  Save
                </button>
              </div>

              <p className="text-xs text-slate-700">
                <span className="font-semibold text-slate-900">{company.name}</span>
                <span className="ml-2 text-slate-500">{company.posted}</span>
              </p>
              <h3 className="mt-1.5 text-xl font-semibold leading-tight text-slate-900">Hiring Across Teams</h3>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {company.tags.map((tag) => (
                  <span key={tag} className="skeuo-chip rounded-md px-2 py-0.5 text-[11px] text-slate-800">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="skeuo-divider mt-5 pt-2.5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{company.openRoles} roles</p>
                    <p className="text-xs text-slate-500">{company.size} | {company.location}</p>
                  </div>
                  <Link
                    to={`/jobs?category=${company.location === "Remote" ? "Remote" : "All"}`}
                    className="skeuo-btn skeuo-btn-primary rounded-md px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    View jobs
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="skeuo-surface mt-4 p-8 text-center text-slate-600">
            No demo companies found for this category.
          </div>
        )}
      </div>
    </div>
  );
}

export default Companies;
