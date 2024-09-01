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
        <div className="w-full bg-fuchsia-100 flex justify-center align-middle items-center p-10">
            <div className="flex items-center justify-center gap-16">
                <div className="w-1/3 flex justify-center flex-col">
                    <Link to="/">
                        <div className="flex items-center">
                            <img className="w-12 mr-3" src={logo} alt="Logo"/>
                            <span className=" text-light-orchid text-3xl font-bold whitespace-nowrap">
                             DOC LINK
                            </span>
                        </div>
                    </Link>
                    <div className="w-full flex flex-col justify-center gap-5 mt-4">
                        <p className="text-sm font-normal">
                            DOC LINK provides progressive, and affordable healthcare, accessible
                            online for everyone.
                        </p>
                        <p className="text-xs font-normal">
                            ©DOC LINK LTD 2024. All rights reserved
                        </p>
                    </div>
                </div>
                <div className="w-1/3 flex flex-col justify-start items-center">
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
                    <form className="w-11/12 bg-white flex flex-col justify-center items-center p-5 rounded-xl">
                        <h2 className="text-xl font-bold"></h2>
                        <div className="w2/3">
                            <textarea name="comment" id="" rows="4" className="bg-fuchsia-100 rounded-xl border-0"
                                      placeholder="Give us a review"
                                      value={feedback.comment}
                                      onChange={handleOnChange}>
                            </textarea>
                        </div>
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
