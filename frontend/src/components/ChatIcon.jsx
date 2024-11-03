// ChatIcon.jsx

import React, { useState } from "react";
import ChatPage from "../screens/ChatPage";
import { FaComments } from "react-icons/fa";

const ChatIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed top-4 right-4">
      <FaComments size={30} onClick={toggleChat} className="cursor-pointer text-purple-500" />
      {isChatOpen && <ChatPage isOpen={isChatOpen} onClose={toggleChat} />}
    </div>
  );
};

export default ChatIcon;
