const Feedback = require("../models/feedback.model");
const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const Doctor = require("../models/doctor.model");

exports.addFeedback = async (req, res) => {
    const {id} = req.user;

    try {
        const user = await User.findById(id); // Get User from Database using ID
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        if (user.role !== "patient") {
            return res
                .status(403)
                .json({message: "Unauthorized: Only patients can add feedback"});
        }

        const {rating, comment} = req.body;

        const feedback = new Feedback({
            user_id: id,
            rating,
            comment,
        });

        await feedback.save();

        res
            .status(201)
            .json({message: "Feedback submitted successfully", feedback});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("user_id", "email role");

        const feedbackWithUserDetails = [];

        for (let feedback of feedbacks) {
            let userDetails = {};

            if (feedback.user_id.role === "patient") {
                const patient = await Patient.findOne({
                    user_id: feedback.user_id._id,
                });
                userDetails = {
                    name: patient?.name || "Unknown",
                    profileImage: patient?.profileImage || "No Image",
                    email: feedback.user_id.email,
                    role: "patient",
                    rating: feedback.rating,
                    comment: feedback.comment,
                    user_id: feedback.user_id._id,
                };
            } else if (feedback.user_id.role === "doctor") {
                const doctor = await Doctor.findOne({user_id: feedback.user_id._id});
                userDetails = {
                    name: doctor?.name || "Unknown",
                    email: feedback.user_id.email,
                    role: "doctor",
                    rating: feedback.rating,
                    comment: feedback.comment,
                    user_id: feedback.user_id._id,
                };
            }

            feedbackWithUserDetails.push(userDetails);
        }

        res.status(200).json(feedbackWithUserDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};
