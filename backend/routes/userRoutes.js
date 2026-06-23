const express = require("express");
const router = express.Router();
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

// Get all users (Admin/HR)
router.get("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "hr") {
      return res.status(403).json({ message: "Access denied. Admin or HR only." });
    }
    let query = {};
    if (req.user.role === "hr") {
      query = { role: "employee" };
    } else if (req.user.role === "admin") {
      // Admin sees all except maybe other admins? Or all? Let's show all except admins? Or include admins?
      // Let's show all except admin role? Or include admin? Let's keep it as all for now, but let's see.
      // Wait, let's follow the same pattern as before.
      // Let's show admin all users except other admins? Or all users? Let's see the userManagement.jsx: it filters out admin role for the dropdown.
      // Let's just filter HR to only employees, admin to all except maybe other admins? Or let's include all for admin? Let's check userManagement.jsx:
      // In userManagement.jsx, admin sees users where role !== "admin". So let's do that here.
      query = { role: { $ne: "admin" } };
    }
    const users = await User.find(query).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
