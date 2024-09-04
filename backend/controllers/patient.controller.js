const Patient = require("../models/patient.model");
const {getUser} = require("./auth.controller");
const User = require("../models/user.model");

exports.getPatientProfile = async (req, res) => {
    try {
        console.log(req.user);
        const patient = await Patient.findOne({user_id: req.user.id});
        if (!patient) return res.status(404).json({message: "Patient not found"});
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.updatePatientProfile = async (req, res) => {
    const {id} = req.user;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        if (user.role !== "patient") {
            return res
                .status(403)
                .json({message: "Unauthorized: You cannot update this profile"});
        }

        const updatedPatient = await Patient.findOneAndUpdate(
            {user_id: id},
            {...req.body},
            {new: true, upsert: true},
        );

        if (!updatedPatient) {
            return res.status(404).json({message: "Patient not found"});
        }

        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({message: "Server error"});
    }
};

exports.getPatientProfileById = async (req, res) => {
    try {
        const {id} = req.params;
        const patient = await Patient.findById(id).populate("user_id", "email date");
        console.log("patient: ", patient)
        if (!patient) return res.status(404).json({message: "Patient not found"});
        const response = {
            _id: patient._id,
            user_id: patient.user_id._id,
            email: patient.user_id.email,
            city: patient.city,
            dob: patient.dob,
            gender: patient.gender,
            name: patient.name,
            phone: patient.phone,
            registeredAt: patient.user_id.date
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};
