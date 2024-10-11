import React, {useState} from 'react';
import FeedbackCard from "./FeedbackCard";

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
                            <FeedbackCard feedback={item} key={index}/>
                        ))}
                    </div>
                    <div className="flex justify-center gap-5 w-full max-w-sm my-4">
                        <button
                            className="px-4 py-2 mx-2 bg-fuchsia-500 hover:bg-fuchsia-400 rounded-full shadow-lg shadow-light-orchid"
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
                            className="px-4 py-2 mx-2 bg-fuchsia-500 hover:bg-fuchsia-400 rounded-full shadow-lg shadow-light-orchid"
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
