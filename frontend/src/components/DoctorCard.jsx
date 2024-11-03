import React from "react";
import defaultProfileImg from "../assets/icons/user.jpg";
import { Link } from "react-router-dom";


const DoctorCard = ({ doctor }) => {
  return (
    <div
      className="bg-white w-full h-full min-h-[200px] z-0 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg shadow-light-orchid overflow-hidden transform hover:bg-fuchsia-100 hover:scale-105 duration-200">
      <img
        src={doctor.profileImage || defaultProfileImg}
        alt="img"
        className="w-28 h-28 rounded-full shadow-lg border-light-orchid"
      />
      <div className="p-4 flex-1 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-1 text-blue-600">
            {doctor.name}
          </h3>
          <p className="text-lg font-medium text-purple-500 mb-2">
            {doctor.specialization}
          </p>
          <div className="w-full text-center text-gray-600 mb-4 text-sm">
            <p>Experience: {doctor.experience} years</p>
          </div>
        </div>
        <Link
          to={`/doctor/${doctor._id}`}
          className="w-32 bg-fuchsia-500 text-white text-center p-2 rounded-full hover:divide-fuchsia-400"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;