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

  // 🔥 FILTER LOGIC (ROLE + STATUS)
  const filteredData = data.filter((item) => {
    const matchStatus =
      statusFilter === "all" || item.status === statusFilter;

    const matchRole =
      roleFilter === "all" || item.userId?.role === roleFilter;

    return matchStatus && matchRole;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Admin Attendance Overview
      </h2>

      {/* FILTERS */}
      <div className="flex gap-4 mb-4">

        <select
          className="p-2 border rounded"
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
          className="p-2 border rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-hidden">

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item._id} className="border-b">

                  <td className="p-3">
                    {item.userId?.name}
                  </td>

                  <td className="p-3">
                    {item.userId?.email}
                  </td>

                  <td className="p-3 capitalize">
                    {item.userId?.role}
                  </td>

                  <td className="p-3">
                    {item.date}
                  </td>

                  <td className="p-3">
                    <span
                      className={
                        item.status === "Present"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}