require('dotenv').config(); // Corrected to ensure dotenv is required properly

const express = require('express');
const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const chatbotRoutes = require('./routes/chatbot.routes');
const medicalImageRoutes = require('./routes/medicalImage.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const { default: OpenAI } = require('openai');
const connectToMongo = require("./db");
const cors = require("cors");
const port = process.env.PORT || 5000; // Updated to use environment variable

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





const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Chat API route
app.post('/api/chat', async (req, res) => {
    const { query } = req.body;
    let prompt = `Please if the query is not related to medical assistance dont answer it, Query: ${query}`;
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'system', content: 'You are a helpful medical assistant.' }, { role: 'user', content: prompt }],
            temperature: 0.7,
        });
        res.json({ response: response?.choices[0]?.message?.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});

app.post("/api/generate-speech", async (req, res) => {
    const { text } = req.body;
    try {
      if (!text) {
        return res.status(400).json({ error: "Text is required." });
      }
  
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: 'alloy',
        input: text,
      });
  
      const buffer = Buffer.from(await mp3.arrayBuffer());
      const audioBase64 = buffer.toString("base64");
      res.status(200).json({ audio: `data:audio/mp3;base64,${audioBase64}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate speech." });
    }
  });

app.get("/", (req, res) => {
    res.send("Hello DOC Link server!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
