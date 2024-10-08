import React from "react";
import StarRating from "./StarRating";

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="w-full grid grid-cols-2 justify-center align-middle text-center gap-32 rounded-xl">
      <div className="flex justify-center items-center ">
        <div className="w-[100px] h-[100px] bg-white rounded-full flex justify-center align-items-center text-center items-center">
          <img
            className="w-24 h-24 rounded-full"
            src={feedback.profileImage}
            alt="img"
          />
        </div>
        <div className="flex flex-col items-start ml-5">
          <h4 className="text-2xl font-medium text-white">{feedback.name}</h4>
          <h5 className="text-sm font-medium text-white ">{feedback.email}</h5>
          <div className="mt-2">
            <StarRating rating={feedback.rating} onRatingChange={() => {}} />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col text-center text-white">
        <svg
          className="w-4 h-4 white mb-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        <p className="text-sm font-normal">{feedback.comment}</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
