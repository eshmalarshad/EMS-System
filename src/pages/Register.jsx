import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 1. Create User
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "admin",
      });

      // 2. Auto Login User
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // 3. Update auth state
      login(res.data);

      alert("Account created successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Error creating account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">

      {/* MAIN CARD */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Your Admin Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}
