const Leave = require("../models/Leave");

// APPLY LEAVE (Employee)
exports.applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    const leave = await Leave.create({
      userId: req.user.id,
      fromDate,
      toDate,
      reason,
    });

    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MY LEAVES (Employee)
exports.myLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL LEAVES (HR/Admin)
exports.allLeaves = async (req, res) => {
  try {
        let query = {};
    if (req.user.role === "hr") {
      // For HR, only show employee leaves
      // First find all employee user IDs
      const employees = await require("../models/User").find({ role: "employee" }).select("_id");
      const employeeIds = employees.map(emp => emp._id);
      query = { userId: { $in: employeeIds } };
    }
    // For admin, no filter - show all leaves
    const leaves = await Leave.find(query).populate("userId", "name email role");

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// MARK AS NOTIFIED
exports.markAsNotified = async (req, res) => {
  try {
    if (req.user.role !== "hr") {
      return res.status(403).json({ message: "Only HR can mark as notified" });
    }
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { notified: true },
      { returnDocument: 'after' }
    );
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE STATUS (Approve / Reject)
exports.updateLeaveStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can update leave status" });
    }
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' }
    );

    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
