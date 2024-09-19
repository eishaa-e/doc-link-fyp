import React, { useEffect, useState } from "react";
import DoctorProfileCard from "../components/DoctorProfileCard";
import axios from "axios";
import gynecologistIcon from "../assets/gynecologist-icon.png";
import dermatologistIcon from "../assets/dermatologist-icon.png";
import dentistIcon from "../assets/dentist-icon.png";
import orthopedicIcon from "../assets/orthopedic-icon.png";
import neurologistIcon from "../assets/neurologist-icon.png";
import cardiologistIcon from "../assets/cardiologist-icon.png";
import axiosInstance from "../services/axiosInterceptor";

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);

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

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="w-full my-10 flex flex-col items-center text-black bg-white">
      <div className="flex flex-col justify-center items-center mt-4 mb-10 cursor-pointer">
        <h2 className="text-center text-4xl font-bold mb-4">Select Doctor</h2>
        <hr className="w-1/2 h-1 bg-gray-800" />
      </div>

      <div className="px-10 grid grid-cols-6 items-center gap-6 mb-10">
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

      <div className="w-full max-w-6xl flex flex-col justify-center items-center gap-5">
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
