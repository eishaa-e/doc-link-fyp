import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "../services/axiosInterceptor";
import Notifier from "../services/Notifier";
import Loader from "../components/Loader";

const BookAppointment = () => {
    const authToken = localStorage.getItem("authToken");
    const {doctorId} = useParams();

    const [doctorInfo, setDoctorInfo] = useState({});
    const [patientInfo, setPatientInfo] = useState({});
    const [appointmentDate, setAppointmentDate] = useState("")

    const [loading, setLoading] = useState(true);

    const availableSlots = [
        "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
    ];

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

    const getTodayDate = () => new Date().toISOString().split('T')[0];

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
    }

    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        getDoctorInfo();
        getPatientInfo();
    }, []);

    if (loading) {
        return (
            <div>
                <Loader/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6">
            <div className="flex flex-col justify-center items-center mt-4 mb-10">
                <h2 className="text-center text-4xl font-bold mb-4">BOOK APPOINTMENT</h2>
                <hr className="w-1/2 h-1 bg-gray-800"/>
            </div>
            <div className="flex w-full max-w-6xl justify-between items-start gap-10">
                <div
                    className="w-full bg-fuchsia-100 shadow-lg rounded-lg p-6 mb-8 flex justify-center items-center gap-12">
                    <div
                        className="w-5/12 flex flex-col justify-center items-center mb-4 border-r-2 border-gray-300">
                        <img
                            src={patientInfo.profileImage}
                            alt="Patient"
                            className="w-32 h-32 rounded-full mr-4 mb-5"
                        />
                        <h2 className="text-2xl font-bold">{patientInfo.name}</h2>
                        <p className="text-lg text-gray-500 mt-2 ">{patientInfo.email}</p>
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
                    className="w-full  bg-fuchsia-100 shadow-lg rounded-lg p-6 mb-8 flex justify-center items-center gap-12">
                    <div
                        className="w-5/12 flex flex-col justify-center items-center mb-4 border-r-2 border-gray-300">
                        <img
                            src={doctorInfo.profileImage}
                            alt="Patient"
                            className="w-32 h-32 rounded-full mr-4 mb-5"
                        />
                        <h2 className="text-2xl font-bold">{doctorInfo.name}</h2>
                        <p className="">{doctorInfo.specialization}</p>
                        <p className="text-lg text-gray-500 mt-1">{doctorInfo.email}</p>
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

            <div
                className="w-full flex flex-col justify-start items-center max-w-6xl bg-fuchsia-100 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl text-center font-bold">Choose Available Slot</h2>

                <div className="relative z-0 w-1/4 my-5">
                    <input
                        type="text"
                        name="appointmentDate"
                        id="appointmentDate"
                        value={appointmentDate}
                        min={getTodayDate()}
                        onChange={(e) => {
                            setAppointmentDate(e.target.value);
                        }}
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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

                <div className="grid grid-cols-8 gap-3 mt-4">
                    {availableSlots.map((slot, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-3 px-4 rounded-xl border ${selectedSlot === slot ? "bg-light-orchid text-white" : "bg-white"} hover:bg-fuchsia-300`}
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
