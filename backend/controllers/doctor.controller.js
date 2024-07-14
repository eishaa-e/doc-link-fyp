const Doctor = require("../models/doctor.model");
const User = require("../models/user.model");

exports.getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({user_id: req.user.id}).populate('user_id', 'email');
        // const doctor = await Doctor.findOne({user_id: req.user.id}).populate('user', 'email');

        if (!doctor) return res.status(404).json({message: 'Doctor not found'});
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

exports.updateDoctorProfile = async (req, res) => {
    const {id} = req.user;

    try {
        const user = await User.findById(id);
        console.log("user: ", req.user)
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        if (user.role !== 'doctor') {
            return res.status(403).json({message: 'Unauthorized: You cannot update this profile'});
        }

        const updatedDoctor = await Doctor.findOneAndUpdate(
            {user_id: id},
            {...req.body},
            {new: true, upsert: true}
        );

        if (!updatedDoctor) {
            return res.status(404).json({message: 'Doctor not found'});
        }

        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};