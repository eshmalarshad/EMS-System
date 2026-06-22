import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import LeaveManagement from "./pages/LeaveManagement";
import AttendanceManagement from "./pages/AttendanceManagement";
import PayrollAdmin from "./pages/PayrollAdmin";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PRIVATE (INSIDE LAYOUT) */}
        <Route
          path="/dashboard"
          element={<Layout><Dashboard /></Layout>}
        />

        <Route
          path="/attendance"
          element={<Layout><Attendance /></Layout>}
        />

        <Route
          path="/leave"
          element={<Layout><Leave /></Layout>}
        />

        <Route
          path="/payroll"
          element={<Layout><Payroll /></Layout>}
        />

        <Route
          path="/leave-management"
          element={<Layout><LeaveManagement /></Layout>}
        />

        <Route
          path="/payroll-admin"
          element={<Layout><PayrollAdmin /></Layout>}
        />
        <Route
          path="/attendance-management"
          element={<Layout><AttendanceManagement /></Layout>}
        />
        <Route
          path="/user-management"
          element={<Layout><UserManagement /></Layout>}
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;
