import React, { useState, useEffect } from 'react';
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom';

const DashboardLink = ({ icon, text, to }) => (
  <NavLink
    to={to}
    end={to === '/dashboard'}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-lg px-4 py-2 text-slate-700 transition-colors hover:bg-slate-200/70 ${
        isActive ? 'skeuo-card-inset font-semibold' : ''
      }`
    }
  >
    <span className="skeuo-icon-well flex h-9 w-9 items-center justify-center text-xs font-bold">{icon}</span>
    <span>{text}</span>
  </NavLink>
);

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, userRole } = location.state || { userName: 'Guest', userRole: 'student' };
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);

  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    setAppliedJobsCount(appliedJobs.length);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const studentDashboard = (
    <>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard icon="AP" title="Applied Jobs" value={appliedJobsCount} />
        <StatCard icon="PV" title="Profile Views" value="152" />
        <StatCard icon="AS" title="Application Status" value="5 Pending" />
      </div>

      <div className="skeuo-surface p-6">
        <h3 className="mb-4 text-xl font-semibold">Recommended for you</h3>
        <ul className="space-y-4">
          <JobListItem title="Frontend Developer" company="Innovate Inc." location="Remote" />
          <JobListItem title="UX/UI Designer" company="Creative Solutions" location="New York, NY" />
          <JobListItem title="Data Analyst" company="Analytics Co." location="San Francisco, CA" />
        </ul>
        <div className="mt-6 text-center">
          <Link to="/jobs" className="font-semibold text-slate-900 hover:underline">
            View All Jobs &rarr;
          </Link>
        </div>
      </div>
    </>
  );

  const recruiterDashboard = (
    <>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard icon="AL" title="Active Listings" value="5" />
        <StatCard icon="TA" title="Total Applicants" value="289" />
        <ActionCard icon="NEW" title="Post a New Job" to="/jobs/new" />
      </div>

      <div className="skeuo-surface p-6">
        <h3 className="mb-4 text-xl font-semibold">Recent Applicants</h3>
        <ul className="space-y-4">
          <ApplicantListItem name="John Doe" role="Senior Frontend Developer" />
          <ApplicantListItem name="Jane Smith" role="Product Manager" />
          <ApplicantListItem name="Peter Jones" role="Backend Engineer" />
        </ul>
      </div>
    </>
  );

  return (
    <div className="skeuo-page">
      <div className="mx-auto flex max-w-screen-2xl gap-8 px-6 py-12">
        <aside className="hidden w-64 flex-shrink-0 md:block">
          <div className="skeuo-surface sticky top-28 p-4">
            <h2 className="mb-4 text-lg font-bold text-slate-800">Dashboard Menu</h2>
            <nav className="space-y-2">
              <DashboardLink icon="AC" text="Account" to="/dashboard" />
              <DashboardLink icon="AJ" text="Applied Jobs" to="/dashboard/applied" />
              <DashboardLink icon="SJ" text="Search Jobs" to="/jobs" />
              <DashboardLink icon="AP" text="Applications" to="/dashboard/applications" />
              <DashboardLink icon="ST" text="Statistics" to="/dashboard/statistics" />
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold capitalize text-slate-900">Welcome back, {userName}!</h1>
              <p className="mt-1 text-slate-600">Here's your {userRole} dashboard overview.</p>
            </div>
            <button type="button" onClick={handleLogout} className="skeuo-btn skeuo-btn-primary px-4 py-2 text-white">
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
  <div className="skeuo-card flex items-center gap-4 p-6">
    <div className="skeuo-icon-well flex h-12 w-12 items-center justify-center text-xs font-bold">{icon}</div>
    <div>
      <h4 className="text-sm text-slate-500">{title}</h4>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, title, to }) => (
  <Link to={to} className="skeuo-card skeuo-card-hover flex flex-col items-center justify-center p-6 text-center">
    <div className="skeuo-icon-well mb-2 flex h-12 w-12 items-center justify-center text-xs font-bold">{icon}</div>
    <h4 className="font-semibold text-slate-800">{title}</h4>
  </Link>
);

const JobListItem = ({ title, company, location }) => (
  <li className="skeuo-card-inset flex items-center justify-between p-3">
    <div>
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-500">
        {company} | {location}
      </p>
    </div>
    <Link to="/jobs" className="skeuo-btn skeuo-btn-primary px-4 py-2 text-sm text-white">
      View
    </Link>
  </li>
);

const ApplicantListItem = ({ name, role }) => (
  <li className="skeuo-card-inset flex items-center justify-between p-3">
    <div>
      <p className="font-semibold text-slate-800">{name}</p>
      <p className="text-sm text-slate-500">Applied for: {role}</p>
    </div>
    <Link to="#" className="skeuo-btn skeuo-btn-primary px-4 py-2 text-sm text-white">
      View Profile
    </Link>
  </li>
);

export default Dashboard;
