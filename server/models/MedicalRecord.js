const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
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
    default: Date.now,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  symptoms: [String],
  treatment: {
    type: String,
    required: true,
  },
  medications: [
    {
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
    },
  ],
  labResults: [
    {
      test: String,
      result: String,
      date: Date,
    },
  ],
  vitalSigns: {
    temperature: Number,
    bloodPressure: String,
    heartRate: Number,
    respiratoryRate: Number,
    oxygenSaturation: Number,
  },
  notes: {
    type: String,
  },
  attachments: [
    {
      name: String,
      fileType: String,
      url: String,
      uploadDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
