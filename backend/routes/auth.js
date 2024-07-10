const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisIsAJWTSecretKey";

// Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
    "/createuser",
    [
        body("name", "Name must be at least 3 chars long").isLength({min: 3}),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 8 chars long").isLength({
            min: 8,
        }),
        body("role", "Role must be either 'doctor' or 'patient'").isIn(['doctor', 'patient']),
    ],
    async (req, res) => {
        let success = false;

        // if there are errors, return Bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        try {
            // Check whether the user with this email exists already
            let user = await User.findOne({email: req.body.email});
            if (user) {
                success = false;
                return res.status(400).json({
                    success,
                    error: "Sorry a user with this email already exists...",
                });
            }

            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                role: req.body.role,
            });

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authToken});

            console.log(res.json({success, authToken}));
        } catch (error) {
            console.log(error);
            res.json({success: false});
        }
    },
);

// Route 2: Authenticate a User using: POST "/api/auth/login".No login required
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blanked").exists(),
        body("role", "Role must be either 'doctor' or 'patient'").isIn(['doctor', 'patient']),
    ],
    async (req, res) => {
        let success = false;
        // if there are errors, return Bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        // Comoponents Destructure
        const {email, password, role} = req.body;
        try {
            let user = await User.findOne({email, role});

            if (!user) {
                success = false;
                return res
                    .status(400)
                    .json({success, error: "Invalid credentials"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res
                    .status(400)
                    .json({success, error: "Invalid credentials"});
            }

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({success, authToken});
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error...!!");
        }
    },
);

module.exports = router;
