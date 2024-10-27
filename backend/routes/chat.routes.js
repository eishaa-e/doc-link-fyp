// chat.route.js
const express = require("express");
const { getMessages, checkAppointmentAndSendMessage, getAllChats,getChatsForDoctor,getChatsForPatient } = require("../controllers/chat.controller");
const router = express.Router();

router.get("/messages/:patient_id/:doctor_id", getMessages); // Route to get messages
router.post("/send-message", checkAppointmentAndSendMessage); // Route to send message
router.get("/all-chats/:patientId", getAllChats);
router.get("/doctor-chats/:doctorId", getChatsForDoctor);
router.get("/patient-chats/:patientId", getChatsForPatient);

module.exports = router;
