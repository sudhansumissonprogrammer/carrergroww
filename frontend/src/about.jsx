import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-[#efefef] p-8">
      <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>

        <p className="text-slate-700 mb-4">
          JobPortal is a modern platform that connects talented job seekers with
          growing companies. Our mission is to make hiring faster, fairer, and
          more transparent for everyone — from startups to enterprises.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
        <p className="text-slate-700 mb-4">
          We believe everyone deserves a chance to build a meaningful career.
          We provide tools and resources to help candidates find roles that
          align with their skills and values, and to help companies discover the
          right talent quickly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Values</h2>
        <ul className="list-disc pl-6 text-slate-700 mb-4">
          <li>User-first experience</li>
          <li>Transparency and fairness</li>
          <li>Continuous improvement</li>
          <li>Community-driven</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Get in Touch</h2>
        <p className="text-slate-700 mb-4">
          Want to partner with us or give feedback? Reach out via our <Link to="/contact" className="text-slate-900 hover:underline">Contact page</Link> or send us a message at <strong>hello@jobportal.example</strong>.
        </p>

        <div className="mt-6 flex gap-4">
          <Link to="/" className="text-slate-700 hover:underline">Back to Home</Link>
          <Link to="/contact" className="text-slate-900 font-medium hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

export default About;

