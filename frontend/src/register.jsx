import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Register() {
  const location = useLocation();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "student",
  });

  // Validation regex patterns
  const fullnameRegex = /^[a-zA-Z\s]{7,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const [errors, setErrors] = useState({});

  // Pre-fill email if coming from login redirect; otherwise clear form on mount to avoid browser autofill showing previous values
  useEffect(() => {
    if (location.state?.prefilledEmail) {
      setForm(prev => ({
        ...prev,
        email: location.state.prefilledEmail
      }));
    } else {
      // Clear form to prevent browsers from showing previously typed values
      setForm({ fullname: "", email: "", phonenumber: "", password: "", role: "student" });
      setErrors({});
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fullnameRegex.test(form.fullname)) newErrors.fullname = "Full name must be 7–30 letters and spaces.";
    if (!emailRegex.test(form.email)) newErrors.email = "Please enter a valid email address.";
    if (!phoneRegex.test(String(form.phonenumber))) newErrors.phonenumber = "Phone number must be 10 digits (optional leading +).";
    if (!passwordRegex.test(form.password)) newErrors.password = "Password must be at least 8 characters and include Upper case, lower case letters, special symbols and numbers.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Save the new user to localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    // Check if email already exists
    const emailExists = registeredUsers.some(user => user.email === form.email);
    
    if (emailExists) {
      alert("Email already registered. Please login or use a different email.");
      return;
    }
    
    // Add new user to registered users
    registeredUsers.push({
      fullname: form.fullname,
      email: form.email,
      phonenumber: form.phonenumber,
      password: form.password,
      role: form.role,
    });
    
    // Save to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    console.log("Register data:", form);
    alert("Registration successful! Please login with your credentials.");
    setForm({ fullname: "", email: "", phonenumber: "", password: "", role: "student" });
    setErrors({});
  };

  return (
    <div className="skeuo-page flex items-center justify-center p-6">
      <div className="skeuo-surface w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          {/* Hidden field to further discourage browser autofill */}
          <input type="text" name="prevent_autofill" autoComplete="off" style={{ display: 'none' }} />
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            required
            autoComplete="name"
            className="skeuo-input"
          />
          {errors.fullname && <p className="text-red-600 text-sm mt-1">{errors.fullname}</p>} 

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="skeuo-input"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>} 

          <input
            type="tel"
            name="phonenumber"
            placeholder="Phone Number"
            value={form.phonenumber}
            onChange={handleChange}
            required
            autoComplete="tel"
            className="skeuo-input"
          />
          {errors.phonenumber && <p className="text-red-600 text-sm mt-1">{errors.phonenumber}</p>} 

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="skeuo-input"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>} 

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={form.role === "student"}
                onChange={handleChange}
                className="skeuo-radio h-4 w-4 text-slate-900"
              />
              <span>Student</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={form.role === "recruiter"}
                onChange={handleChange}
                className="skeuo-radio h-4 w-4 text-slate-900"
              />
              <span>Recruiter</span>
            </label>
          </div>

          <button
            type="submit"
            className="skeuo-btn skeuo-btn-primary w-full py-3 font-semibold text-white"
          >
            Register
          </button>
        </form>

        {/* 🔗 Back to Home (since no login page yet) */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-slate-900 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
