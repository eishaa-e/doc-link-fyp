const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const Doctor = require("../models/doctor.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {body, validationResult} = require("express-validator");
const JWT_SECRET = "ThisIsAJWTSecretKey";

const validateRegister = [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 8 chars long").isLength({min: 8}),
    body("role", "Role must be either 'doctor' or 'patient'").isIn(["doctor", "patient"]),
];

const validateLogin = [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
    body("role", "Role must be either 'doctor' or 'patient'").isIn(["doctor", "patient"]),
];

exports.register = [
    ...validateRegister,
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        try {
            const {email, password, role, ...profileData} = req.body;
            let user = await User.findOne({email});
            if (user) {
                return res.status(400).json({
                    success,
                    error: "Sorry, a user with this email already exists...",
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({email, password: hashedPassword, role});
            await newUser.save();

            if (role === 'patient') {
                const newPatient = new Patient({user_id: newUser._id, ...profileData});
                await newPatient.save();
            } else if (role === 'doctor') {
                const newDoctor = new Doctor({user_id: newUser._id, ...profileData});
                await newDoctor.save();
            }

            const data = {user: {id: newUser.id, role: newUser.role}};
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.status(201).json({success, authToken});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
];

exports.login = [
    ...validateLogin,
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        try {
            const {email, password, role} = req.body;
            const user = await User.findOne({email});

            if (!user || user.role !== role) {
                return res.status(404).json({success, message: "User not found"});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({success, message: "Invalid credentials"});
            }

            const token = jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {expiresIn: "1h"});
            success = true;
            res.json({success, token});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
];

exports.getProfile = async (req, res) => {
    const {id, role} = req.user;

    try {
        if (role === 'patient') {
            const patient = await Patient.findOne({user_id: id});
            if (!patient) return res.status(404).json({message: 'Patient not found'});
            res.status(200).json(patient);
        } else if (role === 'doctor') {
            const doctor = await Doctor.findOne({user_id: id});
            if (!doctor) return res.status(404).json({message: 'Doctor not found'});
            res.status(200).json(doctor);
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};
