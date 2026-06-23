import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [notifiedLeaveIds, setNotifiedLeaveIds] = useState(new Set());

  useEffect(() => {
    if (user?.role !== "admin") return;

    const checkNotifications = async () => {
      try {
        const res = await api.get("/leaves/all", {
          headers: { Authorization: token },
        });
        const leaves = res.data;

        leaves.forEach((leave) => {
          if (
            leave.status === "Pending" &&
            leave.notified &&
            !notifiedLeaveIds.has(leave._id)
          ) {
            toast(
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <div>
                  <p className="font-semibold">New Leave Request Notification</p>
                  <p className="text-xs text-gray-500">
                    {leave.userId?.name} has a pending leave request (notified by HR)
                  </p>
                </div>
              </div>,
              {
                duration: 5000,
                icon: "📋",
              }
            );
            setNotifiedLeaveIds((prev) => new Set([...prev, leave._id]));
          }
        });
      } catch (err) {
        console.error("Error checking notifications:", err);
      }
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 10000);

    return () => clearInterval(interval);
  }, [user, token, notifiedLeaveIds]);

  const cards = [];

  if (user?.role === "employee" || user?.role === "hr") {
    cards.push({
      title: "My Attendance",
      description: "Mark your daily attendance and view history",
      path: "/attendance",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-white hover:border-emerald-200 border-gray-200/60",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    });
  }

  if (user?.role === "employee" || user?.role === "hr") {
    cards.push({
      title: "Apply Leave",
      description: "Submit leave requests and monitor approvals",
      path: "/leave",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-white hover:border-blue-200 border-gray-200/60",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    });
    cards.push({
      title: "My Payroll",
      description: "Access and review your monthly salary slips",
      path: "/payroll",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-white hover:border-amber-200 border-gray-200/60",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    });
  }

  if (user?.role === "hr" || user?.role === "admin") {
    if (user.role === "admin") {
      cards.push({
        title: "User Management",
        description: "Manage system user accounts, roles, and access controls",
        path: "/user-management",
        color: "from-rose-500 to-pink-600",
        bgColor: "bg-white hover:border-rose-200 border-gray-200/60",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
      });
    }
    cards.push({
      title: "Attendance Management",
      description: "Monitor and manage employee daily attendance logs",
      path: "/attendance-management",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-white hover:border-emerald-200 border-gray-200/60",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    });
    cards.push({
      title: "Leave Management",
      description: user?.role === "admin"
        ? "Review, approve, or reject employee leave requests"
        : "View employee leave requests",
      path: "/leave-management",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-white hover:border-blue-200 border-gray-200/60",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.232.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    });
    cards.push({
      title: "Payroll Management",
      description: user?.role === "admin" 
        ? "Review and manage employee payroll records and salary slips"
        : "View employee payroll records and salary slips",
      path: "/payroll-admin",
      color: "from-purple-500 to-fuchsia-600",
      bgColor: "bg-white hover:border-purple-200 border-gray-200/60",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    });
  }

  return (
    <div className="animate-fade-in">
      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`group ${card.bgColor} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 -translate-y-0 hover:-translate-y-1 cursor-pointer flex flex-col h-32`}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold text-gray-800 group-hover:text-violet-600 transition-colors">
                {card.title}
              </h2>
              <span className="text-gray-300 group-hover:text-gray-500 transition-colors mt-1 shrink-0">
                <svg className="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-3 line-clamp-2 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
