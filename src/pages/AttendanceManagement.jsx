import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function AttendanceManagement() {
  const { token, user } = useAuth();

  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // GET ALL ATTENDANCE
  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance/all", {
        headers: {
          Authorization: token,
        },
      });

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // FILTER LOGIC (ROLE + STATUS)
  const filteredData = data.filter((item) => {
    const matchStatus =
      statusFilter === "all" || item.status === statusFilter;

    const matchRole =
      roleFilter === "all" || item.userId?.role === roleFilter;

    return matchStatus && matchRole;
  });

  const formatTime = (timeStr) => {
    if (!timeStr) return "-";
    try {
      const date = new Date(timeStr);
      return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch (e) {
      return "-";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/60 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Attendance Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and track employee check-in and check-out timings.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            className="p-2.5 bg-white border border-gray-200/80 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="employee">Employee</option>
            {user?.role === "admin" && (
              <>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </>
            )}
          </select>

          <select
            className="p-2.5 bg-white border border-gray-200/80 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white shadow-sm border border-gray-200/60 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4 rounded-l-xl">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Date</th>
                <th className="p-4">Clock In</th>
                <th className="p-4">Clock Out</th>
                <th className="p-4 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                    <td className="p-4 font-semibold text-slate-700">
                      {item.userId?.name || <span className="text-gray-400 font-normal italic">Deleted User</span>}
                    </td>

                    <td className="p-4 text-slate-600">
                      {item.userId?.email || "-"}
                    </td>

                    <td className="p-4">
                      {item.userId?.role ? (
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border capitalize ${
                          item.userId.role === "admin"
                            ? "bg-rose-50 text-rose-700 border-rose-200/60"
                            : item.userId.role === "hr"
                            ? "bg-indigo-50 text-indigo-700 border-indigo-200/60"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        }`}>
                          {item.userId.role}
                        </span>
                      ) : "-"}
                    </td>

                    <td className="p-4 text-slate-600">
                      {item.date}
                    </td>

                    <td className="p-4 font-mono text-sm text-slate-600">
                      {formatTime(item.clockInTime)}
                    </td>

                    <td className="p-4 font-mono text-sm text-slate-600">
                      {formatTime(item.clockOutTime)}
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border shadow-sm capitalize ${
                        item.status === "Present"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-rose-50 text-rose-700 border-rose-200/60"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400 text-sm">
                    No attendance records found.
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
