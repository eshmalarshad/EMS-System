import { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Leave() {
  const { token } = useAuth();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const [myLeaves, setMyLeaves] = useState([]);

  // APPLY LEAVE
  const applyLeave = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/leaves/apply",
        { fromDate, toDate, reason },
        { headers: { Authorization: token } }
      );

      toast.success("Leave Applied successfully!");
      setFromDate("");
      setToDate("");
      setReason("");
      fetchMyLeaves();
    } catch (err) {
       toast.error("Error applying leave");
    }
  };

  // MY LEAVES
  const fetchMyLeaves = async () => {
    try {
      const res = await api.get("/leaves/me", {
        headers: { Authorization: token },
      });

      setMyLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT COLUMN: LEAVE REQUEST FORM */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 h-fit">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          Request Time-Off
        </h3>

        <form onSubmit={applyLeave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">From Date</label>
            <input
              type="date"
              required
              value={fromDate}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700"
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">To Date</label>
            <input
              type="date"
              required
              value={toDate}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700"
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reason for Leave</label>
            <textarea
              required
              value={reason}
              rows="3"
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-violet-500 text-gray-700"
              placeholder="Enter Reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2.5 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Apply Leave
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: MY LEAVE REQUESTS */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          My Leave Requests
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-600 font-semibold text-sm">
                <th className="p-4">Duration</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {myLeaves.length > 0 ? (
                myLeaves.map((l) => (
                  <tr key={l._id} className="border-b border-gray-100 hover:bg-gray-50/40 transition">
                    <td className="p-4 font-medium text-gray-700">
                      <div className="text-sm">
                        <span className="font-semibold">{l.fromDate}</span>
                        <span className="mx-2 text-gray-400">→</span>
                        <span className="font-semibold">{l.toDate}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 max-w-xs truncate" title={l.reason}>
                      {l.reason}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm capitalize ${
                        l.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : l.status === "Rejected"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-400">
                    No leave requests found.
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
