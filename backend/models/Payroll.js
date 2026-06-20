const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: String,
    basicSalary: Number,
    bonus: Number,
    deductions: Number,
    netSalary: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", payrollSchema);