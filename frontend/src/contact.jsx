import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const nameRegex = /^[a-zA-Z\s]{7,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const n = {};
    if (!nameRegex.test(form.name)) n.name = 'Enter a valid name (7-30 letters).';
    if (!emailRegex.test(form.email)) n.email = 'Enter a valid email.';
    if (!form.message || form.message.trim().length < 10) n.message = 'Message must be at least 10 characters.';
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    setStatus('Thanks! Your message has been sent.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});

    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="skeuo-page flex min-h-screen items-center justify-center p-6">
      <div className="skeuo-surface w-full max-w-lg p-8">
        <h2 className="mb-4 text-center text-2xl font-bold">Contact Us</h2>

        <p className="mb-6 text-center text-sm text-slate-600">Have a question or need help? Send us a message.</p>

        {status && <div className="status-success mb-4 rounded p-3">{status}</div>}

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <input type="text" name="prevent_autofill" autoComplete="off" style={{ display: 'none' }} />

          <div>
            <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} className="skeuo-input" />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} className="skeuo-input" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <input name="subject" placeholder="Subject (optional)" value={form.subject} onChange={handleChange} className="skeuo-input" />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="skeuo-input"
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" className="skeuo-btn skeuo-btn-primary flex-1 py-3 font-semibold text-white">
              Send Message
            </button>
            <Link to="/" className="text-sm text-slate-600 hover:underline">
              Back Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
