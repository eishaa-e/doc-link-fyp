const express = require('express');
const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const chatbotRoutes = require('./routes/chatbot.routes');
const medicalImageRoutes = require('./routes/medicalImage.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const connectToMongo = require("./db");
const cors = require("cors");

const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());

connectToMongo();

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
    console.log('Server is running on port 5000');
});
