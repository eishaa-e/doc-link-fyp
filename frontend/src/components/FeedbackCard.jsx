import React from 'react';
import StarRating from "./StarRating";

const FeedbackCard = ({feedback}) => {

    const handleRatingChange = (rating) => {
        // const newProfileSkills = [...profileInfo.profileSkills];
        // newProfileSkills[index].rating = rating;
        // setProfileInfo({
        //     ...profileInfo,
        //     profileSkills: newProfileSkills,
        // });
    };

    return (
        <div
            className="w-4/5 flex justify-center align-middle text-center gap-32 rounded-xl"
        >
            <div className="flex justify-center items-center ">
                <div
                    className="w-[100px] h-[100px] bg-white rounded-full flex justify-center align-items-center text-center items-center"
                >
                    <img
                        className="w-24 h-24 rounded-full"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""/>
                </div>
                <div className="flex flex-col items-start ml-5">
                    <h4 className="text-2xl font-medium text-white">
                        John Doe
                    </h4>
                    <h5 className="text-sm font-medium text-white ">
                        {feedback.user_id.email}
                    </h5>
                    <div className="mt-2">
                        <StarRating
                            rating={feedback.rating}
                            onRatingChange={(rating) =>
                                handleRatingChange(rating)
                            }
                        />
                    </div>
                </div>
            </div>
            <div
                className="flex justify-center items-center flex-col text-center text-white">
                <svg className="w-4 h-4 white mb-2" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                    <path
                        d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                </svg>
                <p className="text-lg font-medium ">
                    {feedback.comment} ajshdbvfjlablsjvblajbvljabv bkashbvkj uahsdvjh
                </p>
            </div>
        </div>
    );
};

export default FeedbackCard;