const Attendance = require("../models/Attendance");
const User = require("../models/User");

// Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date().toISOString().split("T")[0];

    // check if already marked
    const existing = await Attendance.findOne({
      userId,
      date: today,
    });

    if (existing) {
      return res.status(400).json({ message: "Already marked today" });
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      status: "Present",
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Attendance (Admin/HR)
exports.getAllAttendance = async (req, res) => {
  try {
    const requestingUserRole = req.user.role;
    let query = {};

    if (requestingUserRole === "hr") {
      const employees = await User.find({ role: "employee" }).select("_id");
      const employeeIds = employees.map((emp) => emp._id);
      query = { userId: { $in: employeeIds } };
    } else if (requestingUserRole === "admin") {
      const allowedUsers = await User.find({ role: { $in: ["employee", "hr"] } }).select("_id");
      const allowedIds = allowedUsers.map((u) => u._id);
      query = { userId: { $in: allowedIds } };
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    const data = await Attendance.find(query)
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get My Attendance (Employee)
exports.getMyAttendance = async (req, res) => {
  try {
    const data = await Attendance.find({ userId: req.user.id });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};