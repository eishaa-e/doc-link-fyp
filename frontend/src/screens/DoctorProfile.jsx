import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../services/axiosInterceptor";
import Loader from "../components/Loader";
import StarRating from "../components/StarRating";

const DoctorProfile = () => {
    const {id} = useParams();
    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const currentUserRole = localStorage.getItem("role");
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
    }, []);

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto my-10 flex justify-center items-start">
                <Loader/>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full  flex flex-col items-center text-black bg-white">
                <h2 className="text-6xl font-bold my-5"> Doctor </h2>
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <div className="w-full flex justify-center items-center rounded-lg">
                        <div className="w-3/5 my-5 flex justify-center border-gray-400 rounded-lg shadow-lg">
                            <div className="w-1/2 p-10 py-20 bg-gray-100 flex justify-center align-middle">
                                <div className="flex justify-center rounded-full items-center md:flex-row ">
                                    <img
                                        className=" mb-3 rounded-lg shadow-lg"
                                        src={doctor.profileImage}
                                        alt="Bonnie image"
                                    />
                                </div>
                            </div>
                            <div className="w-1/2 p-10 py-20 bg-fuchsia-200">
                                <div className="flex flex-col">
                                    <div className="mb-5">
                                        <h2 className="font-medium bold text-xl my-2 text-gray-500">
                                            Profile
                                        </h2>
                                        <h3 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                                            {doctor.name}
                                        </h3>
                                        <p className="text-lg text-gray-800 dark:text-gray-400">
                                            {doctor.education}
                                        </p>
                                        <p className="text-lg text-gray-500 dark:text-gray-400">
                                            {doctor.city}
                                        </p>
                                    </div>

                                    <div className="mb-5">
                                        <h2 className="font-medium text-xl my-2">Specialization</h2>
                                        <h3 className="mb-1 text-lg font-medium text-gray-500 dark:text-white">
                                            {doctor.specialization}
                                        </h3>
                                    </div>

                                    <div className="mb-5">
                                        <h2 className="font-medium bold text-xl my-2">
                                            Experience
                                        </h2>
                                        <h3 className="mb-1 text-lg font-medium text-gray-600 dark:text-white">
                                            {doctor.experience}
                                        </h3>
                                    </div>

                                    <div className="mb-5">
                                        <h2 className="font-medium bold text-xl my-2">Contact</h2>
                                        <h3 className="mb-1 text-lg font-medium text-gray-600 dark:text-white">
                                            {doctor.phone}
                                        </h3>
                                    </div>

                                    <div>
                                        <div className="flex mt-4 md:mt-6">
                                            <div className="flex items-center gap-5">
                                                <Link
                                                    to="/"
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    Book Appointment
                                                </Link>
                                                {currentUserRole === "doctor" ? (
                                                    <Link
                                                        to="/doctor/profile-form"
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        Update Profile
                                                    </Link>
                                                ) : null}
                                                {currentUserRole === "patient" ? (
                                                    <>
                                                        <button
                                                            data-modal-target="authentication-modal"
                                                            data-modal-toggle="authentication-modal"
                                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-light-orchid rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            type="button"
                                                            onClick={toggleFeedbackForm}
                                                        >
                                                            Give Feedback
                                                        </button>
                                                    </>
                                                ) : null}
                                                <Link
                                                    onClick={() => {
                                                        navigate(-1);
                                                    }}
                                                    className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-fuchsia-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                >
                                                    Back
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
