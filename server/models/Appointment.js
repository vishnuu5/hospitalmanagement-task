const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    default: 30,
  },
  type: {
    type: String,
    enum: ["Regular", "Follow-up", "Emergency", "Consultation"],
    default: "Regular",
  },
  status: {
    type: String,
    enum: ["Scheduled", "Confirmed", "Completed", "Cancelled", "No Show"],
    default: "Scheduled",
  },
  reason: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
