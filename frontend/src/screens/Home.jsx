import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/backgroundImg/LandingPageImg1.jpg";
import searchIcon from "../assets/icons/search-icon.svg";
import { Feedback } from "../components/Feedback";
import Services from "./Services";
import axiosInstance from "../services/axiosInterceptor";
import dentistIcon from "../assets/icons/dentist-icon.png";
import gynecologistIcon from "../assets/icons/gynecologist-icon.png";
import dermatologistIcon from "../assets/icons/dermatologist-icon.png";
import orthopedicIcon from "../assets/icons/orthopedic-icon.png";
import neurologistIcon from "../assets/icons/neurologist-icon.png";
import cardiologistIcon from "../assets/icons/cardiologist-icon.png";
import FeedbackForm from "../components/FeedbackForm";
import DoctorCard from "../components/DoctorCard";

function Home({ toggleChat }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const navigate = useNavigate();

  const specializations = [
    { title: "Dentist", img: dentistIcon },
    { title: "Gynecologist", img: gynecologistIcon },
    { title: "Dermatologist", img: dermatologistIcon },
    { title: "Orthopedic Surgeon", img: orthopedicIcon },
    { title: "Neurologist", img: neurologistIcon },
    { title: "Cardiologist", img: cardiologistIcon }
  ];

  const getDoctors = async () => {
    try {
      const response = await axiosInstance.get("/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSpecializationClick = (specialization) => {
    if (specialization === selectedSpecialization) {
      setSelectedSpecialization(null);
      getDoctors();
      return;
    }
    setSelectedSpecialization(specialization);
    getDoctors(specialization);
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="w-full text-black bg-gray-100 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-center items-center mt-20">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-fuchsia-500">
            Empowering Health, <br />
            One Click at a Time
          </h1>
          <p className="font-medium w-5/6 mt-4 text-gray-500">
            Cruise through your health journey effortlessly with our
            user-friendly application. Stay informed, connected, and empowered,
            all in one place. Welcome To Doc Link!
          </p>
          <button
            className="w-50 mt-6 text-white bg-fuchsia-500 hover:bg-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Consult today
          </button>
        </div>
        <div className="flex-1 md:mt-0">
          <img
            src={img}
            alt="Health illustration"
            className="w-11/12 rounded-[2.5rem] shadow-xl shadow-light-orchid"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-20">
        <h2 className="text-3xl font-bold mt-4 mb-2">
          FIND DOCTOR
        </h2>
        <hr className="w-2/12 h-1 bg-gray-400 mb-4" />

        <div className="my-10 px-10 grid grid-cols-6 items-center gap-6 mb-10">
          {specializations.map((specialization, index) => (
            <div
              key={index}
              onClick={() => handleSpecializationClick(specialization.title)}
              className="flex flex-col justify-center items-center gap-2 cursor-pointer hover:scale-110 duration-200"
            >
              <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center">
                <img
                  className="w-20 h-20 rounded-full"
                  src={specialization.img}
                  alt={specialization.title}
                />
              </div>
              <h3 className="text-16 font-normal">{specialization.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors Section */}
      <div className="w-full max-w-6xl mx-auto p-10 flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mt-4 mb-2">Meet Our Doctors</h2>
          <hr className="w-2/12 h-1 bg-gray-400 mb-4" />

          <div
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {doctors.length > 0 ? (doctors.map((doctor, index) => (
                <DoctorCard doctor={doctor} />
              ))
            ) : (
              <p className="text-center text-gray-600">
                No doctors available at the moment.
              </p>
            )}
          </div>
        </div>
      </div>

      <Services toggleChat={toggleChat} />

      <div className="w-full max-w-6xl mb-5 px-10 flex justify-center items-center">
        <Feedback />
      </div>

      <div className="w-full max-w-6xl my-5 p-10 flex justify-center items-center">
        <FeedbackForm />
      </div>
    </div>
  );
}

export default Home;
