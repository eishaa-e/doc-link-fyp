import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInterceptor";
import Loader from "../components/Loader";
import AppointmentListItem from "../components/AppointmentListItem";
import CommonService from "../services/CommonService";

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(true);

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);

  const [upcomingSelected, setUpcomingSelected] = useState(true);
  const [pastSelected, setPastSelected] = useState(false);
  const [cancelledSelected, setCancelledSelected] = useState(false);

  const [pastCount, setPastCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);

  const getPatient = async () => {
    await axiosInstance
      .get(`/patients/get-profile/${id}`)
      .then((response) => {
        setLoading(false);
        setPatient(response.data);
        console.log("Patient - Profile: ", response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchAppointments = async () => {
    try {
      const [upcoming, past, cancelled] = await Promise.all([
        axiosInstance.get(`/appointments/patients/${id}?query=upcoming`),
        axiosInstance.get(`/appointments/patients/${id}?query=past`),
        axiosInstance.get(`/appointments/patients/${id}?query=cancelled`)
      ]);

      setUpcomingAppointments(upcoming.data.appointments);
      setUpcomingCount(upcoming.data.appointments.length);
      setPastAppointments(past.data.appointments);
      setPastCount(past.data.appointments.length);
      setCancelledAppointments(cancelled.data.appointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    const { status } = updatedAppointment;

    // Remove the appointment from all categories
    setUpcomingAppointments((prev) =>
      prev.filter((appt) => appt._id !== updatedAppointment._id)
    );
    setPastAppointments((prev) =>
      prev.filter((appt) => appt._id !== updatedAppointment._id)
    );
    setCancelledAppointments((prev) =>
      prev.filter((appt) => appt._id !== updatedAppointment._id)
    );

    // Add the updated appointment to the appropriate category
    if (status === "BOOKED") {
      setUpcomingAppointments((prev) => [updatedAppointment, ...prev]);
    } else if (status === "CANCELLED") {
      setCancelledAppointments((prev) => [updatedAppointment, ...prev]);
    } else if (status === "PAST") {
      setPastAppointments((prev) => [updatedAppointment, ...prev]);
    }
  };

  useEffect(() => {
    getPatient();
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto my-10 flex justify-center items-start">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100">

      <div className="w-full max-w-7xl mx-auto py-10 flex justify-center items-start">
        <div
          className="w-1/2 bg-white shadow-xl shadow-teal-100 rounded-lg p-6 mb-8 flex justify-center items-center gap-12">
          <div className="w-5/12 flex flex-col justify-center items-center mb-4 border-r-2 border-gray-300">
            <img
              src={patient.profileImage}
              alt="Patient"
              className="w-32 h-32 rounded-full mr-4 mb-5 shadow-xl shadow-teal-100"
            />
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <p className="text-lg text-gray-500 mt-2">{patient.email}</p>

            <div className="flex flex-col justify-center items-center mt-5">
              <p className="text-xl font-medium text-gray-500">Appointments</p>
              <div className="grid grid-cols-2 my-3">
                <div
                  className="flex flex-col justify-center items-center border-r-2 border-gray-300 pr-5">
                  <p className="text-3xl font-bold text-center">{pastCount}</p>
                  <h2 className="text-lg font-medium text-gray-500">Past</h2>
                </div>
                <div className="flex flex-col justify-center items-center pl-5">
                  <p className="text-3xl font-bold text-center">{upcomingCount}</p>
                  <h2 className="text-lg font-medium text-gray-500">Upcoming</h2>
                </div>
              </div>
            </div>

            <Link
              to="/patient/profile-form"
              className="text-center bg-teal-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-teal-800"
            >
              Update Profile
            </Link>
            {/* New Update Password Button */}
            <Link
              to="/patient/update-password"
              className="text-center bg-teal-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-teal-800"
            >
              Update Password
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* Other Profile Information */}
            <div>
              <p className="font-medium text-gray-500">Gender</p>
              <p className="font-semibold">{patient.gender?.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-500">Birthday</p>
              <p className="font-semibold">{CommonService.formatDate(patient.dob)}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone number</p>
              <p className="font-semibold">{patient.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-semibold">
                {patient.address || "Abc Street, Xyz Town"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">City</p>
              <p className="font-semibold">{patient.city}</p>
            </div>
            <div>
              <p className="text-gray-500">ZIP Code</p>
              <p className="font-semibold">{patient.zipcode || "123456"}</p>
            </div>
            <div>
              <p className="text-gray-500">Registration date</p>
              <p className="font-semibold">{CommonService.formatDate(patient.registeredAt)}</p>
            </div>
            <div>
              <p className="text-gray-500">Member status</p>
              <p className="font-semibold">{patient.status}</p>
            </div>
          </div>
        </div>

        <div className="w-2/5 mx-auto bg-white shadow-xl shadow-teal-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-black my-2 text-center">
            Appointments
          </h2>
          <div className="flex mb-4 justify-between">
            <button
              className={`${upcomingSelected ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"} px-4 py-2 font-semibold focus:outline-none`}
              onClick={() => {
                setUpcomingSelected(true);
                setPastSelected(false);
                setCancelledSelected(false);
              }}
            >
              Upcoming
            </button>
            <button
              className={`${pastSelected ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"} px-4 py-2 font-semibold focus:outline-none`}
              onClick={() => {
                setPastSelected(true);
                setUpcomingSelected(false);
                setCancelledSelected(false);
              }}>
              Past
            </button>
            <button
              className={`${cancelledSelected ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"} px-4 py-2 font-semibold focus:outline-none`}
              onClick={() => {
                setCancelledSelected(true);
                setUpcomingSelected(false);
                setPastSelected(false);
              }}>
              Cancelled
            </button>
          </div>
          {upcomingSelected && (upcomingAppointments.length > 0 ? (upcomingAppointments?.map((appointment) => (
            <div key={appointment.id}>
              <AppointmentListItem appointment={appointment} onUpdate={handleUpdateAppointment} />
            </div>
          ))) : (
            <div className="font-bold px-3 py-3 text-lg">
              There are no upcoming appointments.
            </div>
          ))}
          {pastSelected && (pastAppointments.length > 0 ? (pastAppointments?.map((appointment) => (
            <div key={appointment.id}>
              <AppointmentListItem appointment={appointment} isPast={true} onUpdate={handleUpdateAppointment} />
            </div>
          ))) : (
            <div className="font-bold px-3 py-3 text-lg">
              There are no past appointments.
            </div>
          ))}
          {cancelledSelected && (cancelledAppointments.length > 0 ? (cancelledAppointments?.map((appointment) => (
            <div key={appointment.id}>
              <AppointmentListItem appointment={appointment} onUpdate={handleUpdateAppointment} />
            </div>
          ))) : (
            <div className="font-bold px-3 py-3 text-lg">
              There are no cancelled appointments.
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
