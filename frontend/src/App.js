import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import Services from "./screens/Services";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";
import UpdatePassword from "./screens/UpdatePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorScheduleForm from "./screens/DoctorScheduleForm";
import KidneyStonePrediction from "./screens/KidneyStonePrediction";
import BrainTumorPrediction from "./screens/BrainTumorPrediction";
import ProtectedRoutes from "./services/ProtectedRoutes";
import Chatbot from "./screens/Chatbot";
import ChatPage from "./screens/ChatPage";
import ChatIcon from "./components/ChatIcon";

function App() {
  const token = localStorage.getItem("authToken");

  const [isChatBotOpen, setIsChatBotOpen] = useState(false); // Lift the chatbot state up
  const [isDmOpen, setIsDmOpen] = useState(false);
  const feedbackRef = useRef(null);

  const toggleBotChat = () => {
    setIsChatBotOpen((prev) => !prev);
  };

  const toggleDM = () => {
    setIsDmOpen((prev) => !prev);
  };

  const scrollToFeedback = () => {
    feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home toggleChat={toggleBotChat} feedbackRef={feedbackRef}
                                         scrollToFeedback={scrollToFeedback} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/services"
                 element={<Services toggleChat={toggleBotChat} scrollToFeedback={scrollToFeedback} />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />

          {/*Protected Routes*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/find-doctor" element={<FindDoctor />} />
            <Route
              path="/doctor/profile-form"
              element={<DoctorProfileForm />}
            />
            <Route
              path="/patient/profile-form"
              element={<PatientProfileForm />}
            />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/patient/:id" element={<PatientProfile />} />
            <Route
              path="/doctor/:doctorId/book-appointment"
              element={<BookAppointment />}
            />
            <Route
              path="/doctor/schedule-form"
              element={<DoctorScheduleForm />}
            />
            <Route path="/doctor/update-password" element={<UpdatePassword />} />
            <Route path="/patient/update-password" element={<UpdatePassword />} />

            <Route
              path="/chat/:doctor_id"
              element={<ChatPage isOpen={isDmOpen} role="patient" />}
            />

            <Route
              path="/kidney-stone-prediction"
              element={<KidneyStonePrediction />}
            />
            <Route
              path="/brain-tumor-prediction"
              element={<BrainTumorPrediction />}
            />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
      {token && (
        <>
          <ChatIcon />
          <Chatbot isChatOpen={isChatBotOpen} toggleChat={toggleBotChat} />
        </>
      )}

    </div>
  );
}

export default App;
