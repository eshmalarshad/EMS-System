const express = require("express");
const router = express.Router();

const {
  createPayroll,
  myPayroll,
  allPayroll,
} = require("../controllers/payrollController");

const protect = require("../middleware/authMiddleware");

// HR/Admin
router.post("/create", protect, createPayroll);
router.get("/all", protect, allPayroll);

// Employee
router.get("/me", protect, myPayroll);

module.exports = router;