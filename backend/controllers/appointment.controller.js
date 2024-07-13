const Appointment = require("../models/appointment.model");

// TODO: time slot check validation

exports.bookAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, date, time_slot } = req.body;
    const newAppointment = new Appointment({
      patient_id,
      doctor_id,
      date,
      time_slot,
      status: "scheduled",
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({
      $or: [{ patient_id: userId }, { doctor_id: userId }],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
