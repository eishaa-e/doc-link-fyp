import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/icons/search-icon.svg";
import { Feedback } from "../components/Feedback";
import Services from "./Services";
import axiosInstance from "../services/axiosInterceptor";
import FeedbackForm from "../components/FeedbackForm";
import Carousal from "../components/Carousal";
import { DOCTOR_SPECIALIZATION } from "../constants/DoctorSpecilazations";
import DoctorCarousel from "../components/DoctorCarousel";

function Home({ toggleChat }) {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const specializations = DOCTOR_SPECIALIZATION;

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
    let name = searchQuery;
    navigate("/find-doctor", { state: { name } });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="w-full text-black bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col justify-start items-start mt-8">
        <h2 className="text-xl font-medium mt-4 mb-2">Find the best doctor</h2>
        <form className="w-full flex justify-start items-center gap-2 my-2">
          <input
            type="text"
            placeholder="Search by doctor's name"
            className="w-full px-6 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-800"
            onChange={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.value);
            }}
          />
          <button onClick={handleDoctorSearch} className="hover:scale-105">
            <img src={searchIcon} className="w-6 h-6" alt="" />
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
          {specializations.slice(0, 8).map((specialization, index) => (
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
              <h3 className="text-[12px] font-normal">
                {specialization.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="w-full text-black bg-gray-100 flex flex-col items-center justify-center">
          <DoctorCarousel doctors={doctors} />
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
