const Patient = require("../models/Patient");
const User = require("../models/User");
const MedicalRecord = require("../models/MedicalRecord");
const Appointment = require("../models/Appointment");
const Invoice = require("../models/Invoice");

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private/Admin,Staff
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("user", "name email");

    res.json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error("Get patients error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private/Admin,Staff,Patient(own)
exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if user is patient and trying to access own record
    if (
      req.user.role === "patient" &&
      patient.user._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this patient" });
    }

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Get patient error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create patient
// @route   POST /api/patients
// @access  Private/Admin
exports.createPatient = async (req, res) => {
  try {
    const { name, email, password, ...patientData } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: "patient",
    });

    // Create patient profile
    const patient = await Patient.create({
      user: user._id,
      ...patientData,
    });

    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Create patient error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private/Admin,Patient(own)
exports.updatePatient = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if user is patient and trying to update own record
    if (req.user.role === "patient") {
      const user = await User.findById(patient.user);

      if (user._id.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this patient" });
      }
    }

    patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Update patient error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private/Admin
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Delete patient
    await patient.remove();

    // Delete associated user
    await User.findByIdAndDelete(patient.user);

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Delete patient error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get patient medical records
// @route   GET /api/patients/:id/medical-records
// @access  Private/Admin,Staff,Patient(own)
exports.getPatientMedicalRecords = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if user is patient and trying to access own records
    if (
      req.user.role === "patient" &&
      patient.user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access these records" });
    }

    const medicalRecords = await MedicalRecord.find({
      patient: req.params.id,
    }).populate("staff", "name department position");

    res.json({
      success: true,
      count: medicalRecords.length,
      data: medicalRecords,
    });
  } catch (error) {
    console.error("Get patient medical records error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get patient appointments
// @route   GET /api/patients/:id/appointments
// @access  Private/Admin,Staff,Patient(own)
exports.getPatientAppointments = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if user is patient and trying to access own appointments
    if (
      req.user.role === "patient" &&
      patient.user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access these appointments" });
    }

    const appointments = await Appointment.find({
      patient: req.params.id,
    }).populate("staff", "name department position");

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Get patient appointments error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get patient invoices
// @route   GET /api/patients/:id/invoices
// @access  Private/Admin,Patient(own)
exports.getPatientInvoices = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if user is patient and trying to access own invoices
    if (
      req.user.role === "patient" &&
      patient.user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access these invoices" });
    }

    const invoices = await Invoice.find({ patient: req.params.id });

    res.json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    console.error("Get patient invoices error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
