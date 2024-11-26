import React from "react";
import defaultProfileImg from "../assets/icons/user.jpg";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  return (
    <div
      className="bg-white w-full max-w-[250px] h-full z-0 flex flex-col justify-center items-center p-4 rounded-lg shadow-lg shadow-teal-100 overflow-hidden transform hover:bg-teal-50 hover:scale-105 duration-200">
      <img
        src={doctor.profileImage || defaultProfileImg}
        alt="Doctor"
        className="w-16 h-16 rounded-full shadow-lg border-teal-100"
      />
      <div className="p-2 flex-1 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h3
            className="text-xl font-bold text-teal-900 text-center overflow-hidden text-ellipsis whitespace-nowrap"
            title={doctor.name}
          >
            {doctor.name}
          </h3>
          <p className="text-lg font-medium text-teal-800">{doctor.specialization}</p>
          <div className="w-full text-center text-gray-600 mb-4 text-sm">
            <p>Experience: {doctor.experience} years</p>
          </div>
        </div>
        <Link
          to={`/doctor/${doctor._id}`}
          className="w-28 bg-teal-500 text-white text-center p-1 rounded-full hover:bg-teal-800"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
