import React from "react";
import { useState } from "react";

import img from "../assets/backgroundImg/LandingPageImg1.jpg";
import searchIcon from "../assets/icons/search-icon.svg";
import { Feedback } from "../components/Feedback";
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
      img: dentistIcon,
    },
    {
      title: "Gynecologist",
      img: gynecologistIcon,
    },
    {
      title: "Dermatologist",
      img: dermatologistIcon,
    },
    {
      title: "Orthopedic Surgeon",
      img: orthopedicIcon,
    },
    {
      title: "Neurologist",
      img: neurologistIcon,
    },
    {
      title: "Cardiologist",
      img: cardiologistIcon,
    },
  ];

  const handleSpecializationClick = (specialization) => {
    navigate("/find-doctor", { state: { specialization } }); // Pass the selected specialization using state
  };

  const handleDoctorSearch = () => {
    let specialization = searchQuery.toLowerCase();
    navigate("/find-doctor", { state: { specialization } }); // Pass the selected specialization using state
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
          <button className="w-50 mt-6 text-white bg-fuchsia-500 hover:bg-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
          <button onClick={handleDoctorSearch}>
            <img src={searchIcon} className="w-8 h-8 " />
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
}

export default Home;
