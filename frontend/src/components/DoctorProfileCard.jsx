// DoctorProfileCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaultProfileImg from "../assets/icons/user.jpg";
import ChatPage from "../screens/ChatPage"; // Import the ChatPage component

const DoctorProfileCard = ({ doctor }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!doctor) return null;

  const { _id, user_id, name, specialization, education, experience } = doctor;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-2/3 px-10 bg-white border border-gray-200 rounded-lg shadow-xl shadow-teal-100">
        <div className="flex justify-between py-4">

          <div className="flex">
            <div className="w-36 h-36 mr-2 flex justify-center items-center rounded-full">
              <img
                className="w-32 h-32 rounded-full shadow-xl shadow-teal-100"
                src={doctor.profileImage || defaultProfileImg}
                alt="Doctor profile"
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-4">
              <div className="flex flex-col items-start">
                <h5 className="text-xl font-medium text-teal-500">
                  {name}
                </h5>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {doctor.pmdcCertificate ? "PMDC Verified" : ""}
                </p>
              </div>

              <div className="flex flex-col items-start">
                <h5 className="text-sm font-medium text-teal-500">
                  {specialization}
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {doctor.education.toUpperCase()}
                </p>
              </div>

              <div className="flex items-center gap-20">
                <div className="flex flex-col items-center">
                  <h5 className="text-sm font-medium text-teal-500">
                    Experience
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {doctor.experience} Yrs
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <h5 className="text-sm font-medium text-teal-500">
                    Reviews
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {doctor.feedbacks.length}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <h5 className="text-sm font-medium text-teal-500">
                    Gender
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {doctor.gender.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*Buttons*/}
          <div className="flex flex-col items-center gap-5">
            <Link
              to={`/doctor/${_id}/book-appointment`}
              className="min-w-40 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-teal-500 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Book Appointment
            </Link>
            <Link
              to={`/doctor/${_id}`}
              className="min-w-40 py-2 px-4 ms-2 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-teal-500 hover:bg-teal-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              View Profile
            </Link>
            <Link
              to="#"
              onClick={() => setIsChatOpen(true)}
              className="min-w-40 py-2 px-4 ms-2 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-teal-500 hover:bg-teal-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Message
            </Link>
          </div>

        </div>
      </div>
    </div>
    // <div className="w-full flex justify-center items-center">
    //   <div className="w-2/3 px-10 bg-white border border-gray-200 rounded-lg shadow-xl shadow-teal-100">
    //     <div className="flex p-5 justify-between items-center">
    //       <div className="flex items-center gap-10">
    //         <div className="w-32 h-32 flex justify-center items-center rounded-full">
    //           <img
    //             className="w-24 h-24 rounded-full shadow-xl shadow-teal-100"
    //             src={doctor.profileImage || defaultProfileImg}
    //             alt="Doctor profile"
    //           />
    //         </div>
    //
    //         <div className="grid grid-cols-3 gap-4 justify-start items-center">
    //           <div className="w-48 border-r-2 border-gray-800 flex flex-col justify-start">
    //             <h5 className="mb-1 text-3xl pr-4 font-medium text-teal-500">
    //               {name}
    //             </h5>
    //             <p className="text-xl text-gray-500 dark:text-gray-400">
    //               {specialization}
    //             </p>
    //           </div>
    //
    //           <div className="flex flex-col items-center">
    //             <p className="text-lg text-gray-500 dark:text-gray-400">
    //               {education}
    //             </p>
    //             <p className="flex flex-col text-lg text-gray-500 dark:text-gray-400">
    //               +{experience} Yrs
    //               <span className="text-sm">Experience</span>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //
    //       <div className="flex mt-4 md:mt-6">
    //         <div className="flex flex-col items-center gap-5">
    //           <Link
    //             to={`/doctor/${_id}/book-appointment`}
    //             className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-teal-500 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //           >
    //             Book Appointment
    //           </Link>
    //           <Link
    //             to={`/doctor/${_id}`}
    //             className="py-2 px-4 ms-2 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-teal-500 hover:bg-teal-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    //           >
    //             View Profile
    //           </Link>
    //           <Link
    //             to="#"
    //             onClick={() => setIsChatOpen(true)} // Open the chat modal
    //             className="py-2 px-4 ms-2 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-teal-500 hover:bg-teal-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    //           >
    //             Message
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <ChatPage
    //     role="patient"
    //     doctor_id={user_id}
    //     doctor_name={name}
    //     isOpen={isChatOpen}
    //     onClose={() => setIsChatOpen(false)}
    //   />{" "}
    //   {/* Pass doctor_id prop */}
    // </div>
  );
};

export default DoctorProfileCard;
