const Feedback = require("../models/feedback.model");
const User = require("../models/user.model");

exports.addFeedback = async (req, res) => {
    const {id} = req.user;
    console.log("req: ", req.user)

    try {
        const user = await User.findById(id); // Get User from Database using ID
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        if (user.role !== "patient") {
            return res.status(403).json({message: "Unauthorized: Only patients can add feedback"});
        }

        const {rating, comment} = req.body;

        const feedback = new Feedback({
            user_id: id,
            rating,
            comment,
        });

        await feedback.save();

        res.status(201).json({message: "Feedback submitted successfully", feedback});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("user_id", "email");
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};
