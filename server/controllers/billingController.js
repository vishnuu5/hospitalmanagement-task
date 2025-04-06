const Invoice = require("../models/Invoice");
const Patient = require("../models/Patient");

// @desc    Get all invoices
// @route   GET /api/billing
// @access  Private/Admin
exports.getInvoices = async (req, res) => {
  try {
    const query = {};

    // Add status filtering if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Add date range filtering if provided
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const invoices = await Invoice.find(query)
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ date: -1 });

    res.json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    console.error("Get invoices error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/billing/:id
// @access  Private
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate({
      path: "patient",
      populate: {
        path: "user",
        select: "name email",
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Check if user has permission to view this invoice
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });
      if (
        !patient ||
        invoice.patient._id.toString() !== patient._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to view this invoice" });
      }
    } else if (req.user.role === "staff") {
      // Staff can only view invoices, not modify them
      // No additional checks needed here
    }

    res.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Get invoice error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create invoice
// @route   POST /api/billing
// @access  Private/Admin
exports.createInvoice = async (req, res) => {
  try {
    const { patientId, items, tax, discount, dueDate, notes } = req.body;

    // Validate required fields
    if (!patientId || !items || !dueDate) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Calculate subtotal and total
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const totalTax = tax || 0;
    const totalDiscount = discount || 0;
    const total = subtotal + totalTax - totalDiscount;

    // Generate invoice number
    const invoiceCount = await Invoice.countDocuments();
    const invoiceNumber = `INV${String(invoiceCount + 1).padStart(4, "0")}`;

    // Create invoice
    const invoice = await Invoice.create({
      patient: patientId,
      invoiceNumber,
      date: new Date(),
      dueDate: new Date(dueDate),
      items,
      subtotal,
      tax: totalTax,
      discount: totalDiscount,
      total,
      status: "Pending",
      notes,
    });

    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Create invoice error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update invoice
// @route   PUT /api/billing/:id
// @access  Private/Admin
exports.updateInvoice = async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // If items, tax, or discount is being updated, recalculate totals
    if (
      req.body.items ||
      req.body.tax !== undefined ||
      req.body.discount !== undefined
    ) {
      const items = req.body.items || invoice.items;
      const tax = req.body.tax !== undefined ? req.body.tax : invoice.tax;
      const discount =
        req.body.discount !== undefined ? req.body.discount : invoice.discount;

      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
      const total = subtotal + tax - discount;

      req.body.subtotal = subtotal;
      req.body.total = total;
    }

    // Update invoice
    invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Update invoice error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/billing/:id
// @access  Private/Admin
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await invoice.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Delete invoice error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark invoice as paid
// @route   PUT /api/billing/:id/pay
// @access  Private
exports.markInvoiceAsPaid = async (req, res) => {
  try {
    const { paymentMethod } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({ message: "Please provide payment method" });
    }

    let invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Check if user has permission to pay this invoice
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient || invoice.patient.toString() !== patient._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to pay this invoice" });
      }
    }

    // Update invoice
    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        status: "Paid",
        paymentMethod,
        paymentDate: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Mark invoice as paid error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
