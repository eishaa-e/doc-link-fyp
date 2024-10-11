import React, {useEffect, useState} from "react";
import FeedbackCard from "./FeedbackCard";
import axiosInstance from "../services/axiosInterceptor";
import Loader from "./Loader";

export const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getFeedback = async () => {
        await axiosInstance
            .get("/feedback")
            .then((response) => {
                setLoading(false);
                setFeedback(response.data);
            })
            .catch((err) => {
                console.error(err);
                console.log("Error fetching feedback", err);
            });
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? feedback.length - 3 : prevIndex - 3,
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 3 >= feedback.length ? 0 : prevIndex + 3,
        );
    };

    useEffect(() => {
        getFeedback();
    }, []);

    if (loading) {
        return (
            <div>
                <Loader/>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col justify-center items-center text-center p-5 rounded-xl">
            <div className="flex flex-col justify-center items-center my-4">
                <h1 className="text-4xl font-bold text-center text-dark my-5">
                    What our customers are saying?
                </h1>
                <hr className="w-40 h-1 bg-black border-0 rounded my-2"/>
            </div>
            <div className="w-full p-4 grid grid-cols-1 md:grid-cols-3 gap-4 justify-center align-middle text-center">
                {feedback.length > 0 && feedback.slice(currentIndex, currentIndex + 3).map((item, index) => (
                    <FeedbackCard key={index} feedback={item}/>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mx-2 bg-fuchsia-500 hover:bg-fuchsia-400 rounded-full shadow-lg shadow-light-orchid"
                    onClick={handlePrevious}
                >
                    <svg
                        className="w-6 h-6 text-white"
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
                            d="M5 12h14M5 12l4-4m-4 4 4 4"
                        />
                    </svg>
                </button>
                <button
                    className="px-4 py-2 mx-2 bg-fuchsia-500 hover:bg-fuchsia-400 rounded-full shadow-lg shadow-light-orchid"
                    onClick={handleNext}
                >
                    <svg
                        className="w-6 h-6 text-white"
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
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
