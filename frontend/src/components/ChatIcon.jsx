import React, { useState } from "react";
import ChatPage from "../screens/ChatPage";
import { FaComments } from "react-icons/fa";

const ChatIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div
      className="fixed bottom-28 right-10 bg-fuchsia-500 text-white p-3 rounded-full shadow-lg hover:bg-fuchsia-400 focus:outline-none z-50"
    >
      <FaComments size={30} onClick={toggleChat} className="cursor-pointer" />
      {isChatOpen && <ChatPage isOpen={isChatOpen} onClose={toggleChat} />}
    </div>
  );
};

export default ChatIcon;
