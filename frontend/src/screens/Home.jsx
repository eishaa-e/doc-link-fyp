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
import Carousal from "../components/Carousal";

function Home({ toggleChat }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const specializations = [
    { title: "Dentist", img: dentistIcon },
    { title: "Gynecologist", img: gynecologistIcon },
    { title: "Dermatologist", img: dermatologistIcon },
    { title: "Orthopedic Surgeon", img: orthopedicIcon },
    { title: "Neurologist", img: neurologistIcon },
    { title: "Cardiologist", img: cardiologistIcon },
    { title: "Pediatrician", img: dentistIcon },
    { title: "Ophthalmologist", img: gynecologistIcon }
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
    navigate("/find-doctor", { state: { specialization } });
  };

  const handleDoctorSearch = () => {
    let specialization = searchQuery;
    navigate("/find-doctor", { state: { specialization } });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="w-full text-black bg-gray-100 flex flex-col items-center justify-center">

      <div className="w-full max-w-6xl flex flex-col justify-start items-start mt-8">
        <h2 className="text-xl font-medium mt-4 mb-2">
          Find the best doctor
        </h2>
        <form className="w-full flex justify-start items-center gap-2 my-2">
          <input
            type="text"
            placeholder="Search by doctor's name or category"
            className="w-full px-6 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-800"
            onChange={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.value);
            }}
          />
          <button onClick={handleDoctorSearch}>
            <button onClick={handleDoctorSearch} className="hover:scale-105">
              <img src={searchIcon} className="w-6 h-6" />
            </button>
          </button>
        </form>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-center items-center mt-8">
        <Carousal />
      </div>

      <div className="flex flex-col justify-center items-center mt-8">
        <h2 className="text-xl font-medium mt-4 mb-2">
          Consult the best doctors
        </h2>
        <hr className="w-2/12 h-1 bg-gray-400 mb-4" />

        <div className="my-6 px-10 grid grid-cols-8 items-center gap-6 mb-8">
          {specializations.map((specialization, index) => (
            <div
              key={index}
              onClick={() => handleSpecializationClick(specialization.title)}
              className="flex flex-col justify-center items-center gap-2 cursor-pointer hover:scale-110 duration-200"
            >
              <div className="w-14 h-14 bg-gray-300 rounded-full flex justify-center items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src={specialization.img}
                  alt={specialization.title}
                />
              </div>
              <h3 className="text-[12px] font-normal">{specialization.title}</h3>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col justify-center items-center">

          <h2 className="text-xl font-medium mt-4 mb-2">
            Consult our doctors
          </h2>
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
