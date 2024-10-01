import React, { useEffect, useState } from "react";
import axiosInterceptor from "../services/axiosInterceptor";
import axiosInstance from "../services/axiosInterceptor";
import Notifier from "../services/Notifier";
import { Navigate, useNavigate } from "react-router-dom";

const DoctorScheduleForm = () => {
  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const [selectedDay, setSelectedDay] = useState(null);
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
    "06:30 AM",
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
        endTime: slot.endTime,
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
      endTime,
    };

    setSchedule((prevSchedule) => [...prevSchedule, newSlot]);

    setSelectedSlots((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newSlot],
    }));
  };

  // Remove selected slot from the schedule
  const removeSlot = (day, slot) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [day]: prev[day].filter((s) => s.startTime !== slot.startTime),
    }));
    setSchedule((prevSchedule) =>
      prevSchedule.filter((s) => s.startTime !== slot.startTime),
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
    <div className="w-full max-w-7xl flex flex-col justify-center items-center bg-fuchsia-100 rounded-lg shadow-lg p-6 mx-auto my-10">
      <h2 className="text-2xl text-center font-bold my-5">
        Manage Availability Schedule
      </h2>

      {/* Days of the week selection */}
      <div className="grid grid-cols-7 gap-5 my-5">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`py-3 px-4 rounded-xl border ${selectedDay === day ? "bg-light-orchid text-white" : "bg-white"} hover:bg-fuchsia-300`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Time slots selection */}
      {selectedDay && (
        <div className="w-full grid grid-cols-12 gap-3 mt-4">
          {availableSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => handleSlotSelection(slot)}
              className={`py-3 px-4 rounded-xl border ${selectedSlots[selectedDay]?.some((s) => s.startTime === convertTo24Hour(slot)) ? "bg-light-orchid text-white" : "bg-white"} hover:bg-fuchsia-300`}
            >
              {slot}
            </button>
          ))}
        </div>
      )}

      {/* Selected slots display */}
      {Object.keys(selectedSlots).map((day) => (
        <div key={day} className="w-full mt-6">
          <h3 className="font-semibold text-lg">{day}</h3>
          <div className="grid grid-cols-12 gap-3 mt-2">
            {selectedSlots[day].map((slot, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-white border rounded-lg p-2"
              >
                <p>
                  {slot.startTime} - {slot.endTime}
                </p>
                <button
                  onClick={() => removeSlot(day, slot)}
                  className="text-red-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 12H6"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-light-orchid text-white rounded-full hover:bg-fuchsia-400"
      >
        Save Schedule
      </button>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-3 bg-white text-black rounded-full hover:bg-fuchsia-400 hover:text-white"
      >
        Back
      </button>
    </div>
  );
};

export default DoctorScheduleForm;
