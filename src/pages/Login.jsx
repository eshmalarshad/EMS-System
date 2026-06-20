import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">

      {/* MAIN CARD */}
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl flex overflow-hidden">

        {/* LEFT SIDE (INFO PANEL) */}
        <div className="w-1/2 bg-primary text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">
            EMS System
          </h1>

          <p className="opacity-90 mb-6">
            Employee Management System for Attendance, Leave & Payroll
          </p>

          <div className="space-y-2 text-sm opacity-80">
            <p> Track Attendance</p>
            <p> Manage Leaves</p>
            <p> Payroll System</p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-1/2 p-10">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Welcome
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Login
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Create account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}