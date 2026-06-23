import { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Attendance() {
  const { token, user } = useAuth();
  const [myAttendance, setMyAttendance] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Ticking clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const handleClockIn = async () => {
    try {
      await api.post(
        "/attendance/clockin",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Clocked in successfully!");
      fetchMyAttendance();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error clocking in");
    }
  };

  const handleClockOut = async () => {
    try {
      await api.post(
        "/attendance/clockout",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Clocked out successfully!");
      fetchMyAttendance();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error clocking out");
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const todayRecord = myAttendance.find((a) => a.date === todayStr);

  const isClockedIn = !!todayRecord && (!!todayRecord.clockInTime || todayRecord.status === "Present");
  const isClockedOut = !!todayRecord && !!todayRecord.clockOutTime;

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
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
      
      {/* LEFT COLUMN: TICKING CLOCK & CHECK-IN CONTROL */}
      <div className="w-full lg:w-96 bg-white p-6 rounded-3xl shadow-sm border border-gray-200/60 h-fit flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Shift Controller
        </h3>

        {/* DIGITAL CLOCK CARD */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 text-center shadow-lg shadow-indigo-900/10 mb-6">
          <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-1">
            Current Time
          </p>
          <p className="text-3xl font-extrabold tracking-tight font-mono">
            {currentTime.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </p>
          <p className="text-indigo-200/80 text-xs mt-2 font-medium">
            {currentTime.toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>

        {/* SHIFT STATUS CARD */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Duty Status</span>
            <div className="flex items-center gap-1.5">
              {isClockedOut ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="text-xs font-bold text-blue-600 uppercase">Completed</span>
                </>
              ) : isClockedIn ? (
                <>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-emerald-600 uppercase">On Duty</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                  <span className="text-xs font-bold text-gray-500 uppercase">Off Duty</span>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200/60 my-1"></div>

          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Clock In Time:</span>
            <span className="font-semibold text-slate-700">
              {todayRecord?.clockInTime ? formatTime(todayRecord.clockInTime) : "-"}
            </span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Clock Out Time:</span>
            <span className="font-semibold text-slate-700">
              {todayRecord?.clockOutTime ? formatTime(todayRecord.clockOutTime) : "-"}
            </span>
          </div>
        </div>

        {/* BUTTON ACTIONS */}
        <div className="flex flex-col gap-3">
          {!isClockedIn ? (
            <button
              onClick={handleClockIn}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Clock In
            </button>
          ) : !isClockedOut ? (
            <button
              onClick={handleClockOut}
              className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Clock Out
            </button>
          ) : (
            <div className="bg-slate-100 text-slate-500 text-center py-3.5 px-4 rounded-xl font-semibold border border-slate-200/60 text-sm">
              Today's Shift Completed
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: ATTENDANCE HISTORY */}
      <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-200/60 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          My Attendance Logs
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4 rounded-l-xl">Date</th>
                <th className="p-4">Clock In</th>
                <th className="p-4">Clock Out</th>
                <th className="p-4 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {myAttendance.length > 0 ? (
                myAttendance.map((a) => (
                  <tr key={a._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                    <td className="p-4 font-medium text-slate-700">{a.date}</td>
                    <td className="p-4 text-slate-600 font-mono text-sm">{formatTime(a.clockInTime)}</td>
                    <td className="p-4 text-slate-600 font-mono text-sm">{formatTime(a.clockOutTime)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border shadow-sm capitalize ${
                        a.status === "Present"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-rose-50 text-rose-700 border-rose-200/60"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-400 text-sm">
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
