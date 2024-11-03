const mongoose = require('mongoose');
const Doctor = require('./doctor.model'); // Adjust the path as needed
const Patient = require('./patient.model'); // Adjust the path as needed
const User = require('./user.model'); // Adjust the path as needed

const mongoURI = 'mongodb+srv://nisha:nisha@cluster0.yvh2u.mongodb.net/docLink'; // Update with your database name
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected...');
        fetchDoctorsAndPatients(); // Call the function to fetch doctors and patients
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Function to fetch doctor and patient data
async function fetchDoctorsAndPatients() {
    try {
        // Fetch all doctors and populate their user information
        const doctors = await Doctor.find({})
            .populate('user_id', 'name phone specialization'); // Adjust fields as needed

        // Fetch all patients and populate their user information
        const patients = await Patient.find({})
            .populate('user_id', 'name phone city'); // Adjust fields as needed

        // Format the data for display
        const doctorData = doctors.map(doc => ({
            id: doc._id,
            name: doc.user_id.name,
            phone: doc.user_id.phone,
            specialization: doc.specialization,
            feedbacks: doc.feedbacks // If you want to include feedbacks
        }));

        const patientData = patients.map(pat => ({
            id: pat._id,
            name: pat.user_id ? pat.user_id.name : 'Unknown',
            phone: pat.user_id ? pat.user_id.phone : 'N/A',
            city: pat.city
        }));

        console.log('Doctors:', JSON.stringify(doctorData, null, 2));
        console.log('Patients:', JSON.stringify(patientData, null, 2));
        console.log(doctorData);
    } catch (error) {
        console.error('Error fetching doctors and patients:', error);
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
}
