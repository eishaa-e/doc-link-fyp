const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");

exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user_id: req.user.id }).populate(
      "user_id",
      "email"
    );

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const query = req.query;

    const searchCriteria = {};

    if (query.name) {
      searchCriteria.name = { $regex: query.name, $options: "i" };
    }
    if (query.specialization) {
      searchCriteria.specialization = {
        $regex: query.specialization,
        $options: "i"
      };
    }
    if (query.city) {
      searchCriteria.city = { $regex: query.city, $options: "i" };
    }
    if (query.gender) {
      searchCriteria.gender = query.gender;
    }

    const doctors = await Doctor.find(searchCriteria);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateDoctorProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Unauthorized: You cannot update this profile" });
    }

    const updatedDoctor = await Doctor.findOneAndUpdate(
      { user_id: id },
      { ...req.body },
      { new: true, upsert: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDoctorProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate("user_id", "email");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const feedbacksWithPatientInfo = await Promise.all(
      doctor.feedbacks.map(async (feedback) => {
        const patient = await Patient.findOne({
          user_id: feedback.user_id
        }).select("name");

        return {
          _id: feedback._id,
          user_id: feedback.user_id,
          name: patient ? patient.name : "Unknown",
          email: doctor.user_id.email,
          rating: feedback.rating,
          comment: feedback.comment,
          date: feedback.date
        };
      })
    );

    const response = {
      _id: doctor._id,
      user_id: doctor.user_id._id,
      email: doctor.user_id.email,
      city: doctor.city,
      dob: doctor.dob,
      education: doctor.education,
      experience: doctor.experience,
      gender: doctor.gender,
      name: doctor.name,
      phone: doctor.phone,
      specialization: doctor.specialization,
      profileImage: doctor.profileImage,
      availableTimeSlots: doctor.availableTimeSlots,
      feedbacks: feedbacksWithPatientInfo,
      pmdcCertificate: doctor.pmdcCertificate
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addFeedback = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { rating, comment } = req.body;
    const { id, role } = req.user;

    if (role !== "patient") {
      return res
        .status(400)
        .json({ message: "Only patient can give feedback to doctor." });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const feedback = {
      user_id: id,
      rating,
      comment,
      date: new Date()
    };

    doctor.feedbacks.push(feedback);
    await doctor.save();

    res.status(201).json({
      message: "Feedback added successfully",
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const { id } = req.user;
    const { profileImage } = req.body;

    const updatedDoctor = await Doctor.findOneAndUpdate(
      { user_id: id },
      { profileImage },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Profile image updated successfully",
      doctor: updatedDoctor
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateDoctorAvailability = async (req, res) => {
  try {
    const { id } = req.user;
    const availabilitySlots = req.body;

    const doctor = await Doctor.findOne({ user_id: id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (req.user.role !== "doctor") {
      return res.status(403).json({
        message: "You are not authorized to update this doctor's schedule"
      });
    }

    const validDays = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY"
    ];
    const invalidSlots = availabilitySlots.some((slot) => {
      return (
        !validDays.includes(slot.dayOfWeek.toUpperCase()) ||
        !slot.startTime ||
        !slot.endTime
      );
    });

    if (invalidSlots) {
      return res
        .status(400)
        .json({ message: "Invalid day of the week or time slot" });
    }

    doctor.availableTimeSlots = availabilitySlots;
    await doctor.save();

    res
      .status(200)
      .json({ message: "Availability schedule updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getBookedSlots = async (req, res) => {
  const { doctorId } = req.params;
  const currentTime = new Date();

  try {
    const appointments = await Appointment.find({
      doctor_id: doctorId,
      date: { $gte: currentTime },
      status: { $in: ["BOOKED", "REQUESTED"] }
    });

    const bookedSlots = appointments.map((appointment) => ({
      date: appointment.date,
      time_slot: appointment.time_slot,
      status: appointment.status
    }));

    res.status(200).json({ bookedSlots });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
