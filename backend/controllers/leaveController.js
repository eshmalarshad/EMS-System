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
    const leaves = await Leave.find().populate("userId", "name email role");

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE STATUS (Approve / Reject)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};