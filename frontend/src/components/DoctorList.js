import React, { useState } from "react";
import DoctorProfileCard from "./DoctorProfileCard";
import ChatPage from "../screens/ChatPage";

const DoctorsList = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const openChat = (doctor) => {
    setSelectedDoctor(doctor);
    setIsChatModalOpen(true);
  };

  const closeChat = () => {
    setIsChatModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div>
      {doctors.map((doctor) => (
        <DoctorProfileCard
          key={doctor._id}
          doctor={doctor}
          onMessageClick={openChat}
        />
      ))}

      {isChatModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <button onClick={closeChat} className="absolute top-2 right-2 text-gray-500">X</button>
            <ChatPage role="patient" doctor_id={selectedDoctor?._id} onClose={closeChat} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
