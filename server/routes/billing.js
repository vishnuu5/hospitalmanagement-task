const express = require("express");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Import controllers
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  markInvoiceAsPaid,
} = require("../controllers/billingController");

router
  .route("/")
  .get(protect, authorize("admin"), getInvoices)
  .post(protect, authorize("admin"), createInvoice);

router
  .route("/:id")
  .get(protect, getInvoice)
  .put(protect, authorize("admin"), updateInvoice)
  .delete(protect, authorize("admin"), deleteInvoice);

router.put("/:id/pay", protect, markInvoiceAsPaid);

module.exports = router;
