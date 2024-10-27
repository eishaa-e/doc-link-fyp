const mongoose = require("mongoose");

const Doctor = require('./doctor.model'); // Adjust the path as needed
const Patient = require('./patient.model'); // Adjust the path as needed
const User = require('./user.model'); // Adjust the path as needed

const uri = 'mongodb+srv://nisha:nisha@cluster0.yvh2u.mongodb.net/docLink'; 

// Function to find a doctor by name
const printAllDoctors = async (name) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        
        // Search for the doctor by name
//         const doctor = await Doctor.findOne({ name: name });
        
//         if (doctor) {
//             console.log("Doctor found:", doctor);
//         } else {
//             console.log("No doctor found with that name.");
//         }
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     } finally {
//         // Close the connection
//         await mongoose.connection.close();
//     }
// };

// // Replace 'Mushaim Khan' with the name you want to search for
// findDoctorByName("Mushaim Khan");

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
// Close the connection
await mongoose.connection.close();
}
};

// Call the function to print all doctors
printAllDoctors();