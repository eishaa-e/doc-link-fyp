import React, { useState } from "react";
import { FaVolumeUp, FaPause } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { RiRobot3Fill } from "react-icons/ri";

const ChatItem = ({ msg }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio] = useState(new Audio());

  const generateSpeech = async (text) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/generate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      const { audio: audioSrc } = data;

      if (audioSrc) {
        audio.src = audioSrc;
        audio.play();
        setIsLoading(false);
        setIsPlaying(true);
      }

      audio.onended = () => {
        audio.pause();
        setIsPlaying(false);
      };
    } catch (error) {
      console.error("Failed to generate speech:", error);
      setIsLoading(false);
    }
  };

  const handlePausePlayback = () => {
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} mb-4`}>
      {msg.type === "bot" && (
        <div
          className="flex mr-3 items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white ml-3"
        >
          <RiRobot3Fill size={20} />
        </div>
      )}
      <div
        className={`flex flex-col max-w-[60%] p-4 rounded-lg ${msg.type === "user" ? "bg-teal-500 text-white" : "bg-teal-200 text-black"}`}>
        <p>{msg.content}</p>
        {msg.type === "bot" && (
          <div className="mt-2 flex justify-end items-center">
            {isPlaying ? (
              <FaPause
                className="cursor-pointer"
                onClick={handlePausePlayback}
              />
            ) : isLoading ? (
              <div className="animate-spin rounded-full h-[14px] w-[14px] border-t-2 border-b-2 border-gray-900"></div>
            ) : (
              <FaVolumeUp
                className="cursor-pointer"
                onClick={() => generateSpeech(msg.content)}
              />
            )}
          </div>
        )}
      </div>
      {msg.type === "user" && (
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-800 text-white ml-3"
        >
          <FiUser size={20} />
        </div>
      )}
    </div>
  );
};

export default ChatItem;
