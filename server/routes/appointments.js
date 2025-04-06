const express = require("express");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Import controllers
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

router
  .route("/")
  .get(protect, getAppointments)
  .post(protect, createAppointment);

router
  .route("/:id")
  .get(protect, getAppointment)
  .put(protect, updateAppointment)
  .delete(protect, authorize("admin", "staff"), deleteAppointment);

module.exports = router;
