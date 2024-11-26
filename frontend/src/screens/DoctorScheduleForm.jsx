import React, { useEffect, useState } from "react";
import axiosInterceptor from "../services/axiosInterceptor";
import axiosInstance from "../services/axiosInterceptor";
import Notifier from "../services/Notifier";
import { useNavigate } from "react-router-dom";

const DoctorScheduleForm = () => {
  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ];
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const availableSlots = [
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "6:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
    "12:00 AM",
    "12:30 AM",
    "01:00 AM",
    "01:30 AM",
    "02:00 AM",
    "02:30 AM",
    "03:00 AM",
    "03:30 AM",
    "04:00 AM",
    "04:30 AM",
    "05:00 AM",
    "05:30 AM",
    "06:00 AM",
    "06:30 AM"
  ];

  // Convert 12-hour time format to 24-hour format
  const convertTo24Hour = (time) => {
    const [timeString, modifier] = time.split(" ");
    let [hours, minutes] = timeString.split(":");
    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (modifier === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  };

  // Pre-fill the slots from the API data
  const preFillSlots = (availableTimeSlots) => {
    const filledSlots = {};
    const filledSchedule = [];

    availableTimeSlots.forEach((slot) => {
      if (!filledSlots[slot.dayOfWeek]) {
        filledSlots[slot.dayOfWeek] = [];
      }
      filledSlots[slot.dayOfWeek].push({
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime
      });
      filledSchedule.push(slot);
    });

    setSelectedSlots(filledSlots);
    setSchedule(filledSchedule);
  };

  // Add selected slot to the schedule
  const handleSlotSelection = (slot) => {
    if (!selectedDay) {
      alert("Please select a day first.");
      return;
    }

    const startTime24 = convertTo24Hour(slot);
    const [startHours, startMinutes] = startTime24.split(":");
    let endHours = parseInt(startHours, 10);
    let endMinutes = parseInt(startMinutes, 10) + 30;

    if (endMinutes >= 60) {
      endMinutes -= 60;
      endHours += 1;
    }

    const endTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;

    const newSlot = {
      dayOfWeek: selectedDay,
      startTime: startTime24,
      endTime
    };

    setSchedule((prevSchedule) => [...prevSchedule, newSlot]);

    setSelectedSlots((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newSlot]
    }));
  };

  // Remove selected slot from the schedule
  const removeSlot = (day, slot) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [day]: prev[day].filter((s) => s.startTime !== slot.startTime)
    }));
    setSchedule((prevSchedule) =>
      prevSchedule.filter((s) => s.startTime !== slot.startTime)
    );
  };

  const getDoctor = async () => {
    await axiosInstance
      .get(`/doctors/get-profile`)
      .then((response) => {
        setLoading(false);
        setDoctor(response.data);
        preFillSlots(response.data.availableTimeSlots); // Pre-fill available time slots
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = async () => {
    await axiosInterceptor
      .put("/doctors/update-availability", schedule)
      .then(() => {
        Notifier.success("Your schedule has been updated successfully.");
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        Notifier.error("Error while updating schedule.");
      });
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <div className="w-full bg-gray-100 py-10">
      <div
        className="w-full max-w-7xl flex flex-col justify-center items-center mx-auto">
        <h2 className="text-2xl text-center font-bold my-5">
          Manage Availability Schedule
        </h2>

        <div
          className="w-full flex justify-start items-start gap-6 p-10 bg-white rounded-xl shadow-xl shadow-teal-100">
          {/* Days of the week selection */}
          <div className="flex justify-start flex-col gap-5 my-5 px-5 border-r-2 border-gray-300">
            <h2 className="text-2xl font-bold text-center">
              Select Day
              <hr className="w-full h-1 bg-gray-400 mt-2" />
            </h2>
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-3 px-4 rounded-xl border ${selectedDay === day ? "bg-teal-500 text-white" : "bg-teal-100"} hover:bg-teal-800 hover:text-white shadow-lg shadow-teal-100`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="w-full ">
            <h2 className="text-2xl font-bold text-center flex flex-col justify-center items-center">
              Pick time slots
              <hr className="w-1/5 h-1 bg-gray-400 mt-2" />
            </h2>
            {/* Time slots selection */}
            {selectedDay && (
              <div className="w-full grid grid-cols-12 gap-3 mt-4">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotSelection(slot)}
                    className={`py-3 px-4 rounded-xl border shadow-lg my-4 ${selectedSlots[selectedDay]?.some((s) => s.startTime === convertTo24Hour(slot)) ? "bg-teal-500 text-white shadow-teal-100" : "bg-teal-100"} hover:bg-teal-800 hover:text-white`}
                    disabled={selectedSlots[selectedDay]?.some((s) => s.startTime === convertTo24Hour(slot))}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>


        <div className="w-full bg-white my-10 p-10 shadow-xl shadow-teal-100 rounded-xl">
          <h2 className="text-2xl font-bold text-center flex flex-col justify-center items-center">
            Selected Slots
            <hr className="w-1/5 h-1 bg-gray-400 mt-2" />
          </h2>
          {/* Selected slots display */}
          {Object.keys(selectedSlots).map((day) => (
            <div key={day} className="w-full mt-6">
              <h3 className="font-semibold text-lg">{day}</h3>
              <div className="grid grid-cols-12 gap-3 mt-2">
                {selectedSlots[day].map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-teal-100 border rounded-lg p-2 shadow-lg shadow-teal-100"
                  >
                    <p>
                      {slot.startTime} - {slot.endTime}
                    </p>
                    <button
                      onClick={() => removeSlot(day, slot)}
                    >
                      <svg className="w-5 h-5 text-red-600" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                           fill="currentColor"
                           viewBox="0 0 24 24">
                        <path fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z"
                              clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-800"
        >
          Save Schedule
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-3 bg-teal-100 text-black rounded-full shadow-lg hover:bg-teal-800 hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DoctorScheduleForm;
