import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInterceptor";
import Notifier from "../services/Notifier";
import Loader from "../components/Loader";
import defaultProfileImg from "../assets/icons/user.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CommonService from "../services/CommonService"; // Calendar styling

const BookAppointment = () => {
  const authToken = localStorage.getItem("authToken");
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctorInfo, setDoctorInfo] = useState({});
  const [patientInfo, setPatientInfo] = useState({});
  const [appointmentDate, setAppointmentDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [loading, setLoading] = useState(true);


  const getDoctorInfo = async () => {
    await axiosInstance.get(`/doctors/get-profile/${doctorId}`)
      .then((response) => {
        setLoading(false);
        setDoctorInfo(response.data);
        setAvailableSlots(response.data.availableTimeSlots);
      })
      .catch((error) => {
        console.error(error);
        Notifier.error("Failed to fetch doctor info!");
      });
  };

  const getPatientInfo = async () => {
    await axiosInstance.get(
      "/patients/get-profile").then((response) => {
      setLoading(false);
      setPatientInfo(response.data);
    }).catch((error) => {
      console.error(error);
      Notifier.error("Failed to fetch patient info!");
    });
  };

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the birth date hasn't occurred yet this year, subtract 1 from the age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date.now();

    return selectedDate >= today;
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const dayIndex = new Date(date).getDay();
    return daysOfWeek[dayIndex];
  };

  const filterSlotsByDate = (date) => {
    const selectedDay = getDayOfWeek(date).toUpperCase().trim();

    // Filter and sort slots by startTime in ascending order
    const filtered = availableSlots
      .filter((slot) => slot.dayOfWeek.toUpperCase().trim() === selectedDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    setFilteredSlots(filtered); // Set filtered slots
  };


  const handleDateChange = (date) => {
    setAppointmentDate(date);
    filterSlotsByDate(date);  // Filter the slots as per selected date
  };

  const handleBookAppointment = async () => {
    const data = {
      doctorId: doctorId,
      patientId: patientInfo._id,
      date: appointmentDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime
    };
    await axiosInstance.post("/appointments/book", data).then(() => {
      Notifier.success("Appointment has been booked successfully");
      navigate(`/patient/${patientInfo._id}`);
    }).catch((error) => {
      console.error(error);
      Notifier.error("Error while booking appointment.");
    });
  };

  useEffect(() => {
    getDoctorInfo();
    getPatientInfo();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="flex flex-col justify-center items-center mt-4 mb-10">
        <h2 className="text-center text-4xl font-bold mb-4">BOOK APPOINTMENT</h2>
        <hr className="w-1/2 h-1 bg-gray-800" />
      </div>
      <div className="flex w-full max-w-6xl justify-between items-start gap-10">
        <div
          className="w-full min-h-[300px] bg-white shadow-xl shadow-teal-100 rounded-lg p-6 mb-8 flex justify-center items-center gap-12">
          <div
            className="w-5/12 flex flex-col justify-center items-center mb-4 border-r-2 border-gray-300">
            <img
              src={patientInfo.profileImage || defaultProfileImg}
              alt="Patient"
              className="w-32 h-32 rounded-full mr-4 mb-5 shadow-xl shadow-teal-100"
            />
            <h2 className="text-2xl font-bold">{patientInfo.name}</h2>
            <p className="text-sm text-gray-500 mt-2 ">
              {patientInfo.email?.length > 20 ? (patientInfo.email).toLowerCase().slice(0, 20) + "..." : patientInfo.email}

            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="font-medium text-gray-500">Gender</p>
                <p className="font-semibold">{patientInfo.gender?.toUpperCase()}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Age</p>
                <p className="font-semibold">{calculateAge(patientInfo.dob)}</p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-semibold">{patientInfo.phone}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">City</p>
                <p className="font-semibold">{patientInfo.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full min-h-[300px] bg-white shadow-xl shadow-teal-100 rounded-lg p-6 mb-8 flex justify-center items-center gap-12">
          <div
            className="w-5/12 flex flex-col justify-center items-center mb-4 border-r-2 border-gray-300">
            <img
              src={doctorInfo.profileImage || defaultProfileImg}
              alt="Patient"
              className="w-32 h-32 rounded-full mr-4 mb-5 shadow-xl shadow-teal-100"
            />
            <h2 className="text-2xl font-bold">{doctorInfo.name}</h2>
            <p className="">{doctorInfo.specialization}</p>
            <p className="text-sm text-gray-500 mt-1">
              {doctorInfo.email?.length > 20 ? (doctorInfo.email).toLowerCase().slice(0, 20) + "..." : doctorInfo.email}
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="text-gray-500">Education</p>
                <p className="font-semibold">{doctorInfo.education}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-semibold">{doctorInfo.phone}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">City</p>
                <p className="font-semibold">{doctorInfo.city}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Gender</p>
                <p className="font-semibold">{doctorInfo.gender?.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar and Slots Container */}
      <div className="grid grid-cols-2 gap-10 w-full max-w-6xl">

        {/* Left Column: Calendar */}
        <div
          className="bg-white shadow-xl shadow-teal-100 rounded-lg p-6 mb-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">Select Appointment Date</h2>
          <Calendar
            onChange={handleDateChange}
            value={appointmentDate}
            minDate={new Date()}
            className="w-full"
          />
        </div>

        {/* Right Column: Available Slots */}
        <div
          className="bg-white shadow-xl shadow-teal-100 rounded-lg p-6 mb-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">Available Time Slots</h2>
          <div className="grid grid-cols-4 gap-4">
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-4 rounded-xl border ${selectedSlot === slot ? "bg-teal-500 text-white" : "bg-teal-100"} hover:bg-teal-800 hover:text-white`}
                >
                  {CommonService.formatTimeToAMPM(slot.startTime)}
                </button>
              ))
            ) : (
              <p className="col-span-4 text-center text-lg">No available slots for the selected date.</p>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleBookAppointment}
        className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-800"
      >
        Book Appointment
      </button>

    </div>
  );
};

export default BookAppointment;
