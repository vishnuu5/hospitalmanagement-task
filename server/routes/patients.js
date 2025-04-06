const express = require("express");
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientMedicalRecords,
  getPatientAppointments,
  getPatientInvoices,
} = require("../controllers/patientController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("admin", "staff"), getPatients)
  .post(protect, authorize("admin"), createPatient);

router
  .route("/:id")
  .get(protect, getPatient)
  .put(protect, updatePatient)
  .delete(protect, authorize("admin"), deletePatient);

router.get("/:id/medical-records", protect, getPatientMedicalRecords);
router.get("/:id/appointments", protect, getPatientAppointments);
router.get("/:id/invoices", protect, getPatientInvoices);

module.exports = router;
