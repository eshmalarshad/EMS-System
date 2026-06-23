import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function UserManagement() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  
  // Registration form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: token },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      }, {
        headers: { Authorization: token },
      });
      toast.success("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("employee");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error registering user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT: REGISTER USER FORM */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 h-fit">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          Register New Account
        </h3>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">System Role</label>
            <select
              value={role}
              className="w-full p-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold p-2.5 rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* RIGHT: USER ACCOUNTS TABLE */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          Active User Directory
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-600 font-semibold text-sm">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50/40 transition">
                  <td className="p-4 font-semibold text-gray-800">{u.name}</td>
                  <td className="p-4 text-gray-600">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm capitalize ${
                      u.role === "admin"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : u.role === "hr"
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
