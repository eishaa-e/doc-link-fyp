import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Home from "./screens/Home";
import AppointmentBooking from "./screens/AppointmentBooking";
import DoctorProfileForm from "./screens/DoctorProfileForm";
import PatientProfileForm from "./screens/PatientProfileForm";
import DoctorProfile from "./screens/DoctorProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/doctor/profile-form" element={<DoctorProfileForm />} />
        <Route path="/patient/profile-form" element={<PatientProfileForm />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
