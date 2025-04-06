const Staff = require("../models/Staff");
const User = require("../models/User");
const Appointment = require("../models/Appointment");

// @desc    Get all staff
// @route   GET /api/staff
// @access  Private/Admin
exports.getStaff = async (req, res) => {
  try {
    const query = {};

    // Add department filtering if provided
    if (req.query.department) {
      query.department = req.query.department;
    }

    // Add position filtering if provided
    if (req.query.position) {
      query.position = req.query.position;
    }

    // Add status filtering if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    const staff = await Staff.find(query).populate("user", "name email");

    res.json({
      success: true,
      count: staff.length,
      data: staff,
    });
  } catch (error) {
    console.error("Get staff error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single staff member
// @route   GET /api/staff/:id
// @access  Private/Admin,Staff(own)
exports.getStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Check if user is staff and trying to access own record
    if (
      req.user.role === "staff" &&
      staff.user._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this staff member" });
    }

    res.json({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.error("Get staff member error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create staff member
// @route   POST /api/staff
// @access  Private/Admin
exports.createStaffMember = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
      position,
      specialization,
      qualification,
      phone,
      ...staffData
    } = req.body;

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
      role: "staff",
    });

    // Generate a staff ID
    const staffCount = await Staff.countDocuments();
    const staffId = `STAFF${String(staffCount + 1).padStart(4, "0")}`;

    // Create staff profile
    const staff = await Staff.create({
      user: user._id,
      staffId,
      department,
      position,
      specialization,
      qualification,
      phone,
      ...staffData,
    });

    res.status(201).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.error("Create staff error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private/Admin,Staff(own)
exports.updateStaffMember = async (req, res) => {
  try {
    let staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Check if user is staff and trying to update own record
    if (req.user.role === "staff") {
      const user = await User.findById(staff.user);

      if (user._id.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this staff member" });
      }

      // Staff can only update certain fields
      const allowedUpdates = ["phone", "address", "emergencyContact"];
      const requestedUpdates = Object.keys(req.body);

      const isValidOperation = requestedUpdates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res
          .status(400)
          .json({ message: "Staff can only update contact information" });
      }
    }

    staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.error("Update staff error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private/Admin
exports.deleteStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Delete staff
    await staff.remove();

    // Delete associated user
    await User.findByIdAndDelete(staff.user);

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get staff appointments
// @route   GET /api/staff/:id/appointments
// @access  Private/Admin,Staff(own)
exports.getStaffAppointments = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Check if user is staff and trying to access own appointments
    if (
      req.user.role === "staff" &&
      staff.user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access these appointments" });
    }

    // Add date filtering if provided
    const query = { staff: req.params.id };

    if (req.query.date) {
      const startDate = new Date(req.query.date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(req.query.date);
      endDate.setHours(23, 59, 59, 999);

      query.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    // Add status filtering if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ date: 1, time: 1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Get staff appointments error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
