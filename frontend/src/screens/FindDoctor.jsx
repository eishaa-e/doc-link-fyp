import React, { useEffect, useState } from "react";
import DoctorProfileCard from "../components/DoctorProfileCard";
import axiosInstance from "../services/axiosInterceptor";
import { useLocation } from "react-router-dom";
import img from "../assets/backgroundImg/LandingPageImg1.jpg";
import searchIcon from "../assets/icons/search-icon.svg";
import { DOCTOR_SPECIALIZATION } from "../constants/DoctorSpecilazations";

const FindDoctor = () => {
  const location = useLocation(); // Get the state from location
  const initialSpecialization = location.state?.specialization || ""; // Retrieve specialization from state

  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(initialSpecialization);
  const [searchQuery, setSearchQuery] = useState("");

  const specializations = DOCTOR_SPECIALIZATION;

  const getDoctors = async (specialization = "") => {
    let url = "/doctors/";

    if (specialization) {
      url += `?specialization=${specialization}`;
    }

    await axiosInstance
      .get(url)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
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

  const handleDoctorSearch = (e) => {
    e.preventDefault();
    getDoctors(searchQuery);
  };

  useEffect(() => {
    getDoctors(initialSpecialization);
  }, [initialSpecialization]);

  return (
    <div className="w-full py-10 flex flex-col items-center text-black bg-gray-100">
      <div className="flex flex-col justify-center items-center mt-4 mb-10 cursor-pointer">
        <h2 className="text-center text-4xl font-bold mb-4">Select Doctor</h2>
        <hr className="w-1/2 h-1 bg-gray-800" />
      </div>

      <form className="w-2/3 flex justify-start items-center gap-2 my-2">
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

      <div className="flex items-center text-center">
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
        {/*<button className="text-xl font-medium items-center hover:text-teal-800 hover:scale-105 transition">View*/}
        {/*  All*/}
        {/*</button>*/}
      </div>

      <div className="w-full max-w-8xl flex flex-col justify-center items-center gap-5">
        {doctors &&
          doctors.map((doctor, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-center items-center text-center"
              >
                <DoctorProfileCard doctor={doctor} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FindDoctor;
