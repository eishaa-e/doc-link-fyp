import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../services/axiosInterceptor";
import Loader from "../components/Loader";
import StarRating from "../components/StarRating";
import DoctorFeedbackSlider from "../components/DoctorFeedbackSlider";
import CommonService from "../services/CommonService";
import AppointmentListItem from "../components/AppointmentListItem";

const DoctorProfile = () => {
    const {id} = useParams();
    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const currentUserRole = localStorage.getItem("role");

    const [requestedAppointments, setRequestedAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [cancelledAppointments, setCancelledAppointment] = useState([])

    const [requestedSelected, setRequestedSelected] = useState(false)
    const [upcomingSelected, setUpcomingSelected] = useState(true)
    const [pastSelected, setPastSelected] = useState(false)
    const [cancelledSelected, setCancelledSelected] = useState(false)

    const [feedback, setFeedback] = useState(
        {
            rating: 0,
            comment: ""
        }
    );
    const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);

    const toggleFeedbackForm = () => {
        setIsFeedbackFormOpen(!isFeedbackFormOpen);
    }

    const getDoctor = async () => {
        await axiosInstance
            .get(`/doctors/get-profile/${id}`)
            .then((response) => {
                setLoading(false);
                setDoctor(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const addFeedback = async (e) => {
        e.preventDefault();
        await axiosInstance
            .post(
                `/doctors/${id}/feedback`,
                {rating: feedback.rating, comment: feedback.comment},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((response) => {
                setFeedback({rating: 0, comment: ""});
            })
            .catch((err) => {
                console.error(err);
                console.log("Error saving feedback", err);
            });
    };

    const getRequestedAppointments = async () => {
        await axiosInstance.get(`/appointments/doctors/${id}?query=requested`)
            .then((response) => {
                setLoading(false);
                setRequestedAppointments(response.data.appointments);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const getUpcomingAppointments = async () => {
        await axiosInstance.get(`/appointments/doctors/${id}?query=upcoming`)
            .then((response) => {
                setLoading(false);
                setUpcomingAppointments(response.data.appointments);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const getPastAppointment = async () => {
        await axiosInstance.get(`/appointments/doctors/${id}?query=past`)
            .then((response) => {
                setLoading(false);
                setPastAppointments(response.data.appointments);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const getCancelledAppointment = async () => {
        await axiosInstance.get(`/appointments/doctors/${id}?query=cancelled`)
            .then((response) => {
                setLoading(false);
                setCancelledAppointment(response.data.appointments);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: value,
        }));
    };

    const handleRatingChange = (rating) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            rating,
        }));
    };

    useEffect(() => {
        getDoctor();
        getRequestedAppointments();
        getUpcomingAppointments();
        getPastAppointment();
        getCancelledAppointment();
    }, []);

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto my-10 flex justify-center items-start">
                <Loader/>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto bg-white my-10 flex justify-center items-start">
            <div className="w-7/12 flex flex-col justify-center items-center gap-5">
                <div
                    className="w-full bg-fuchsia-100 shadow-lg rounded-lg p-6 mb-8 flex justify-center items-center gap-12">
                    <div className="w-5/12 flex flex-col justify-center items-center mb-4 border-r-2 border-gray-300">
                        <img
                            src={doctor.profileImage}
                            alt="Patient"
                            className="w-32 h-32 rounded-full mr-4 mb-5"
                        />
                        <h2 className="text-2xl font-bold">{doctor.name}</h2>
                        <p className="text-lg text-gray-500 mt-2">{doctor.email}</p>

                        <div className="flex flex-col justify-center items-center mt-5">
                            <p className="text-xl font-medium text-gray-500">Appointments</p>
                            <div className="grid grid-cols-2 my-3">
                                <div
                                    className="flex flex-col justify-center items-center border-r-2 border-gray-300 pr-5">
                                    <p className="text-3xl font-bold text-center">5</p>
                                    <h2 className="text-lg font-medium text-gray-500">Past</h2>
                                </div>
                                <div className="flex flex-col justify-center items-center pl-5">
                                    <p className="text-3xl font-bold text-center">2</p>
                                    <h2 className="text-lg font-medium text-gray-500">Upcoming</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col ">
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <p className="font-medium text-gray-500">Education</p>
                                <p className="font-semibold">{doctor.education}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500">Experience</p>
                                <p className="font-semibold">{doctor.experience}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500">Gender</p>
                                <p className="font-semibold">{doctor.gender.toUpperCase()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Birthday</p>
                                <p className="font-semibold">{CommonService.formatDate(doctor.dob)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Phone number</p>
                                <p className="font-semibold">{doctor.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">City</p>
                                <p className="font-semibold">{doctor.city}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-baseline mt-10">
                            {currentUserRole === "patient" &&
                                <Link
                                    to={`/doctor/${id}/book-appointment`}
                                    className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Book Appointment
                                </Link>
                            }
                            {currentUserRole === "doctor" && (
                                <>
                                    <Link
                                        to="/doctor/profile-form"
                                        className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Edit Profile
                                    </Link>
                                    <Link
                                        to="/doctor/schedule-form"
                                        className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Edit Schedule
                                    </Link>
                                </>
                            )}
                            {currentUserRole === "patient" && (
                                <>
                                    <button
                                        data-modal-target="authentication-modal"
                                        data-modal-toggle="authentication-modal"
                                        className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type="button"
                                        onClick={toggleFeedbackForm}
                                    >
                                        Give Feedback
                                    </button>
                                </>
                            )}
                            <Link
                                onClick={() => {
                                    navigate(-1);
                                }}
                                className="py-1 px-4 text-sm font-medium bg-white text-gray-900 focus:outline-none bg-fuchsia-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center bg-fuchsia-100 rounded-lg">
                    <DoctorFeedbackSlider feedbacks={doctor.feedbacks}/>
                </div>
            </div>
            {
                currentUserRole !== "patient" ? (
                    <div className="w-2/5 mx-auto bg-fuchsia-100 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-black my-2 text-center">
                            Appointments
                        </h2>
                        <div className="flex mb-4 justify-between">
                            <button
                                className={`${requestedSelected ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} px-4 py-2 font-semibold focus:outline-none`}
                                onClick={() => {
                                    setRequestedSelected(true)
                                    setUpcomingSelected(false)
                                    setPastSelected(false)
                                    setCancelledSelected(false)
                                }}
                            >
                                Requested
                            </button>
                            <button
                                className={`${upcomingSelected ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} px-4 py-2 font-semibold focus:outline-none`}
                                onClick={() => {
                                    setUpcomingSelected(true)
                                    setPastSelected(false)
                                    setCancelledSelected(false)
                                    setRequestedSelected(false)
                                }}
                            >
                                Upcoming
                            </button>
                            <button
                                className={`${pastSelected ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} px-4 py-2 font-semibold focus:outline-none`}
                                onClick={() => {
                                    setPastSelected(true)
                                    setUpcomingSelected(false)
                                    setCancelledSelected(false)
                                    setRequestedSelected(false)
                                }}>
                                Past
                            </button>
                            <button
                                className={`${cancelledSelected ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} px-4 py-2 font-semibold focus:outline-none`}
                                onClick={() => {
                                    setCancelledSelected(true)
                                    setUpcomingSelected(false)
                                    setPastSelected(false)
                                    setRequestedSelected(false)
                                }}>
                                Cancelled
                            </button>
                        </div>
                        {requestedSelected && (requestedAppointments.length > 0 ? (requestedAppointments?.map((appointment) => (
                            <div key={appointment.id}>
                                <AppointmentListItem appointment={appointment}/>
                            </div>
                        ))) : (
                            <div className="font-bold px-3 py-3 text-lg">
                                There are no requested appointments.
                            </div>
                        ))}
                        {upcomingSelected && (upcomingAppointments.length > 0 ? (upcomingAppointments?.map((appointment) => (
                            <div key={appointment.id}>
                                <AppointmentListItem appointment={appointment}/>
                            </div>
                        ))) : (
                            <div className="font-bold px-3 py-3 text-lg">
                                There are no upcoming appointments.
                            </div>
                        ))}
                        {pastSelected && (pastAppointments.length > 0 ? (pastAppointments?.map((appointment) => (
                            <div key={appointment.id}>
                                <AppointmentListItem appointment={appointment} isPast={true}/>
                            </div>
                        ))) : (
                            <div className="font-bold px-3 py-3 text-lg">
                                There are no past appointments.
                            </div>
                        ))}
                        {cancelledSelected && (cancelledAppointments.length > 0 ? (cancelledAppointments?.map((appointment) => (
                            <div key={appointment.id}>
                                <AppointmentListItem appointment={appointment}/>
                            </div>
                        ))) : (
                            <div className="font-bold px-3 py-3 text-lg">
                                There are no cancelled appointments.
                            </div>
                        ))}
                    </div>
                ) : null}
            {
                isFeedbackFormOpen && (
                    <div
                        id="authentication-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
                    >
                        <div
                            className="relative w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow dark:bg-gray-700">
                            <div
                                className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Give Feedback to Doctor
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleFeedbackForm}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <form
                                    className="w-full flex flex-col justify-center items-center p-5 rounded-xl"
                                >
                                    <h2 className="text-xl font-bold"></h2>
                                    <textarea
                                        name="comment"
                                        rows="3"
                                        className="bg-fuchsia-100 w-full rounded-xl border-0"
                                        placeholder="Give us a review"
                                        value={feedback.comment}
                                        onChange={handleOnChange}
                                    ></textarea>
                                    <div className="mt-2">
                                        <StarRating
                                            rating={feedback.rating}
                                            onRatingChange={handleRatingChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={addFeedback}
                                        className="w-24 mt-6 text-white bg-light-orchid hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default DoctorProfile;
