import React, { useState, useRef, useEffect } from 'react';
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
import Services from "./screens/Services";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";
import UpdatePassword from "./screens/UpdatePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import ChatItem from './screens/ChatItem';
import { RiRobot3Fill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // Lift the chatbot state up

  // Function to toggle the chatbot
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

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
          <Route path="/patient/profile-form" element={<PatientProfileForm />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/patient/:id" element={<PatientProfile />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/doctor/:doctorId/book-appointment" element={<BookAppointment />} />
          <Route path="/services" element={<Services toggleChat={toggleChat} />} /> {/* Pass the toggle function */}
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/doctor/update-password" element={<UpdatePassword />} />
          <Route path="/patient/update-password" element={<UpdatePassword />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>

      <Chatbot isChatOpen={isChatOpen} toggleChat={toggleChat} /> {/* Pass the state and function */}
    </div>
  );
}

function Chatbot({ isChatOpen, toggleChat }) {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', content: 'Hello! I am a medical chatbot. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const currentResponseRef = useRef('');
  const chatContainerRef = useRef(null);

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    let prompt = query;
    setQuery('');

    const userMessage = { type: 'user', content: prompt };
    setChatHistory([...chatHistory, userMessage]);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: prompt })
      });
      const data = await res.json();
      const botMessage = { type: 'bot', content: data.response };
      setChatHistory((prev) => [...prev, botMessage]);

      currentResponseRef.current = data.response;
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatHistory((prev) => [...prev, { type: 'bot', content: 'Error fetching response' }]);
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b bg-blue-500 text-white">
            <h2 className="text-xl font-semibold">Medical Chatbot</h2>
          </div>
          <div
            className="p-6 h-[500px] overflow-y-auto"
            ref={chatContainerRef}
          >
            {chatHistory.map((msg, index) => (
              <ChatItem key={index} msg={msg} />
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[60%] p-4 rounded-lg bg-gray-200 text-gray-800 flex items-center">
                  <FiCpu className="mr-2" />
                  <p>Thinking...</p>
                </div>
              </div>
            )}
          </div>
          <form className="flex items-center p-4 border-t bg-gray-100" onSubmit={handleQuery}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 flex items-center justify-center"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={toggleChat}
      >
        {!isChatOpen ? <RiRobot3Fill /> : <RxCross2 />}
      </button>
    </div>
  );
}

export default App;
