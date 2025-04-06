const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  bloodGroup: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phone: {
    type: String,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  medicalHistory: [
    {
      condition: String,
      diagnosedDate: Date,
      notes: String,
    },
  ],
  allergies: [String],
  currentMedications: [
    {
      name: String,
      dosage: String,
      frequency: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  insuranceInfo: {
    provider: String,
    policyNumber: String,
    groupNumber: String,
    expiryDate: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
