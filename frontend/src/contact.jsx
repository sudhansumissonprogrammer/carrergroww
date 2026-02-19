import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const nameRegex = /^[a-zA-Z\s]{7,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const n = {};
    if (!nameRegex.test(form.name)) n.name = "Enter a valid name (7-30 letters).";
    if (!emailRegex.test(form.email)) n.email = "Enter a valid email.";
    if (!form.message || form.message.trim().length < 10) n.message = "Message must be at least 10 characters.";
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("contacts", JSON.stringify(contacts));

    setStatus("Thanks! Your message has been sent.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});

    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#efefef] p-6">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>

        <p className="text-sm text-slate-600 text-center mb-6">Have a question or need help? Send us a message.</p>

        {status && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{status}</div>}

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <input type="text" name="prevent_autofill" autoComplete="off" style={{ display: 'none' }} />

          <div>
            <input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              name="subject"
              placeholder="Subject (optional)"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition">Send Message</button>
            <Link to="/" className="text-sm text-slate-600 hover:underline">Back Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

