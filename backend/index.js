require('dotenv').config(); // Corrected to ensure dotenv is required properly

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const chatbotRoutes = require('./routes/chatbot.routes');
const medicalImageRoutes = require('./routes/medicalImage.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const connectToMongo = require("./db");
const cors = require("cors");
const port = process.env.PORT || 5000; // Updated to use environment variable

const app = express();
app.use(express.json());

connectToMongo();

app.use(cors());

app.use('/api/auth', authRoutes);

app.use('/api/appointments', appointmentRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/medical-image', medicalImageRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/feedback', feedbackRoutes);



app.get("/", (req, res) => {
    res.send("Hello DOC Link server!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
