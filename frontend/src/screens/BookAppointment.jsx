import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/doc-link-icon.png";

const BookAppointment = () => {
  const authToken = localStorage.getItem("authToken");
  const { doctorId } = useParams();

  const [doctorInfo, setDoctorInfo] = useState({});
  const [patientInfo, setPatientInfo] = useState({});

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getDoctorInfo = async () => {
    axios
      .get(`http://localhost:5000/api/doctors/get-profile/${doctorId}`, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((response) => {
        setLoading(false);
        setDoctorInfo(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedSlot, setSelectedSlot] = useState(null);

  const availableSlots = [
    "06:30 PM",
    "06:45 PM",
    "07:00 PM",
    "07:15 PM",
    "07:30 PM",
    "07:45 PM",
    "08:00 PM",
    "08:15 PM",
    "08:30 PM",
    "08:45 PM",
    "09:00 PM",
    "09:15 PM",
    "09:30 PM",
    "09:45 PM",
    "10:00 PM",
    "10:15 PM",
    "10:30 PM",
    "10:45 PM",
  ];

  useEffect(() => {
    getDoctorInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Patient Info */}
      {/* <div className="w-full max-w-lg bg-fuchsia-100 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
        <div className="mb-2">
          <strong>Name:</strong> {patientInfo.name}
        </div>
        <div className="mb-2">
          <strong>City:</strong> {patientInfo.city}
        </div>
        <div className="mb-2">
          <strong>Gender:</strong> {patientInfo.gender}
        </div>
        <div className="mb-2">
          <strong>Phone:</strong> {patientInfo.phone}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {patientInfo.email}
        </div>
      </div> */}

      {/* Doctor Info */}
      <div className="w-full max-w-lg bg-fuchsia-100 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center">
          <img
            src="/path/to/doctor-image.jpg"
            alt="Doctor"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{doctorInfo.name}</h2>
            <p>{doctorInfo.specialization} (Online)</p>
            <p>
              <strong>Experience:</strong> {doctorInfo.experience}
            </p>
            <p>
              <strong>Fee:</strong> Rs. {doctorInfo.fee}
            </p>
          </div>
        </div>
        <div className="mt-4 text-blue-500">
          <a href="#" className="hover:underline">
            Change Clinic
          </a>
        </div>
      </div>

      {/* Available Slots */}
      <div className="w-full max-w-lg bg-fuchsia-100 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded">
            Today, 10
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded hover:bg-gray-100">
            Sep, 11
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded hover:bg-gray-100">
            Sep, 12
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded hover:bg-gray-100">
            Sep, 13
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {availableSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSelectedSlot(slot)}
              className={`py-2 px-4 rounded border ${selectedSlot === slot ? "bg-light-orchid text-white" : "bg-white"} hover:bg-fuchsia-300`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Pay Online Option */}
      <div className="mt-4">
        <a href="#" className="text-blue-500 hover:underline">
          Pay Online & Get Up to 40% off
        </a>
      </div>
    </div>
  );
};

export default BookAppointment;
