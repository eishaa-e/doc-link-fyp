const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

exports.bookAppointment = async (req, res) => {
    const {doctorId, patientId, date, startTime, endTime} = req.body;
    const user = req.user;

    try {
        if (user.role !== "patient") {
            return res
                .status(403)
                .json({message: "Only patient can book appointment"});
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({message: "Doctor not found"});

        // Get the day of the week from the provided date (0 = Sunday, 6 = Saturday)
        const bookingDate = new Date(date);
        const dayOfWeek = bookingDate.toLocaleString('en-US', {weekday: 'long'}).toUpperCase();

        // Check if the doctor is available on the requested day
        const availableSlots = doctor.availableTimeSlots.filter(slot => slot.dayOfWeek === dayOfWeek);

        if (availableSlots.length === 0) {
            return res.status(400).json({
                message: `Doctor is not available on ${dayOfWeek}`,
            });
        }

        // Check if the requested time slot matches any of the available slots
        const isSlotAvailable = availableSlots.some(slot =>
            slot.startTime === startTime && slot.endTime === endTime
        );

        if (!isSlotAvailable) {
            return res.status(400).json({
                message: `Requested time slot ${startTime} - ${endTime} is not available on ${dayOfWeek}`,
            });
        }

        // Check if the time slot on the date is already booked
        const existingAppointment = await Appointment.findOne({
            doctor_id: doctorId,
            date: new Date(date),
            "time_slot.startTime": startTime,
            "time_slot.endTime": endTime,
            status: {$in: ["BOOKED", "REQUESTED"]}, // Only check for booked or pending appointments
        });

        if (existingAppointment) {
            return res.status(400).json({
                message: "This time slot is already booked.",
            });
        }

        const appointment = new Appointment({
            doctor_id: doctorId,
            patient_id: patientId,
            date: new Date(date),
            time_slot: {startTime, endTime},
            status: "REQUESTED",
        });

        await appointment.save();
        res.status(201).json({
            message: "Appointment request created",
            appointment,
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({message: "Server error"});
    }
};

exports.getAppointment = async (req, res) => {
    const {appointmentId} = req.params;

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment)
            return res.status(404).json({message: "Appointment not found"});

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.getAppointmentsByPatient = async (req, res) => {
    const {patientId} = req.params;
    const {query} = req.query; // Get the query parameter (upcoming/past)

    try {
        let appointments = await Appointment.find({
            patient_id: patientId,
        })
            .populate("patient_id", "name phone")
            .populate("doctor_id", "name phone specialization");

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({message: "No appointments found"});
        }

        // Get the current date
        const currentDate = new Date();

        // Filter appointments based on the query parameter
        if (query === "upcoming") {
            appointments = appointments.filter(
                (appointment) =>
                    appointment.status !== "CANCELLED" &&
                    new Date(appointment.date) > currentDate,
            );
        } else if (query === "past") {
            appointments = appointments.filter(
                (appointment) =>
                    appointment.status !== "CANCELLED" &&
                    new Date(appointment.date) <= currentDate,
            );
        } else if (query === "cancelled") {
            appointments = appointments.filter(
                (appointment) => appointment.status === "CANCELLED",
            );
        }

        res.status(200).json({appointments});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.getAppointmentsByDoctor = async (req, res) => {
    const {doctorId} = req.params;
    const {query} = req.query; // Get the query parameter (upcoming/past)

    try {
        let appointments = await Appointment.find({doctor_id: doctorId})
            .populate("patient_id", "name phone")
            .populate("doctor_id", "name phone specialization");

        if (!appointments)
            return res.status(404).json({message: "No appointments found"});

        // Get the current date
        const currentDate = new Date();

        // Filter appointments based on the query parameter
        if (query === "requested") {
            appointments = appointments.filter(
                (appointment) =>
                    appointment.status === "REQUESTED" &&
                    new Date(appointment.date) > currentDate,
            );
        } else if (query === "upcoming") {
            appointments = appointments.filter(
                (appointment) =>
                    appointment.status === "BOOKED" &&
                    new Date(appointment.date) > currentDate,
            );
        } else if (query === "past") {
            appointments = appointments.filter(
                (appointment) =>
                    appointment.status !== "CANCELLED" &&
                    new Date(appointment.date) <= currentDate,
            );
        } else if (query === "cancelled") {
            appointments = appointments.filter(
                (appointment) => appointment.status === "CANCELLED",
            );
        }

        res.status(200).json({appointments});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    const {appointmentId} = req.params; // Appointment ID from URL
    const {status} = req.body; // "booked" or "rejected" from request body

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({message: "Appointment not found"});
        }

        const doctor = await Doctor.findOne({user_id: req.user.id});

        if (req.user.role === "doctor" && !appointment.doctor_id.equals(doctor._id)) {
            return res.status(403).json({
                message: "You are not authorized to update this appointment status",
            });
        }

        const patient = await Patient.findOne({user_id: req.user.id});

        if (
            req.user.role === "patient" &&
            !appointment.patient_id.equals(patient._id)
        ) {
            return res.status(403).json({
                message: "You are not authorized to update this appointment status",
            });
        }

        if (status !== "BOOKED" && status !== "CANCELLED" && status !== "COMPLETED") {
            return res.status(400).json({message: "Invalid status value"});
        }

        if (req.user.role === "patient" && (status === "BOOKED" || status === "COMPLETED")) {
            return res.status(403).json({
                message: "You are not authorized to update this appointment status",
            });
        }

        // Update appointment status
        appointment.status = status;
        await appointment.save();

        const message =
            status === "BOOKED"
                ? "Appointment approved"
                : status === "REJECTED"
                    ? "Appointment rejected"
                    : status === "COMPLETED"
                        ? "Appointment completed"
                        : "Appointment cancelled";

        res.status(200).json({
            message,
            appointment,
        });
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};
