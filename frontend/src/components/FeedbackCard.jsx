import React, { useState, useEffect } from "react";
import axios from "axios";

export const FeedbackCard = () => {
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
    <div className="w-2/3 flex flex-col justify-center align-middle text-center bg-light-orchid rounded-xl">
      <div className="w-11/12 flex justify-center text-center align-middle p-5 my-5">
        <h1 className="text-4xl font-bold text-center text-white">
          What our customers are saying?
        </h1>
      </div>
      <div className="w-2/3 flex justify-center align-middle text-center gap-10">
        {feedback?.map((feedback, index) => (
          <div
            key={index}
            className="flex justify-center align-middle text-center rounded-xl"
          >
            <div>{feedback.rating}</div>
            <div>{feedback.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
