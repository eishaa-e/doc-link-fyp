import React, {useState} from "react";
import CommonService from "../services/CommonService";
import axiosInstance from "../services/axiosInterceptor";
import Notifier from "../services/Notifier";

const AppointmentListItem = ({appointment, isPast}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState(
        localStorage.getItem("role"),
    );

    const openDropdown = () => {
        setIsDropdownOpen(true);
    };
    const closeDropdown = () => {
        setIsDropdownOpen(false);

    };
    const handleCancelAppointment = async () => {
        const data = {
            status: "CANCELLED",
        };
        await axiosInstance
            .patch(`/appointments/status/${appointment._id}`, data)
            .then(() => {
                Notifier.success("Appointment cancelled successfully.");
            });
    };

    const handleApproveAppointment = async () => {
        const data = {
            status: "BOOKED",
        };
        await axiosInstance
            .patch(`/appointments/status/${appointment._id}`, data)
            .then(() => {
                Notifier.success("Appointment approved successfully.");
            });
    };

    return (
        <div className="flex items-center my-5 bg-white p-4 rounded-xl">
            <div className="w-1/4 text-sm">
                <p className="font-semibold">
                    {CommonService.formatDate(appointment.date)}
                </p>
                <p className="text-gray-500">{appointment.time_slot.startTime}</p>
            </div>
            <div className="flex-1 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1 bg-fuchsia-100 p-4 rounded-lg">
                    {currentUserRole === "patient" ? (
                        <>
                            <p className="font-semibold">Doctor</p>
                            <p className="">{appointment.doctor_id.name}</p>
                        </>
                    ) : (
                        <>
                            <p className="font-semibold">Patient</p>
                            <p className="">{appointment.patient_id.name}</p>
                        </>
                    )}
                </div>
                <div className="text-right ml-4">
                    <p className="text-gray-500">Specialization</p>
                    <p className="font-semibold">
                        {appointment.doctor_id.specialization}
                    </p>
                </div>
            </div>
            {appointment.status === "CANCELLED" || isPast ? (
                <></>
            ) : (
                <div className="relative">
                    <button
                        type="button"
                        className="bg-fuchsia-500 hover:bg-fuchsia-400 text-sm ml-4 text-center font-bold rounded-lg flex justify-center items-center gap-1 px-1 py-1 focus:ring-4 focus:outline-none focus:ring-purple-200"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                        onClick={openDropdown}
                    >
                        <svg
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 9-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div
                            onMouseEnter={openDropdown}
                            onMouseLeave={closeDropdown}
                            className="z-100 p-2 w-44 absolute right-0 mt-2 fixed text-base list-none bg-fuchsia-100 rounded-lg divide-y divide-light-orchid shadow-lg"
                            id="user-dropdown"
                        >
                            <button
                                onClick={handleCancelAppointment}
                                className="block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-light-orchid hover:text-white"
                            >
                                Cancel Appointment
                            </button>
                            {currentUserRole === "doctor" &&
                                appointment.status === "REQUESTED" && (
                                    <button
                                        onClick={handleApproveAppointment}
                                        className="block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-light-orchid hover:text-white"
                                    >
                                        Approve Appointment
                                    </button>
                                )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AppointmentListItem;
