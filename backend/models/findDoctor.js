const mongoose = require("mongoose");

const Doctor = require("./doctor.model");
const Patient = require("./patient.model");
const User = require("./user.model");

const uri = "mongodb+srv://nisha:nisha@cluster0.yvh2u.mongodb.net/docLink";

// Function to find a doctor by name
const printAllDoctors = async (name) => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const doctors = await Doctor.find();

    if (doctors.length > 0) {
      console.log("All Doctors:");
      doctors.forEach((doctor) => {
        console.log(doctor);
      });
    } else {
      console.log("No doctors found.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await mongoose.connection.close();
  }
};

printAllDoctors();