const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Staff = require("../models/Staff");

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    const query = {};

    // If user is a patient, only show their appointments
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient) {
        return res.status(404).json({ message: "Patient profile not found" });
      }
      query.patient = patient._id;
    }

    // If user is a staff, only show appointments assigned to them
    if (req.user.role === "staff") {
      const staff = await Staff.findOne({ user: req.user._id });
      if (!staff) {
        return res.status(404).json({ message: "Staff profile not found" });
      }
      query.staff = staff._id;
    }

    // Add date filtering if provided
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
      .populate({
        path: "staff",
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
    console.error("Get appointments error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate({
        path: "staff",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user has permission to view this appointment
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });
      if (
        !patient ||
        appointment.patient._id.toString() !== patient._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to view this appointment" });
      }
    } else if (req.user.role === "staff") {
      const staff = await Staff.findOne({ user: req.user._id });
      if (!staff || appointment.staff._id.toString() !== staff._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to view this appointment" });
      }
    }

    res.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("Get appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, staffId, date, time, duration, type, reason, notes } =
      req.body;

    // Validate required fields
    if (!patientId || !staffId || !date || !time || !reason) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if staff exists
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // If user is a patient, they can only create appointments for themselves
    if (req.user.role === "patient") {
      const userPatient = await Patient.findOne({ user: req.user._id });
      if (!userPatient || userPatient._id.toString() !== patientId) {
        return res
          .status(403)
          .json({
            message: "Not authorized to create appointment for this patient",
          });
      }
    }

    // Check for scheduling conflicts
    const appointmentDate = new Date(date);
    const startTime = time.split(":");
    appointmentDate.setHours(
      Number.parseInt(startTime[0]),
      Number.parseInt(startTime[1]),
      0,
      0
    );

    const endTime = new Date(appointmentDate);
    endTime.setMinutes(endTime.getMinutes() + (duration || 30));

    const conflictingAppointment = await Appointment.findOne({
      staff: staffId,
      date: appointmentDate.toISOString().split("T")[0],
      $or: [
        {
          // New appointment starts during an existing appointment
          time: {
            $lte: time,
          },
          endTime: {
            $gt: time,
          },
        },
        {
          // New appointment ends during an existing appointment
          time: {
            $lt: endTime.toTimeString().split(" ")[0].substring(0, 5),
          },
          endTime: {
            $gte: endTime.toTimeString().split(" ")[0].substring(0, 5),
          },
        },
      ],
    });

    if (conflictingAppointment) {
      return res
        .status(400)
        .json({
          message: "There is a scheduling conflict with another appointment",
        });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: patientId,
      staff: staffId,
      date: appointmentDate,
      time,
      duration: duration || 30,
      type: type || "Regular",
      status: "Scheduled",
      reason,
      notes,
    });

    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user has permission to update this appointment
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });
      if (
        !patient ||
        appointment.patient.toString() !== patient._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this appointment" });
      }

      // Patients can only update certain fields
      const allowedUpdates = ["status"];
      const requestedUpdates = Object.keys(req.body);

      const isValidOperation = requestedUpdates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res
          .status(400)
          .json({ message: "Patients can only update appointment status" });
      }
    } else if (req.user.role === "staff") {
      const staff = await Staff.findOne({ user: req.user._id });
      if (!staff || appointment.staff.toString() !== staff._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this appointment" });
      }
    }

    // If date or time is being updated, check for scheduling conflicts
    if (req.body.date || req.body.time) {
      const date = req.body.date || appointment.date;
      const time = req.body.time || appointment.time;
      const duration = req.body.duration || appointment.duration;
      const staffId = req.body.staffId || appointment.staff;

      const appointmentDate = new Date(date);
      const startTime = time.split(":");
      appointmentDate.setHours(
        Number.parseInt(startTime[0]),
        Number.parseInt(startTime[1]),
        0,
        0
      );

      const endTime = new Date(appointmentDate);
      endTime.setMinutes(endTime.getMinutes() + duration);

      const conflictingAppointment = await Appointment.findOne({
        _id: { $ne: req.params.id }, // Exclude current appointment
        staff: staffId,
        date: appointmentDate.toISOString().split("T")[0],
        $or: [
          {
            // New appointment starts during an existing appointment
            time: {
              $lte: time,
            },
            endTime: {
              $gt: time,
            },
          },
          {
            // New appointment ends during an existing appointment
            time: {
              $lt: endTime.toTimeString().split(" ")[0].substring(0, 5),
            },
            endTime: {
              $gte: endTime.toTimeString().split(" ")[0].substring(0, 5),
            },
          },
        ],
      });

      if (conflictingAppointment) {
        return res
          .status(400)
          .json({
            message: "There is a scheduling conflict with another appointment",
          });
      }
    }

    // Update appointment
    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("Update appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin,Staff
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user has permission to delete this appointment
    if (req.user.role === "staff") {
      const staff = await Staff.findOne({ user: req.user._id });
      if (!staff || appointment.staff.toString() !== staff._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this appointment" });
      }
    }

    await appointment.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Delete appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
