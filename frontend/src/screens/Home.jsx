import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";import { useState } from "react";

import img from "../assets/backgroundImg/LandingPageImg1.jpg";
import searchIcon from "../assets/icons/search-icon.svg";
import {  Feedback  } from "../components/Feedback";
import Services from "./Services";
import dentistIcon from "../assets/icons/dentist-icon.png";
import gynecologistIcon from "../assets/icons/gynecologist-icon.png";
import dermatologistIcon from "../assets/icons/dermatologist-icon.png";
import orthopedicIcon from "../assets/icons/orthopedic-icon.png";
import neurologistIcon from "../assets/icons/neurologist-icon.png";
import cardiologistIcon from "../assets/icons/cardiologist-icon.png";
import FeedbackForm from "../components/FeedbackForm";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const specializations = [
    {
      title: "Dentist",
      img: dentistIcon
    },
    {
      title: "Gynecologist",
      img: gynecologistIcon
    },
    {
      title: "Dermatologist",
      img: dermatologistIcon
    },
    {
      title: "Orthopedic Surgeon",
      img: orthopedicIcon
    },
    {
      title: "Neurologist",
      img: neurologistIcon
    },
    {
      title: "Cardiologist",
      img: cardiologistIcon
    }
  ];

  const handleSpecializationClick = (specialization) => {
    navigate("/find-doctor", { state: { specialization } });
  };

  const handleDoctorSearch = () => {
    let specialization = searchQuery;
    navigate("/find-doctor", { state: { specialization } });
  };

  return (
    <div className="w-full text-black bg-gray-100 flex flex-col items-center justify-center">
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
        <h2 className="text-3xl font-bold mt-4 mb-2">FIND DOCTOR</h2>
        <hr className="w-2/12 h-1 bg-gray-400 mb-4" />

        <form className=" w-full flex justify-center items-center gap-2 my-4">
          <input
            type="text"
            placeholder="Search by doctor's category"
            className="w-10/12 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            onChange={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.value);
            }}
          />
          <button onClick={handleDoctorSearch} className="hover:scale-105">
            <img src={searchIcon} className="w-8 h-8" />
          </button>
        </form>

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

      <Services />

      <div className="w-full max-w-6xl mb-5 px-10 flex justify-center items-center">
        <Feedback />
      </div>

      <div className="w-full max-w-6xl my-5 p-10 flex justify-center items-center">
        <FeedbackForm />
      </div>
    </div>
  );
import axiosInstance from "../services/axiosInterceptor";
import gynecologistIcon from "../assets/gynecologist-icon.png";
import dermatologistIcon from "../assets/dermatologist-icon.png";
import dentistIcon from "../assets/dentist-icon.png";
import orthopedicIcon from "../assets/orthopedic-icon.png";
import neurologistIcon from "../assets/neurologist-icon.png";
import cardiologistIcon from "../assets/cardiologist-icon.png";

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
    { title: "Cardiologist", img: cardiologistIcon },
  ];

  const getDoctors = async (specialization = "") => {
    try {
      const url = specialization
        ? `/doctors/?specialization=${specialization}`
        : "/doctors/";
      const response = await axiosInstance.get(url);
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
    <div className="w-full text-black bg-white flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-center mt-20">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800">
            Empowering Health, <br />
            One Click at a Time
          </h1>
          <p className="font-light w-5/6 mt-4 text-gray-600">
            Cruise through your health journey effortlessly with our
            user-friendly application. Stay informed, connected, and empowered,
            all in one place. Welcome To Doc Link!
          </p>
          <button className="w-50 mt-6 text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5">
            Consult Today
          </button>
          <button
            className="w-50 mt-4 ml-2 text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5"
            onClick={() => navigate("/direct-message")}
          >
            Chats
          </button>
        </div>
        <div className="flex-1 md:mt-0">
          <img src={img} alt="Health illustration" className="w-11/12" />
        </div>
      </div>

      {/* Specialization Section */}
      <div className="w-full max-w-6xl my-10 p-10">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Specializations
        </h2>
        <div className="px-10 grid grid-cols-3 md:grid-cols-6 items-center gap-6 mb-10">
          {specializations.map((specialization, index) => (
            <div
              key={index}
              onClick={() => handleSpecializationClick(specialization.title)}
              className={`flex flex-col justify-center items-center gap-2 cursor-pointer ${
                selectedSpecialization === specialization.title
                  ? "border-2 border-blue-500 rounded-lg p-2"
                  : ""
              }`}
            >
              <img
                className="w-12 h-12 rounded-full"
                src={specialization.img}
                alt={specialization.title}
              />
              <h3 className="text-sm font-medium">{specialization.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors Section */}
      <div className="w-full max-w-6xl my-10 p-10">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Meet Our Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <div
                key={index}
                className="flex flex-col bg-gradient-to-br from-purple-200 via-blue-200 to-green-200 text-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full h-28 bg-purple-200 flex items-center justify-center rounded-t-lg">
                  <img
                    src={doctor.profileImage}
                    className="w-20 h-20 rounded-full shadow-lg border-2 border-blue-400"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-bold mb-1 text-blue-600">
                      {doctor.name}
                    </h3>
                    <p className="text-sm font-medium text-purple-500 mb-2">
                      {doctor.specialization}
                    </p>
                    <div className="w-full text-center text-gray-600 mb-4 text-xs">
                      <p>Experience: {doctor.experience} years</p>
                      <p>Rating: ⭐⭐⭐{doctor.rating}</p>
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No doctors available at the moment.
            </p>
          )}
        </div>
      </div>

      {/* Services and Feedback */}
      <div className="w-full max-w-6xl my-5 p-10 flex justify-center align-middle">
        <Services toggleChat={toggleChat} />
      </div>
      <div className="w-full max-w-6xl my-5 p-10 flex justify-center align-middle">
        <Feedback />
      </div>
    </div>
  );
}

export default Home;
