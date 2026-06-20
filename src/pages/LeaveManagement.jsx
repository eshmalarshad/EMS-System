import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function LeaveManagement() {
  const { token } = useAuth();
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves/all", {
        headers: { Authorization: token },
      });
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/leaves/${id}`,
        { status },
        { headers: { Authorization: token } }
      );
      fetchLeaves();
    } catch (err) {
      alert("Error updating leave status");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          Leave Request Management
        </h3>
        
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 border border-gray-100">
          <span>Pending Requests:</span>
          <span className="bg-violet-600 text-white rounded-full px-2 py-0.5 font-bold">
            {leaves.filter(l => l.status === "Pending").length}
          </span>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-600 font-semibold text-sm">
              <th className="p-4">Employee</th>
              <th className="p-4">Date Range</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((l) => (
                <tr key={l._id} className="border-b border-gray-100 hover:bg-gray-50/40 transition">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">{l.userId?.name}</span>
                      <span className="text-xs text-gray-400">{l.userId?.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">
                    <div className="text-sm font-medium">
                      <span>{l.fromDate}</span>
                      <span className="mx-1.5 text-gray-400">→</span>
                      <span>{l.toDate}</span>
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
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {l.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => updateStatus(l._id, "Approved")}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 rounded-lg transition-colors border border-emerald-200/50 flex items-center justify-center cursor-pointer"
                            title="Approve Request"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => updateStatus(l._id, "Rejected")}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 rounded-lg transition-colors border border-rose-200/50 flex items-center justify-center cursor-pointer"
                            title="Reject Request"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No action needed</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}