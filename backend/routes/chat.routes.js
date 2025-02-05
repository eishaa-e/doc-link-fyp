// chat.route.js
const express = require("express");
const { getMessages, checkAppointmentAndSendMessage, getAllChats,getChatsForDoctor,getChatsForPatient,sendImageMessage } = require("../controllers/chat.controller");
const router = express.Router();
const upload = require('../middleware/upload');


router.get("/messages/:patient_id/:doctor_id", getMessages); // Route to get messages
router.post("/send-message", checkAppointmentAndSendMessage); // Route to send message
router.get("/all-chats/:patientId", getAllChats);
router.get("/doctor-chats/:doctorId", getChatsForDoctor);
router.get("/patient-chats/:patientId", getChatsForPatient);
router.post('/send-image', upload.single('image'), sendImageMessage);
module.exports = router;
