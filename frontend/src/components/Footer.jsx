import React, {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../assets/doc-link-icon.png";
import StarRating from "./StarRating";
import axios from "axios";

export const Footer = () => {
    const [feedback, setFeedback] = useState({rating: 0, comment: ""});

    const addFeedback = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:5000/api/feedback/", {rating: feedback.rating, comment: feedback.comment}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            })
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
        <div className="w-full bg-light-orchid flex flex-col justify-center align-middle items-center p-10">
            <Link to="/">
                <div className="w-2/3 flex justify-center items-center">
                    <img className="w-20 mr-3" src={logo} alt="Logo"/>
                    <span className=" text-white text-3xl font-bold whitespace-nowrap">
                        DOC LINK
                    </span>
                </div>
            </Link>

            <hr className="w-2/3 h-[2px] bg-white border-0 rounded my-10"/>

            <div className="w-2/3 flex items-start justify-center gap-16">
                <div className="w-1/3 flex flex-col items-start justify-start">
                    <h2 className="text-white text-xl font-bold whitespace-nowrap">Reach us</h2>

                    <ul className="flex flex-col justify-center text-white gap-5 mt-4">
                        <li className="flex gap-5 text-sm font-normal">
                            <svg className="w-6 h-6 text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                            </svg>
                            +92 123 4567890
                        </li>
                        <li className="flex gap-5 text-sm font-normal">
                            <svg className="w-6 h-6 text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
                                <path
                                    d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
                            </svg>
                            doclink@gmail.com
                        </li>
                        <li className="flex gap-5 text-sm font-normal">
                            <svg className="w-6 h-6 text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                      d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                      clip-rule="evenodd"/>
                            </svg>
                            132 Dartmouth Street Boston, Massachusetts 02156 United States
                        </li>
                    </ul>
                </div>

                <div className="w-1/3 flex flex-col justify-start items-center text-white">
                    <ul>
                        <li className="text-lg font-normal my-2">
                            <Link to="">
                                About us
                            </Link>
                        </li>
                        <li className="text-lg font-normal my-2">
                            <Link to="">
                                Find Doctor
                            </Link>
                        </li>
                        <li className="text-lg font-normal my-2">
                            <Link to="">
                                Services
                            </Link>
                        </li>
                        <li className="text-lg font-normal my-2">
                            <Link to="">
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="w-1/3 flex justify-center items-center">
                    <form className="w-2/3 bg-white flex flex-col justify-center items-center p-5 rounded-xl">
                        <h2 className="text-xl font-bold"></h2>
                        <textarea name="comment" id="" rows="3" className="bg-fuchsia-100 w-full rounded-xl border-0"
                                  placeholder="Give us a review"
                                  value={feedback.comment}
                                  onChange={handleOnChange}>
                        </textarea>
                        <div className="mt-2">
                            <StarRating
                                rating={feedback.rating}
                                onRatingChange={handleRatingChange}
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={addFeedback}
                            className="w-24 mt-6 text-white bg-light-orchid hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
