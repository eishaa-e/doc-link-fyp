import React from "react";
import StarRating from "./StarRating";
import defaultProfileImg from "../assets/icons/user.jpg";

const FeedbackCard = ({ feedback }) => {

  const profileImage =
    feedback.profileImage && feedback.profileImage !== "No Image"
      ? feedback.profileImage
      : defaultProfileImg;


  return (
    <div
      className="min-h-[420px] bg-white shadow-lg shadow-teal-100 p-4 rounded-xl flex flex-col items-center justify-center hover:bg-teal-50 hover:scale-[102%] duration-200">
      <div
        className="w-24 h-24 my-2 shadow-lg shadow-teal-100 rounded-full flex justify-center items-center">
        <img
          className="w-24 h-24 rounded-full"
          src={profileImage}
          alt="img"
        />
      </div>
      <h4 className="text-2xl font-medium text-teal-500">{feedback.name}</h4>
      <h5 className="text-sm font-medium text-gray-500">{feedback.email}</h5>

      <div className="flex justify-center items-center flex-col text-center my-5">
        <svg
          className="w-4 h-4 text-teal-500 mb-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path
            d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        <p className="text-dark text-sm font-normal">{feedback.comment}</p>
      </div>
      <div className="mt-2">
        <StarRating rating={feedback.rating} onRatingChange={() => {
        }} />
      </div>
    </div>
  );
};

export default FeedbackCard;
