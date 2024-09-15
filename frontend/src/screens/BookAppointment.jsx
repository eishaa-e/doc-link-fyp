import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "../services/axiosInterceptor";
import Notifier from "../services/Notifier";

const BookAppointment = () => {
    const authToken = localStorage.getItem("authToken");
    const {doctorId} = useParams();

    const [doctorInfo, setDoctorInfo] = useState({});
    const [patientInfo, setPatientInfo] = useState({});
    const [appointmentDate, setAppointmentDate] = useState("")

    const [loading, setLoading] = useState(true);

    const getDoctorInfo = async () => {
        await axiosInstance.get(`/doctors/get-profile/${doctorId}`)
            .then((response) => {
                setLoading(false);
                setDoctorInfo(response.data);
            })
            .catch((error) => {
                console.error(error);
                Notifier.error("Failed to fetch doctor info!")
            });
    };

    const getPatientInfo = async () => {
        await axiosInstance.get(
            "/patients/get-profile").then((response) => {
            setLoading(false)
            setPatientInfo(response.data);
        }).catch((error) => {
            console.error(error);
            Notifier.error("Failed to fetch patient info!")
        })
    }

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
        "06:30 PM",
    ];

    useEffect(() => {
        getDoctorInfo();
        getPatientInfo();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6">
            <div className="flex flex-col justify-center items-center mt-4 mb-10">
                <h2 className="text-center text-4xl font-bold mb-4">BOOK APPOINTMENT</h2>
                <hr className="w-1/2 h-1 bg-gray-800"/>
            </div>
            <div className="flex w-full max-w-6xl justify-between items-start gap-10">
                <div className="w-full max-w-lg bg-fuchsia-100 rounded-lg shadow-lg p-6 mb-6">
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
                </div>

                <div className="w-full max-w-lg bg-fuchsia-100 rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-center">
                        <div>
                            <h2 className="text-2xl font-bold">{doctorInfo.name}</h2>
                            <p className="mb-2">{doctorInfo.specialization}</p>
                            <div className="mb-2">
                                <strong>Experience:</strong> {doctorInfo.experience}
                            </div>
                            <div className="mb-2">
                                <strong>City:</strong> {doctorInfo.city}
                            </div>
                            <div className="mb-2">
                                <strong>Gender:</strong> {doctorInfo.gender}
                            </div>
                            <div className="mb-2">
                                <strong>Phone:</strong> {doctorInfo.phone}
                            </div>
                            <div className="mb-2">
                                <strong>Education:</strong> {doctorInfo.education}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl bg-fuchsia-100 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold">Choose Available Slot</h2>

                <div className="relative z-0 w-1/4 my-8">
                    <input
                        type="text"
                        name="appointmentDate"
                        id="appointmentDate"
                        value={appointmentDate}
                        onChange={(e) => {
                            setAppointmentDate(e.target.value);
                        }}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                    />
                    <label
                        htmlFor="appointmentDate"
                        className="peer-focus:font-medium absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Select Appointment Date
                    </label>
                </div>

                <div className="grid grid-cols-6 gap-3 mt-4">
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

        </div>
    );
};

export default BookAppointment;
