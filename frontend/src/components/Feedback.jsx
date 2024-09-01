import React, {useEffect, useState} from "react";
import axios from "axios";
import FeedbackCard from "./FeedbackCard";

export const Feedback = () => {
    const [feedback, setFeedback] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getFeedback = async () => {
        await axios
            .get("http://localhost:5000/api/feedback/")
            .then((response) => {
                setLoading(false);
                setFeedback(response.data);
                console.log("Feedback: ", response.data);
            })
            .catch((err) => {
                console.error(err);
                console.log("Error fetching feedback", err);
            });
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? feedback.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === feedback.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        getFeedback();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-3/5 flex flex-col justify-center align-middle text-center bg-light-orchid p-5 rounded-xl">
            <div className="flex flex-col justify-center items-center my-4">
                <h1 className="text-4xl font-bold text-center text-white my-5">
                    What our customers are saying?
                </h1>
                <hr className="w-40 h-1 bg-white border-0 rounded my-2"/>
            </div>
            <div className="w-full p-4 flex justify-center align-middle text-center">
                {feedback.length > 0 && (
                    <FeedbackCard feedback={feedback[currentIndex]}/>
                )}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mx-2 text-light-orchid bg-white rounded-full"
                    onClick={handlePrevious}
                >
                    <svg className="w-6 h-6 text-light-orchid" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                    </svg>

                </button>
                <button
                    className="px-4 py-2 mx-2 text-light-orchid bg-white rounded-full"
                    onClick={handleNext}
                >
                    <svg className="w-6 h-6 text-light-orchid" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M19 12H5m14 0-4 4m4-4-4-4"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};
