const mongoose = require("mongoose");
require('dotenv').config();  // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI;  // Get MongoDB URI from the environment variable

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

module.exports = connectToMongo;
