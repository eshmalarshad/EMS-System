import { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Attendance() {
  const { token, user } = useAuth();
  const [myAttendance, setMyAttendance] = useState([]);

  const markAttendance = async () => {
    try {
      await api.post(
        "/attendance/mark",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Attendance Marked successfully!");
      fetchMyAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  const fetchMyAttendance = async () => {
    try {
      const res = await api.get("/attendance/me", {
        headers: {
          Authorization: token,
        },
      });
      setMyAttendance(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyAttendance();
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];
  const isAlreadyMarkedToday = myAttendance.some((a) => a.date === todayStr);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* LEFT COLUMN: CHECK-IN CONTROL */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 h-fit">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
         
          Check-in Panel
        </h3>

        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 mb-4">
          <p className="text-sm text-gray-500">Today's Date</p>
          <p className="text-xl font-bold text-gray-700 mt-0.5">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {isAlreadyMarkedToday ? (
          <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg border border-emerald-100 text-sm font-medium flex items-center gap-2">
            
            <span>You have already marked your attendance for today!</span>
          </div>
        ) : (
          <button
            onClick={markAttendance}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-3 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Mark Present Today
          </button>
        )}
      </div>

      {/* RIGHT COLUMN: ATTENDANCE HISTORY */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
         
          My Attendance Logs
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-600 font-semibold text-sm">
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {myAttendance.length > 0 ? (
                myAttendance.map((a) => (
                  <tr key={a._id} className="border-b border-gray-100 hover:bg-gray-50/40 transition">
                    <td className="p-4 font-medium text-gray-700">{a.date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm capitalize ${
                        a.status === "Present"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-8 text-center text-gray-400">
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