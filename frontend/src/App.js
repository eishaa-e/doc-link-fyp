import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Home from "./screens/Home";
import FindDoctor from "./screens/FindDoctor";
import DoctorProfileForm from "./screens/DoctorProfileForm";
import PatientProfileForm from "./screens/PatientProfileForm";
import DoctorProfile from "./screens/DoctorProfile";
import PatientProfile from "./screens/PatientProfile";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import ContactUs from "./screens/ContactUs";
import BookAppointment from "./screens/BookAppointment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Services from "./screens/Services";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/doctor/profile-form" element={<DoctorProfileForm />} />
          <Route
            path="/patient/profile-form"
            element={<PatientProfileForm />}
          />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/patient/:id" element={<PatientProfile />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="/doctor/:doctorId/book-appointment"
            element={<BookAppointment />}
          />
          <Route path="/services" element={<Services />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
