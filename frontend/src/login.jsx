import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const demoUsers = [
    { fullname: "Demo Student", email: "student@example.com", password: "password123", role: "student" },
    { fullname: "Demo Recruiter", email: "recruiter@example.com", password: "password123", role: "recruiter" },
    { fullname: "John Doe", email: "john@gmail.com", password: "john123", role: "student" },
    { fullname: "Admin Recruiter", email: "admin@company.com", password: "admin123", role: "recruiter" },
  ];
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotStep, setForgotStep] = useState("email");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.prefilledEmail) {
      setForm(prev => ({ ...prev, email: location.state.prefilledEmail, password: "" }));
    } else {
      setForm({ email: "", password: "", role: "student" });
      setErrors({});
      setErrorMessage("");

      // Timed clear to override browsers that autofill after render
      const t = setTimeout(() => {
        setForm({ email: "", password: "", role: "student" });
      }, 150);

      return () => clearTimeout(t);
    }
  }, [location.state]);

  useEffect(() => {
    if (showForgotPassword) {
      setForgotEmail(form.email);
      setForgotMessage("");
      setForgotError("");
      setForgotStep("email");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  }, [showForgotPassword, form.email]);

  const getAllUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const passwordOverrides = JSON.parse(localStorage.getItem("passwordOverrides")) || {};
    return [...demoUsers, ...registeredUsers].map((user) => ({
      ...user,
      password: passwordOverrides[user.email] || user.password,
    }));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!emailRegex.test(form.email) || !passwordRegex.test(form.password)) {
      const newErrors = {};
      if (!emailRegex.test(form.email)) newErrors.email = "Enter a valid email address.";
      if (!passwordRegex.test(form.password)) newErrors.password = "Password must be at least 8 characters and include letters and numbers.";
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    const allUsers = getAllUsers();

    const userByEmail = allUsers.find((user) => user.email === form.email);

    // Verify if user exists with correct password
    const userExists = allUsers.find(
      (user) => user.email === form.email && user.password === form.password
    );

    if (userExists) {
      console.log("Login successful:", form);
      setErrorMessage("");
      navigate("/dashboard", {
        state: {
          userName: userExists.fullname || form.email.split('@')[0],
          userEmail: form.email,
          userRole: userExists.role,
        }
      });
    } else if (userByEmail) {
      setErrorMessage("Incorrect Password, If you want to reset password, please click Forgot password.");
    } else {
      console.log("User not found. Redirecting to register...");
      setErrorMessage("You don't have account because you have not registered");
      setTimeout(() => {
        navigate("/register", {
          state: {
            prefilledEmail: form.email,
            message: "User not found. Please register first.",
          }
        });
      }, 2000);
    }
  };

  const handleForgotPasswordSubmit = () => {
    if (!emailRegex.test(forgotEmail)) {
      setForgotError("Enter a valid email address.");
      setForgotMessage("");
      return;
    }

    const allUsers = getAllUsers();
    const userExists = allUsers.find((user) => user.email === forgotEmail);

    if (!userExists) {
      setForgotError("No account found with this email.");
      setForgotMessage("");
      return;
    }

    setForgotError("");
    setForgotMessage("");
    setForgotStep("change");
  };

  const handleChangePassword = () => {
    if (!passwordRegex.test(newPassword)) {
      setForgotError("Password must be at least 8 characters and include letters and numbers.");
      setForgotMessage("");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setForgotError("Passwords do not match.");
      setForgotMessage("");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const updatedRegisteredUsers = registeredUsers.map((user) =>
      user.email === forgotEmail ? { ...user, password: newPassword } : user
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedRegisteredUsers));

    const passwordOverrides = JSON.parse(localStorage.getItem("passwordOverrides")) || {};
    passwordOverrides[forgotEmail] = newPassword;
    localStorage.setItem("passwordOverrides", JSON.stringify(passwordOverrides));

    setForgotError("");
    setForgotMessage("Password changed successfully. You can now login with the new password.");
    setForm((prev) => ({ ...prev, email: forgotEmail, password: "" }));
    setForgotStep("email");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const fillDemoStudent = () => {
    setForm({
      email: "student@example.com",
      password: "password123",
      role: "student",
    });
  };

  const fillDemoRecruiter = () => {
    setForm({
      email: "recruiter@example.com",
      password: "password123",
      role: "recruiter",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#efefef] p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <input type="text" name="prevent_autofill" autoComplete="off" style={{ display: 'none' }} />
          

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>} 

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>} 

          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowForgotPassword((prev) => !prev)}
              className="text-sm text-slate-900 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {showForgotPassword && (
            <div className="p-4 border rounded-lg bg-[#efefef] space-y-3">
              <p className="text-sm text-slate-700">
                {forgotStep === "email" ? "Reset your password" : "Change your password"}
              </p>
              <div className="space-y-3">
                {forgotStep === "email" ? (
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                ) : (
                  <>
                    <p className="text-sm text-slate-600">
                      Resetting password for: <span className="font-medium">{forgotEmail}</span>
                    </p>
                    <input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </>
                )}
                {forgotError && <p className="text-red-600 text-sm">{forgotError}</p>}
                {forgotMessage && <p className="text-green-700 text-sm">{forgotMessage}</p>}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={forgotStep === "email" ? handleForgotPasswordSubmit : handleChangePassword}
                    className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-black transition"
                  >
                    {forgotStep === "email" ? "Continue" : "Change Password"}
                  </button>
                  {forgotStep === "change" && (
                    <button
                      type="button"
                      onClick={() => {
                        setForgotStep("email");
                        setForgotError("");
                        setForgotMessage("");
                        setNewPassword("");
                        setConfirmNewPassword("");
                      }}
                      className="px-4 py-2 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotStep("email");
                      setForgotError("");
                      setForgotMessage("");
                      setNewPassword("");
                      setConfirmNewPassword("");
                    }}
                    className="px-4 py-2 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={form.role === "student"}
                onChange={handleChange}
                className="w-4 h-4 text-slate-900"
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
                className="w-4 h-4 text-slate-900"
              />
              <span>Recruiter</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex gap-2">
          <button onClick={fillDemoStudent} className="flex-1 rounded bg-gray-200 py-2 text-xs hover:bg-gray-300">Demo Student</button>
          <button onClick={fillDemoRecruiter} className="flex-1 rounded bg-gray-200 py-2 text-xs hover:bg-gray-300">Demo Recruiter</button>
        </div>

        {/* 🔗 Back to Home (since no login page yet) */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Not have any account?{" "}
          <Link
            to="/register"
            className="text-slate-900 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

