import React, {useEffect, useState} from "react";
import axios from "axios";
import FeedbackCard from "./FeedbackCard";

export const Feedback = () => {
    const [feedback, setFeedback] = useState({});
    const [loading, setLoading] = useState(true);

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


    useEffect(() => {
        getFeedback();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-1/2 flex flex-col justify-center align-middle text-center bg-light-orchid p-5 rounded-xl">
            <div className="flex flex-col justify-center items-center my-4">
                <h1 className="text-4xl font-bold text-center text-white my-5">
                    What our customers are saying?
                </h1>
                <hr className="w-40 h-1 bg-white border-0 rounded my-2"/>
            </div>
            <div className="w-full p-4 flex justify-center align-middle text-center">
                {feedback?.map((feedback) => (
                    <FeedbackCard feedback={feedback}/>
                ))}
            </div>
        </div>
    );
};
