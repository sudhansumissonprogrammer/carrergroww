import React, { useState, useEffect } from 'react';
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom';

const DashboardLink = ({ icon, text, to }) => (
  <NavLink
    to={to}
    end={to === "/dashboard"} // Only use end for the base dashboard link
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-lg px-4 py-2 text-slate-700 transition-colors hover:bg-slate-200 ${
        isActive ? "bg-slate-200 font-semibold" : ""
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    <span>{text}</span>
  </NavLink>
);

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, userRole } = location.state || { userName: 'Guest', userRole: 'student' };
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);

  useEffect(() => {
    // On component mount, read applied jobs from localStorage
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobsCount(appliedJobs.length);
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const studentDashboard = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon="📈" title="Applied Jobs" value={appliedJobsCount} />
        <StatCard icon="👤" title="Profile Views" value="152" />
        <StatCard icon="📊" title="Application Status" value="5 Pending" />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Recommended for you</h3>
        <ul className="space-y-4">
          <JobListItem title="Frontend Developer" company="Innovate Inc." location="Remote" />
          <JobListItem title="UX/UI Designer" company="Creative Solutions" location="New York, NY" />
          <JobListItem title="Data Analyst" company="Analytics Co." location="San Francisco, CA" />
        </ul>
        <div className="text-center mt-6">
          <Link to="/jobs" className="text-slate-900 font-semibold hover:underline">
            View All Jobs &rarr;
          </Link>
        </div>
      </div>
    </>
  );

  const recruiterDashboard = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon="📂" title="Active Listings" value="5" />
        <StatCard icon="👥" title="Total Applicants" value="289" />
        <ActionCard icon="➕" title="Post a New Job" to="/jobs/new" />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Recent Applicants</h3>
        <ul className="space-y-4">
          <ApplicantListItem name="John Doe" role="Senior Frontend Developer" />
          <ApplicantListItem name="Jane Smith" role="Product Manager" />
          <ApplicantListItem name="Peter Jones" role="Backend Engineer" />
        </ul>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#efefef]">
      <div className="max-w-screen-2xl mx-auto flex gap-8 px-6 py-12">
        <aside className="w-64 hidden md:block flex-shrink-0">
          <div className="sticky top-28">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Dashboard Menu</h2>
            <nav className="space-y-2">
              <DashboardLink icon="👤" text="Account" to="/dashboard" />
              <DashboardLink icon="📄" text="Applied Jobs" to="/dashboard/applied" />
              <DashboardLink icon="🔍" text="Search Jobs" to="/jobs" />
              <DashboardLink icon="📝" text="Applications" to="/dashboard/applications" />
              <DashboardLink icon="📊" text="Statistics" to="/dashboard/statistics" />
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 capitalize">
                Welcome back, {userName}!
              </h1>
              <p className="text-slate-600 mt-1">
                Here's your {userRole} dashboard overview.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-slate-900 px-4 py-2 text-white transition-colors hover:bg-black"
            >
              Logout
            </button>
          </div>

          {userRole === 'student' ? studentDashboard : recruiterDashboard}
        </main>
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="text-3xl">
      {icon}
    </div>
    <div>
      <h4 className="text-slate-500 text-sm">{title}</h4>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, title, to }) => (
    <Link to={to} className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-semibold text-slate-800">{title}</h4>
    </Link>
);

const JobListItem = ({ title, company, location }) => (
  <li className="flex items-center justify-between p-3 border-b last:border-b-0">
    <div>
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-500">{company} | {location}</p>
    </div>
    <Link to="/jobs" className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-black transition-colors">
      View
    </Link>
  </li>
);

const ApplicantListItem = ({ name, role }) => (
    <li className="flex items-center justify-between p-3 border-b last:border-b-0">
      <div>
        <p className="font-semibold text-slate-800">{name}</p>
        <p className="text-sm text-slate-500">Applied for: {role}</p>
      </div>
      <Link to="#" className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-black transition-colors">
        View Profile
      </Link>
    </li>
  );

export default Dashboard;

