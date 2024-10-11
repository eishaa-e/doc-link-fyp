import React from "react";
import {Link} from "react-router-dom";
import defaultProfileImg from "../assets/icons/user.jpg"

const DoctorProfileCard = ({doctor}) => {
    if (!doctor) return null;

    const {_id, name, specialization, education, experience} = doctor; // Destructure the doctor object

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-2/3 px-10 bg-white border border-gray-200 rounded-lg shadow-xl shadow-light-orchid">
                <div className="flex p-5 justify-between items-center">
                    <div className="flex items-center gap-10">
                        <div
                            className="w-32 h-32 flex justify-center items-center rounded-full">
                            <img
                                className="w-24 h-24 rounded-full shadow-xl shadow-light-orchid"
                                src={doctor.profileImage || defaultProfileImg}
                                alt="Bonnie image"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4 justify-start items-center">
                            <div className="w-48 border-r-2 border-gray-800 flex flex-col justify-start">
                                <h5 className="mb-1 text-3xl pr-4 font-medium text-fuchsia-500">
                                    {name}
                                </h5>
                                <p className="text-xl text-gray-500 dark:text-gray-400">
                                    {specialization}
                                </p>
                            </div>


                            <div className="flex flex-col items-center">
                                <p className="text-lg text-gray-500 dark:text-gray-400">
                                    {education}
                                </p>
                                <p className="flex flex-col text-lg text-gray-500 dark:text-gray-400">
                                    +{experience} Yrs
                                    <span className="text-sm">Experience</span>
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="flex mt-4 md:mt-6">
                        <div className="flex flex-col items-center gap-5">
                            <Link
                                to={`/doctor/${_id}/book-appointment`}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-fuchsia-500 rounded-lg hover:bg-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Book Appointment
                            </Link>
                            <Link
                                to={`/doctor/${_id}`}
                                className="py-2 px-4 ms-2 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-fuchsia-500 hover:bg-fuchsia-400 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                View Profile
                            </Link>
                            <Link
                                to="/"
                                className="py-2 px-4 ms-2 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-fuchsia-500 hover:bg-fuchsia-400 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
