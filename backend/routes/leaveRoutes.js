const express = require("express");
const router = express.Router();

const {
  applyLeave,
  myLeaves,
  allLeaves,
  updateLeaveStatus,
  markAsNotified,
} = require("../controllers/leaveController");

const protect = require("../middleware/authMiddleware");

// Employee
router.post("/apply", protect, applyLeave);
router.get("/me", protect, myLeaves);

// HR/Admin
router.get("/all", protect, allLeaves);
router.put("/:id", protect, updateLeaveStatus);
router.put("/:id/notify", protect, markAsNotified);

module.exports = router;
