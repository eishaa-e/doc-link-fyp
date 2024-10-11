import React, {useState} from 'react';
import StarRating from "./StarRating";
import axiosInstance from "../services/axiosInterceptor";
import formImage from "../assets/backgroundImg/LandingPageImg6.jpg"

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState({rating: 0, comment: ""});

    const addFeedback = async (e) => {
        e.preventDefault();
        await axiosInstance
            .post(
                "/feedback/",
                {rating: feedback.rating, comment: feedback.comment},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((response) => {
                console.log("Feedback Submitted: ", response.data);
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
    return (
        <div
            className="w-10/12 grid grid-cols-2 gap-4 justify-center items-center bg-fuchsia-100 rounded-[2.5rem] border-1 shadow-lg shadow-light-orchid">
            <div className="w-full rounded-l-lg">
                <img src={formImage} alt="" className="full rounded-lg rounded-l-[2.5rem]"/>
            </div>
            <form
                className="w-full h-full py-6 px-4 flex flex-col justify-between items-center p-3 rounded-xl">
                <h2 className="text-2xl font-bold text-fuchsia-500">GIVE US YOUR FEEDBACK</h2>
                <textarea
                    name="comment"
                    id=""
                    rows="8"
                    className="bg-white w-10/12 rounded-xl border-0 shadow-lg"
                    placeholder="Give us a review"
                    value={feedback.comment}
                    onChange={handleOnChange}
                ></textarea>
                <div className="mt-2 flex flex-col justify-center items-center">
                    <StarRating
                        rating={feedback.rating}
                        onRatingChange={handleRatingChange}
                    />
                    <button
                        type="submit"
                        onClick={addFeedback}
                        className="w-44 mt-6 text-white bg-fuchsia-500 hover:bg-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-2 py-2 text-center"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default FeedbackForm;