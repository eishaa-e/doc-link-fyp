import React, { useEffect, useState } from "react";
import DoctorProfileCard from "../components/DoctorProfileCard";
import axiosInstance from "../services/axiosInterceptor";
import { useLocation } from "react-router-dom";
import img from "../assets/backgroundImg/LandingPageImg1.jpg";
import searchIcon from "../assets/icons/search-icon.svg";
import { DOCTOR_SPECIALIZATION } from "../constants/DoctorSpecilazations";
import Loader from "../components/Loader";

const FindDoctor = () => {
  const location = useLocation();
  const initialSpecialization = location.state?.specialization || "";
  const [loading, setLoading] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(initialSpecialization);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For dialog box state

  const specializations = DOCTOR_SPECIALIZATION;

  const getDoctors = async (specialization = "", name = "") => {
    setLoading(true);
    let url = "/doctors/";

    if (specialization || name) {
      const queryParams = new URLSearchParams();
      if (specialization) queryParams.append("specialization", specialization);
      if (name) queryParams.append("name", name);
      url += `?${queryParams.toString()}`;
    }

    await axiosInstance
      .get(url)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleSpecializationClick = (specialization) => {
    if (specialization === selectedSpecialization) {
      setSelectedSpecialization(null);
      getDoctors("", searchQuery);
      return;
    }
    setSelectedSpecialization(specialization);
    getDoctors(specialization, searchQuery);
  };

  const handleDoctorSearch = (e) => {
    e.preventDefault();
    getDoctors(selectedSpecialization, searchQuery);
  };

  const handleClearFilters = () => {
    setSelectedSpecialization("");
    setSearchQuery("");
    getDoctors();
  };

  const handleViewAllClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogCategorySelect = (specialization) => {
    setSelectedSpecialization(specialization);
    getDoctors(specialization, searchQuery);
    setIsDialogOpen(false); // Close the dialog after selection
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
          placeholder="Search by doctor's name"
          className="w-full px-6 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-800"
          onChange={(e) => {
            e.preventDefault();
            setSearchQuery(e.target.value);
          }}
        />
        <button onClick={handleDoctorSearch} className="hover:scale-105">
          <img src={searchIcon} className="w-6 h-6" />
        </button>
        <button
          onClick={handleClearFilters}
          className=" bg-red-500 text-white text-sm px-2 py-2 rounded-xl"
        >
          Clear
        </button>
      </form>

      <div className="flex items-center text-center">
        <div className="my-6 px-10 grid grid-cols-8 items-center gap-6 mb-8">
          {specializations.slice(0, 8).map((specialization, index) => (
            <div
              key={index}
              onClick={() => handleSpecializationClick(specialization.title)}
              className={`flex flex-col justify-center items-center gap-2 cursor-pointer hover:scale-110 duration-200 ${
                selectedSpecialization === specialization.title
                  ? "bg-teal-500 text-white border-2 rounded-xl px-1 border-teal-800"
                  : ""
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex justify-center items-center ${
                  selectedSpecialization === specialization.title
                    ? "bg-teal-800"
                    : "bg-gray-300"
                }`}
              >
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
        <button
          onClick={handleViewAllClick}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:scale-105 duration-200"
        >
          View All
        </button>
      </div>

      <div className="w-full max-w-8xl flex flex-col justify-center items-center gap-5">
        {loading && <Loader />}
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

      {isDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Choose a Category</h3>
              <button
                onClick={handleDialogClose}
                className="text-gray-500 hover:text-black text-lg font-bold"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {specializations.map((specialization, index) => (
                <div
                  key={index}
                  onClick={() => handleDialogCategorySelect(specialization.title)}
                  className="flex flex-col justify-center items-center gap-2 cursor-pointer hover:scale-105 duration-200 bg-gray-300 p-4 rounded-xl"
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
        </div>
      )}
    </div>
  );
};

export default FindDoctor;
