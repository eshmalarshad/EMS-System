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

// Clock In
exports.clockIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    // check if already clocked in today
    const existing = await Attendance.findOne({
      userId,
      date: today,
    });

    if (existing && existing.clockInTime) {
      return res.status(400).json({ message: "Already clocked in today" });
    }

    let attendance;
    if (existing) {
      existing.clockInTime = new Date();
      existing.status = "Present";
      attendance = await existing.save();
    } else {
      attendance = await Attendance.create({
        userId,
        date: today,
        status: "Present",
        clockInTime: new Date(),
      });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clock Out
exports.clockOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    // check if attendance record exists for today
    const existing = await Attendance.findOne({
      userId,
      date: today,
    });

    if (!existing) {
      return res.status(400).json({ message: "Please clock in first" });
    }

    if (existing.clockOutTime) {
      return res.status(400).json({ message: "Already clocked out today" });
    }

    existing.clockOutTime = new Date();
    const attendance = await existing.save();

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
