import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="skeuo-page p-8">
      <div className="skeuo-surface mx-auto max-w-4xl p-8">
        <h1 className="mb-4 text-3xl font-bold">About Us</h1>

        <p className="mb-4 text-slate-700">
          JobPortal is a modern platform that connects talented job seekers with growing companies. Our mission is to make hiring faster,
          fairer, and more transparent for everyone - from startups to enterprises.
        </p>

        <h2 className="mb-3 mt-6 text-2xl font-semibold">Our Mission</h2>
        <p className="mb-4 text-slate-700">
          We believe everyone deserves a chance to build a meaningful career. We provide tools and resources to help candidates find roles
          that align with their skills and values, and to help companies discover the right talent quickly.
        </p>

        <h2 className="mb-3 mt-6 text-2xl font-semibold">Our Values</h2>
        <ul className="mb-4 list-disc pl-6 text-slate-700">
          <li>User-first experience</li>
          <li>Transparency and fairness</li>
          <li>Continuous improvement</li>
          <li>Community-driven</li>
        </ul>

        <h2 className="mb-3 mt-6 text-2xl font-semibold">Get in Touch</h2>
        <p className="mb-4 text-slate-700">
          Want to partner with us or give feedback? Reach out via our{' '}
          <Link to="/contact" className="text-slate-900 hover:underline">
            Contact page
          </Link>{' '}
          or send us a message at <strong>hello@jobportal.example</strong>.
        </p>

        <div className="mt-6 flex gap-4">
          <Link to="/" className="skeuo-btn skeuo-btn-secondary px-4 py-2 text-slate-700">
            Back to Home
          </Link>
          <Link to="/contact" className="skeuo-btn skeuo-btn-primary px-4 py-2 font-medium text-white">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
