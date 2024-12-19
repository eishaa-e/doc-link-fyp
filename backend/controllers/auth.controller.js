const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const Doctor = require("../models/doctor.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // Required for sending emails
const crypto = require("crypto"); // Required for generating reset tokens

const { body, validationResult } = require("express-validator");
const JWT_SECRET = "ThisIsAJWTSecretKey";

const validateRegister = [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 8 chars long").isLength({ min: 8 }),
  body("role", "Role must be either 'doctor' or 'patient'").isIn(["doctor", "patient"])
];

const validateLogin = [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  body("role", "Role must be either 'doctor' or 'patient'").isIn(["doctor", "patient"])
];

// Register a user
exports.register = [
  ...validateRegister,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password, role } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, error: "Sorry, a user with this email already exists..." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, role });
      await newUser.save();

      if (role === "patient") {
        const newPatient = new Patient({ user_id: newUser._id });
        await newPatient.save();
      } else if (role === "doctor") {
        const newDoctor = new Doctor({ user_id: newUser._id });
        await newDoctor.save();
      }

      const authToken = jwt.sign({
        id: newUser.id,
        role: newUser.role,
        email: newUser.email
      }, JWT_SECRET, { expiresIn: "24h" });
      res.status(201).json({ success: true, authToken, role: newUser.role });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
];

// User login
exports.login = [
  ...validateLogin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password, role } = req.body;
      const user = await User.findOne({ email });

      if (!user || user.role !== role) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      const authToken = jwt.sign({
        id: user._id,
        role: user.role,
        email: user.email
      }, JWT_SECRET, { expiresIn: "24h" });
      res.json({ success: true, authToken, role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

// Get user profile
exports.getProfile = async (req, res) => {
  const { id, role } = req.user;

  try {
    if (role === "patient") {
      const patient = await Patient.findOne({ user_id: id });
      if (!patient) return res.status(404).json({ message: "Patient not found" });
      res.status(200).json(patient);
    } else if (role === "doctor") {
      const doctor = await Doctor.findOne({ user_id: id });
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
      res.status(200).json(doctor);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgetPassword = async (req, res) => {
  console.log("Forget password request received");
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS // Your email password or app password
      }
    });

    try {
      await transporter.verify();
      console.log("SMTP connection successful.");
    } catch (error) {
      console.error("SMTP connection failed:", error);
      return res.status(500).json({ error: "Failed to connect to SMTP server." });
    }

    // Send email
    const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.</p>
                   <p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>`
    });

    res.status(200).json({ success: true, message: "Reset link sent to your email" });
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ error: error.message || "An error occurred" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params; // Get token from URL params
  const { password } = req.body; // Get new password from request body

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear the token
    user.resetPasswordExpires = undefined; // Clear the expiration
    await user.save();

    res.status(200).json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?.id;  // Check if the user ID is correctly extracted

  console.log("User ID:", userId);  // Debugging log
  console.log("Old Password:", oldPassword);  // Debugging log
  console.log("New Password:", newPassword);  // Debugging log

  if (!userId) {
    return res.status(401).json({ success: false, message: "User not authenticated" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);  // Log the error to the console
    res.status(500).json({ error: error.message });
  }
};

exports.getPatientId = (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ patient_id: req.session.userId });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
};