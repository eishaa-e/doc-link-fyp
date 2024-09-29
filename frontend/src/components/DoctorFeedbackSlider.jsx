import React, {useState} from 'react';
import StarRating from "./StarRating";

const DoctorFeedbackSlider = ({feedbacks}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const feedbacksPerPage = 3;

    const nextFeedbacks = () => {
        if (currentPage < Math.ceil(feedbacks.length / feedbacksPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevFeedbacks = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentFeedbacks = feedbacks?.slice(
        currentPage * feedbacksPerPage,
        (currentPage + 1) * feedbacksPerPage
    );

    return (
        <div className="w-full flex flex-col justify-center items-center bg-fuchsia-100 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-black my-5">
                Feedback from previous patients!
            </h2>
            {feedbacks?.length !== 0 ?
                <>
                    <div className="grid grid-cols-3 mb-5 gap-4 justify-center items-center px-4">
                        {currentFeedbacks?.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center text-justify py-4 px-3 bg-white rounded-xl shadow-md">
                                <p className="text-sm font-medium text-gray-900">
                                    {item.comment}
                                </p>
                                <div className="mt-2">
                                    <StarRating rating={item.rating} onRatingChange={() => {
                                    }}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-5 w-full max-w-sm my-4">
                        <button
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            onClick={prevFeedbacks}
                            disabled={currentPage === 0}>
                            <svg className="w-6 h-6 text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                            </svg>
                        </button>
                        <button
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            onClick={nextFeedbacks}
                            disabled={currentPage >= Math.ceil(feedbacks.length / feedbacksPerPage) - 1}>
                            <svg className="w-6 h-6 text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M19 12H5m14 0-4 4m4-4-4-4"/>
                            </svg>
                        </button>
                    </div>
                </> : <div className="my-5 font-semibold text-center text-gray-500">
                    No Feedback yet...
                </div>}
        </div>
    );
};

export default DoctorFeedbackSlider;
