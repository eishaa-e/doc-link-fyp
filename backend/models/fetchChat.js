const mongoose = require("mongoose");
const Chat = require("./chat.model");
const Doctor = require("./doctor.model");
const User = require("./user.model");

const mongoURI = "mongodb+srv://nisha:nisha@cluster0.yvh2u.mongodb.net/docLink";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected...");
    fetchChats();
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Function to fetch chats with doctor names
async function fetchChats() {
  try {
    doctorId = "671d7a72bacf38099adf5eac";
    const chats = await Chat.find({
      $or: [
        { "messages.receiver": doctorId },
        { "messages.sender": doctorId }
      ]
    });

    const chatDataWithDoctors = chats.map(chat => ({
      _id: chat._id,
      patient_id: chat.patient_id,
      doctor_id: doctorId,
      patientName: chat.patient_id ? chat.patient_id.name : "Unknown",
      messages: chat.messages
    }));

    console.log(JSON.stringify(chatDataWithDoctors, null, 2));
    console.log(chatDataWithDoctors);
  } catch (error) {
    console.error("Error fetching chats:", error);
  } finally {
    mongoose.connection.close();
  }
}
