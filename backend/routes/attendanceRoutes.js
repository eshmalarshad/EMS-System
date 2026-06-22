const express = require("express");
const router = express.Router();

const {
  markAttendance,
  clockIn,
  clockOut,
  getAllAttendance,
  getMyAttendance,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");

// Employee/HR Clock-In & Clock-Out
router.post("/clockin", protect, clockIn);
router.post("/clockout", protect, clockOut);

// Employee
router.post("/mark", protect, markAttendance);

// HR/Admin
router.get("/all", protect, getAllAttendance);

// Employee own record
router.get("/me", protect, getMyAttendance);

module.exports = router;
