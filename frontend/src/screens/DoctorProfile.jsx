import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../services/axiosInterceptor";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUserRole = localStorage.getItem("role");

  const getDoctor = async () => {
    await axiosInstance
      .get(`/doctors/get-profile/${id}`)
      .then((response) => {
        setLoading(false);
        setDoctor(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDoctor();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full flex flex-col items-center text-black bg-white">
        <h2 className="text-6xl font-bold my-5"> Doctor </h2>
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <div className="w-full flex justify-center items-center rounded-lg">
            <div className="w-3/5 my-5 flex justify-center border-gray-400 rounded-lg shadow-lg">
              <div className="w-1/2 p-10 py-20 bg-gray-100 flex justify-center align-middle">
                <div className="flex justify-center rounded-full items-center md:flex-row ">
                  <img
                    className=" mb-3 rounded-lg shadow-lg"
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Bonnie image"
                  />
                </div>
              </div>
              <div className="w-1/2 p-10 py-20 bg-fuchsia-200">
                <div className="flex flex-col">
                  <div className="mb-5">
                    <h2 className="font-medium bold text-xl my-2 text-gray-500">
                      Profile
                    </h2>
                    <h3 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                      {doctor.name}
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-gray-400">
                      {doctor.education}
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      {doctor.city}
                    </p>
                  </div>

                  <div className="mb-5">
                    <h2 className="font-medium text-xl my-2">Specialization</h2>
                    <h3 className="mb-1 text-lg font-medium text-gray-500 dark:text-white">
                      {doctor.specialization}
                    </h3>
                  </div>

                  <div className="mb-5">
                    <h2 className="font-medium bold text-xl my-2">
                      Experience
                    </h2>
                    <h3 className="mb-1 text-lg font-medium text-gray-600 dark:text-white">
                      {doctor.experience}
                    </h3>
                  </div>

                  <div className="mb-5">
                    <h2 className="font-medium bold text-xl my-2">Contact</h2>
                    <h3 className="mb-1 text-lg font-medium text-gray-600 dark:text-white">
                      {doctor.phone}
                    </h3>
                  </div>

                  <div>
                    <div className="flex mt-4 md:mt-6">
                      <div className="flex items-center gap-5">
                        <Link
                          to="/"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Book Appointment
                        </Link>
                        {currentUserRole === "doctor" ? (
                          <Link
                            to="/doctor/profile-form"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Update Profile
                          </Link>
                        ) : null}
                        <Link
                          onClick={() => {
                            navigate(-1);
                          }}
                          className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-fuchsia-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
