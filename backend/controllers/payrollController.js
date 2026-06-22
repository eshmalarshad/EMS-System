const Payroll = require("../models/Payroll");
const User = require("../models/User");

// CREATE PAYROLL (Admin only)
exports.createPayroll = async (req, res) => {
  try {
    const requestingUserRole = req.user.role;
    if (requestingUserRole !== "admin") {
      return res.status(403).json({ message: "Only admins can create payroll records" });
    }

    const { userId, month, basicSalary, bonus, deductions } = req.body;

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    if (targetUser.role !== "employee" && targetUser.role !== "hr") {
      return res.status(403).json({ message: "Admin can only manage employee and HR payroll records" });
    }

    const netSalary =
      Number(basicSalary) +
      Number(bonus || 0) -
      Number(deductions || 0);

    const payroll = await Payroll.create({
      userId,
      month,
      basicSalary,
      bonus,
      deductions,
      netSalary,
    });

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MY PAYROLL (Employee)
exports.myPayroll = async (req, res) => {
  try {
    const data = await Payroll.find({ userId: req.user.id });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PAYROLL (HR/Admin)
exports.allPayroll = async (req, res) => {
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

    const data = await Payroll.find(query)
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
