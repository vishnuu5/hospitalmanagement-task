const express = require("express");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Import controllers
const {
  getStaff,
  getStaffMember,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  getStaffAppointments,
} = require("../controllers/staffController");

router
  .route("/")
  .get(protect, authorize("admin"), getStaff)
  .post(protect, authorize("admin"), createStaffMember);

router
  .route("/:id")
  .get(protect, authorize("admin", "staff"), getStaffMember)
  .put(protect, authorize("admin", "staff"), updateStaffMember)
  .delete(protect, authorize("admin"), deleteStaffMember);

router.get(
  "/:id/appointments",
  protect,
  authorize("admin", "staff"),
  getStaffAppointments
);

module.exports = router;
