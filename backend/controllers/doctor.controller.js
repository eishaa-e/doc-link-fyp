const Doctor = require("../models/doctor.model");
const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const Feedback = require("../models/feedback.model");

exports.getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({user_id: req.user.id}).populate(
            "user_id",
            "email",
        );

        if (!doctor) return res.status(404).json({message: "Doctor not found"});
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const query = req.query;

        const searchCriteria = {};

        if (query.name) {
            searchCriteria.name = {$regex: query.name, $options: 'i'};
        }
        if (query.specialization) {
            searchCriteria.specialization = {$regex: query.specialization, $options: 'i'};
        }
        if (query.city) {
            searchCriteria.city = {$regex: query.city, $options: 'i'};
        }
        if (query.gender) {
            searchCriteria.gender = query.gender;
        }

        const doctors = await Doctor.find(searchCriteria);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.updateDoctorProfile = async (req, res) => {
    const {id} = req.user;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        if (user.role !== "doctor") {
            return res
                .status(403)
                .json({message: "Unauthorized: You cannot update this profile"});
        }

        const updatedDoctor = await Doctor.findOneAndUpdate(
            {user_id: id},
            {...req.body},
            {new: true, upsert: true},
        );

        if (!updatedDoctor) {
            return res.status(404).json({message: "Doctor not found"});
        }

        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.getDoctorProfileById = async (req, res) => {
    try {
        const {id} = req.params;
        const doctor = await Doctor.findById(id).populate("user_id", "email");
        if (!doctor) return res.status(404).json({message: "Doctor not found"});
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.addFeedback = async (req, res) => {
    try {
        const {doctorId} = req.params; // Doctor ID from the URL
        const {user_id, rating, comment} = req.body; // Feedback data from request body

        // Find the doctor by ID
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({message: "Doctor not found"});
        }

        // Create new feedback object (directly in the feedbacks array)
        const feedback = {
            user_id,
            rating,
            comment,
            date: new Date() // Add date automatically
        };

        // Add feedback to the doctor's feedback array
        doctor.feedbacks.push(feedback);
        await doctor.save(); // Save the updated doctor with the new feedback

        res.status(201).json({
            message: "Feedback added successfully",
            feedback,
        });
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
};

exports.uploadProfileImage = async (req, res) => {
    try {
        const {id} = req.user;
        const {profileImage} = req.body;

        const updatedDoctor = await Doctor.findOneAndUpdate(
            {user_id: id},
            {profileImage},
            {new: true},
        );

        if (!updatedDoctor) {
            return res.status(404).json({message: "Doctor not found"});
        }

        res
            .status(200)
            .json({
                message: "Profile image updated successfully",
                doctor: updatedDoctor,
            });
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
};