const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // "2026-01-24"
      required: true,
    },
    status: {
      type: String,
      default: "Present",
    },
    clockInTime: {
      type: Date,
    },
    clockOutTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
