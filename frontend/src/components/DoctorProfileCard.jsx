import React from "react";
import { Link } from "react-router-dom";

const DoctorProfileCard = ({ doctor }) => {
  if (!doctor) return null;

  const { _id, name, specialization, education } = doctor; // Destructure the doctor object

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-2/3 px-10 bg-fuchsia-100 border border-gray-200 rounded-lg shadow">
        <div className="flex p-5 justify-between items-center">
          <div className="flex items-center gap-10">
            <div className="flex flex-col rounded-full items-center md:flex-row ">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bonnie image"
              />
            </div>

            <div className="flex flex-col items-center">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Name: {name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Specialization: {specialization}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Education: {education}
              </span>
            </div>
          </div>

          <div className="flex mt-4 md:mt-6">
            <div className="flex flex-col items-center gap-5">
              <Link
                to={`/doctor/${_id}/book-appointment`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Book Appointment
              </Link>
              <Link
                to={`/doctor/${_id}`}
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                View Profile
              </Link>
              <Link
                to="/"
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileCard;
