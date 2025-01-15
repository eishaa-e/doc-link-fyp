const Chat = require("../models/chat.model");
const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

// Fetch all chats for a specific doctor with patient name and specialization
exports.getChatsForDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;
  console.log("Fetching chats for doctor:", doctorId);
  try {
    const chats = await Chat.find({ doctor_id: doctorId });

    const formattedChats = await Promise.all(chats.map(async (chat) => {

      const patientDoc = await Patient.findOne({ _id: chat.patient_id._id }).select("name");
      const patientName = patientDoc ? patientDoc.name : "Unknown Patient";

      const doctorDoc = await Doctor.findOne({ _id: chat.doctor_id._id }).select("name specialization");
      const doctorName = doctorDoc ? doctorDoc.name : `Doctor ${doctorDoc?.specialization || ""}`.trim();

      return {
        id: chat._id,
        doctor_id: chat.doctor_id._id,
        doctor_name: patientName,
        patient_id: chat.patient_id._id,
        patient_name: patientName,
        messages: chat.messages
      };
    }));

    res.json(formattedChats);
  } catch (error) {
    console.error("Error fetching chats for doctor:", error);
    res.status(500).json({ error: "Error fetching chats for doctor" });
  }
};


// Fetch all chats for a specific patient with fallback logic
exports.getChatsForPatient = async (req, res) => {
  const patientId = req.params.patientId;
  console.log("Fetching chats for patient:", patientId);
  try {
    const chats = await Chat.find({ patient_id: patientId });

    const formattedChats = await Promise.all(chats.map(async (chat) => {

      const doctorDoc = await Doctor.findOne({ _id: chat.doctor_id._id }).select("name specialization");
      const doctorName = doctorDoc ? doctorDoc.name : `Doctor ${doctorDoc?.specialization || ""}`.trim();

      return {
        id: chat._id,
        doctor_id: chat.doctor_id._id,
        doctor_name: doctorName,
        patient_id: chat.patient_id,
        messages: chat.messages
      };
    }));

    res.json(formattedChats);
  } catch (error) {
    console.error("Error fetching chats for patient:", error);
    res.status(500).json({ error: "Error fetching chats for patient" });
  }
};

exports.checkAppointmentAndSendMessage = async (req, res) => {
  try {
    const { patient_id, doctor_id, message, sender } = req.body;

    if (!patient_id || !doctor_id) {
      return res.status(400).json({ error: "Patient and doctor IDs are required." });
    }

    const receiver = sender.toString() === patient_id.toString() ? doctor_id : patient_id;

    let chat = await Chat.findOne({ patient_id, doctor_id });
    if (!chat) {
      chat = new Chat({ patient_id, doctor_id, messages: [] });
    }

    const messageData = {
      sender,
      receiver,
      message,
      timestamp: new Date()
    };

    chat.messages.push(messageData);
    await chat.save();

    res.json({ id: chat._id, message: messageData });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};

exports.getMessages = async (req, res) => {
  const { patient_id, doctor_id } = req.params;
  console.log("Received get messages request:");

  try {
    const chat = await Chat.findOne({ patient_id, doctor_id });

    if (!chat) {
      return res.status(200).json([]);
    }

    res.json(chat.messages);
    console.log("Messages fetched:", chat.messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

// Fetch all chats related to a specific patient
exports.getAllChats = async (req, res) => {
  const { patientId } = req.params;
  console.log("Fetching all chats for patient:", patientId);

  try {
    const chats = await Chat.find({ patient_id: patientId })
      .populate("doctor_id", "name");

    if (!chats.length) {
      return res.status(200).json([]);
    }

    const formattedChats = chats.map(chat => ({
      id: chat._id,
      doctorId: chat.doctor_id ? chat.doctor_id._id : null,
      doctorName: chat.doctor_id ? chat.doctor_id.name : "Unknown",
      messages: chat.messages
    }));

    res.json(formattedChats);
    console.log("Fetched chats:", formattedChats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Error fetching chats" });
  }
};
