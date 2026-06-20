import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Payroll() {
  const { token } = useAuth();
  const [payrolls, setPayrolls] = useState([]);

  const fetchMyPayroll = async () => {
    try {
      const res = await api.get("/payroll/me", {
        headers: { Authorization: token },
      });
      setPayrolls(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyPayroll();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* HEADER */}
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        My Earnings & Payslips
      </h3>

      {/* RECEIPTS GRID */}
      {payrolls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {payrolls.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 relative overflow-hidden flex flex-col justify-between">
              
              {/* DECORATIVE TOP STRIP */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 to-indigo-500"></div>

              <div>
                {/* MONTH HEADER */}
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800 text-lg capitalize">{p.month}</h4>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Paid
                  </span>
                </div>

                {/* BREAKDOWN */}
                <div className="space-y-2 text-sm border-t border-b border-gray-100 py-3 mb-4">
                  <div className="flex justify-between text-gray-500">
                    <span>Basic Salary</span>
                    <span className="font-semibold text-gray-800">{p.basicSalary?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Performance Bonus</span>
                    <span className="font-semibold text-emerald-600">+{ (p.bonus || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax & Deductions</span>
                    <span className="font-semibold text-rose-600">-{(p.deductions || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* NET SALARY */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Net Amount</span>
                <span className="text-xl font-extrabold text-violet-700">{p.netSalary?.toLocaleString()}</span>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200/60 text-center text-gray-400">
          No payslips issued yet.
        </div>
      )}

    </div>
  );
}