import { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function PayrollAdmin() {
  const { token, user } = useAuth();

  const [form, setForm] = useState({
    userId: "",
    month: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
  });

  const [users, setUsers] = useState([]);
  const [payrolls, setPayrolls] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: token },
      });
      // Filter based on logged-in user's role:
      if (user?.role === "hr") {
        // HR can only pay employees
        setUsers(res.data.filter((u) => u.role === "employee"));
      } else {
        // Admin can pay employees and HR
        setUsers(res.data.filter((u) => u.role !== "admin"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPayrolls = async () => {
    try {
      const res = await api.get("/payroll/all", {
        headers: { Authorization: token },
      });
      setPayrolls(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPayrolls();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createPayroll = async (e) => {
    e.preventDefault();
    try {
      await api.post("/payroll/create", form, {
        headers: { Authorization: token },
      });

      alert("Payroll Created successfully!");
      setForm({
        userId: "",
        month: "",
        basicSalary: "",
        bonus: "",
        deductions: "",
      });
      fetchPayrolls();
    } catch (err) {
      alert("Error creating payroll");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT COLUMN: GENERATE SLIP FORM */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 h-fit">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          Generate Salary Slip
        </h3>

        <form onSubmit={createPayroll} className="space-y-4">
          
          {/* USER SELECTION DROPDOWN */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Select Employee</label>
            <select
              name="userId"
              required
              value={form.userId}
              className="w-full p-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-700"
              onChange={handleChange}
            >
              <option value="">Choose an employee...</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {/* MONTH DROPDOWN */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payroll Month</label>
            <select
              name="month"
              required
              value={form.month}
              className="w-full p-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-700"
              onChange={handleChange}
            >
              <option value="">Choose month...</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* BASIC SALARY */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Basic Salary</label>
            <input
              name="basicSalary"
              type="number"
              required
              value={form.basicSalary}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-700"
              placeholder="Enter Basic Salary"
              onChange={handleChange}
            />
          </div>

          {/* BONUS */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Performance Bonus</label>
            <input
              name="bonus"
              type="number"
              value={form.bonus}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-700"
              placeholder="Enter Bonus"
              onChange={handleChange}
            />
          </div>

          {/* DEDUCTIONS */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tax & Deductions</label>
            <input
              name="deductions"
              type="number"
              value={form.deductions}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-700"
              placeholder="Enter Deductions"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-2.5 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Create Payroll Record
          </button>

        </form>
      </div>

      {/* RIGHT COLUMN: ISSUED PAYSLIPS REGISTER */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          Issued Payroll Register
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-600 font-semibold text-sm">
                <th className="p-4">Employee</th>
                <th className="p-4">Month</th>
                <th className="p-4">Basic</th>
                <th className="p-4">Bonus</th>
                <th className="p-4">Deductions</th>
                <th className="p-4">Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.length > 0 ? (
                payrolls.map((p) => (
                  <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50/40 transition">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{p.userId?.name || "Unknown User"}</span>
                        {p.userId && (
                          <span className={`w-fit mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full border capitalize ${
                            p.userId.role === "hr"
                              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}>
                            {p.userId.role}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 capitalize font-medium">{p.month}</td>
                    <td className="p-4 text-gray-600">{p.basicSalary?.toLocaleString()}</td>
                    <td className="p-4 text-emerald-600">+{ (p.bonus || 0).toLocaleString()}</td>
                    <td className="p-4 text-rose-600">-{(p.deductions || 0).toLocaleString()}</td>
                    <td className="p-4 font-extrabold text-violet-700">{p.netSalary?.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No payroll slips have been issued.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}