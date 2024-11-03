const Chat = require("../models/chat.model");
const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');

// Fetch all chats for a specific doctor with patient name and specialization
exports.getChatsForDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;
    try {
        console.log("Fetching chats for doctor:", doctorId);

        // Find all chats for the specified doctor
        const chats = await Chat.find({ doctor_id: doctorId })
            .populate('doctor_id', 'name')  // Populate basic doctor information from User
            .populate('patient_id', 'name'); // Populate basic patient information from User

        // Format the chat data for response
        const formattedChats = await Promise.all(chats.map(async (chat) => {
            // Retrieve patient details from Patient model using user_id reference
            const patientDoc = await Patient.findOne({ user_id: chat.patient_id._id }).select('name');
            const patientName = patientDoc ? patientDoc.name : 'Unknown Patient';

            // Retrieve doctor details from Doctor model using user_id reference
            const doctorDoc = await Doctor.findOne({ user_id: chat.doctor_id._id }).select('name specialization');
            const doctorName = doctorDoc ? doctorDoc.name : `Doctor ${doctorDoc?.specialization || ''}`.trim();

            return {
                id: chat._id,
                doctor_id: chat.doctor_id._id,
                doctor_name: patientName,
                patient_id: chat.patient_id._id,
                patient_name: patientName,
                messages: chat.messages,
            };
        }));

        console.log("Formatted chats fetched:", formattedChats);
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
        const chats = await Chat.find({ patient_id: patientId })
            .populate('doctor_id', 'name') // First populate doctor_id as User
            .populate('patient_id', 'name'); // Populate patient_id to get patient name

        // Fetch doctor details based on the populated user ID from the Doctor schema
        const formattedChats = await Promise.all(chats.map(async (chat) => {
            // Find the doctor document linked to the populated doctor_id
            const doctorDoc = await Doctor.findOne({ user_id: chat.doctor_id._id }).select('name specialization');
            const doctorName = doctorDoc ? doctorDoc.name : `Doctor ${doctorDoc?.specialization || ''}`.trim();
            console.log("Doctor fetched:", doctorName);
            console.log("Doctor fetched:", doctorDoc);

            return {
                id: chat._id,
                doctor_id: chat.doctor_id._id,
                doctor_name :doctorName,
                patient_id: chat.patient_id,
                messages: chat.messages
            };
        }));

        console.log("Chats fetched:", formattedChats);
        res.json(formattedChats);
    } catch (error) {
        console.error("Error fetching chats for patient:", error);
        res.status(500).json({ error: "Error fetching chats for patient" });
    }
};

// // Send message after checking for an appointment
// exports.checkAppointmentAndSendMessage = async (req, res) => {
//     try {
//         const { patient_id, doctor_id, message, sender } = req.body;
//         console.log("Received message request:", req.body);

//         // Uncomment this block if appointment verification is needed
//         /*
//         const appointment = await Appointment.findOne({
//             patient_id,
//             doctor_id,
//             status: { $in: ["BOOKED", "ACCEPTED", "REQUESTED"] }
//         });

//         if (!appointment) {
//             return res.status(400).json({ error: "No active appointment between patient and doctor." });
//         }
//         */

//         let chat = await Chat.findOne({ patient_id, doctor_id });
//         if (!chat) {
//             chat = new Chat({ patient_id, doctor_id, messages: [] });
//             console.log("Chat created:", chat);
//         }

//         const messageData = {
//             sender,
//             message,
//             timestamp: new Date(),
//             receiver: sender === 'patient' ? doctor_id : patient_id
//         };

//         chat.messages.push(messageData);
//         await chat.save();

//         console.log("Chat updated:", chat);
//         console.log(patient_id, doctor_id);
//         res.json(chat);
//         console.log("Message sent:", messageData);
        
        
//     } catch (error) {
//         console.error("Error sending message:", error);
//         res.status(500).json({ error: "Error sending message" });
//     }
// };
exports.checkAppointmentAndSendMessage = async (req, res) => {
    try {
        const { patient_id, doctor_id, message, sender } = req.body;

        // Check for required IDs
        if (!patient_id || !doctor_id) {
            return res.status(400).json({ error: "Patient and doctor IDs are required." });
        }

        // Determine the receiver based on the sender role
        const receiver = sender.toString() === patient_id.toString() ? doctor_id : patient_id;

        // Find or create a chat between the patient and doctor
        let chat = await Chat.findOne({ patient_id, doctor_id });
        if (!chat) {
            chat = new Chat({ patient_id, doctor_id, messages: [] });
        }

        // Create a new message object
        const messageData = {
            sender,
            receiver,
            message,
            timestamp: new Date(),
        };

        // Add message to chat's messages array
        chat.messages.push(messageData);
        await chat.save();

        // Respond with the chat ID and message data
        res.json({ id: chat._id, message: messageData });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Error sending message" });
    }
};

// Get messages between a specific patient and doctor
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
