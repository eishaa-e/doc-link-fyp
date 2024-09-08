const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");

exports.bookAppointment = async (req, res) => {
    const {doctorId, patientId, date, startTime, endTime} = req.body;
    const user = req.user;

    try {
        if (user.role !== "patient") {
            return res.status(403).json({message: "Only patient can book appointment"});
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({message: "Doctor not found"});

        const appointment = new Appointment({
            doctor_id: doctorId,
            patient_id: patientId,
            date: new Date(date),
            time_slot: {startTime, endTime},
            status: "REQUESTED"
        });

        await appointment.save();
        res.status(201).json({
            message: "Appointment request created",
            appointment
        });
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({message: "Server error"});
    }
};

exports.getAppointment = async (req, res) => {
    const {appointmentId} = req.params;

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) return res.status(404).json({message: "Appointment not found"});

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.getAppointmentsByPatient = async (req, res) => {
    const {patientId} = req.params;

    try {
        const appointments = await Appointment.find({patient_id: patientId});
        if (!appointments) return res.status(404).json({message: "No appointments found"});

        res.status(200).json({appointments});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.getAppointmentsByDoctor = async (req, res) => {
    const {doctorId} = req.params;

    try {
        const appointments = await Appointment.find({doctor_id: doctorId});
        if (!appointments) return res.status(404).json({message: "No appointments found"});

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

        if (appointment.doctor_id !== doctor._id) {
            return res.status(403).json({message: "You are not authorized to update this appointment status"});
        }

        // Ensure only doctors can update the status
        // Assuming req.user is populated with the current authenticated user (doctor)
        if (req.user.role !== "doctor") {
            return res.status(403).json({message: "Only doctors can update appointment status"});
        }

        // Validate the status
        if (status !== "BOOKED" && status !== "CANCELLED") {
            return res.status(400).json({message: "Invalid status value"});
        }

        // Update appointment status
        appointment.status = status;
        await appointment.save();

        const message = status === "booked" ? "Appointment approved" : "Appointment rejected";

        res.status(200).json({
            message,
            appointment
        });
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

