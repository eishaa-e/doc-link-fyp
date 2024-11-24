import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ChatItem from "../components/ChatItem";
import { FiCpu } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";
import { RiRobot3Fill } from "react-icons/ri";
import axiosInstance from "../services/axiosInterceptor";

const Chatbot = ({ isChatOpen, toggleChat }) => {

  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      content: "Hello! I am a medical chatbot. How can I help you today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    let prompt = query;
    setQuery("");

    const userMessage = { type: "user", content: prompt };
    setChatHistory([...chatHistory, userMessage]);

    setLoading(true);
    try {
      const res = await axiosInstance.post("/chat", { query: prompt });
      const botMessage = { type: "bot", content: res.data.response };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", content: "Error fetching response" }
      ]);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);


  return (
    <div className="relative">
      {isChatOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden h-[90vh]">
            <div className="p-6 border-b bg-teal-800 text-white">
              <h2 className="text-xl font-semibold">Medical Chatbot</h2>
              <button
                onClick={toggleChat}
                className="absolute top-4 right-4 text-white"
              >
                <RxCross2 size={24} />
              </button>
            </div>

            <div className="p-6 h-[70vh] overflow-y-auto" ref={chatContainerRef}>
              {chatHistory.map((msg, index) => (
                <ChatItem key={index} msg={msg} />
              ))}
              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[60%] p-4 rounded-lg bg-gray-200 text-gray-800 flex items-center">
                    <FiCpu className="mr-2" />
                    <p>Thinking...</p>
                  </div>
                </div>
              )}
            </div>
            <form
              className="flex justify-center items-center p-4 border-t bg-gray-100"
              onSubmit={handleQuery}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 mx-2 border rounded-lg outline-none"
              />
              <button
                type="submit"
                className="p-2 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-800 flex items-center justify-center"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot toggle button */}
      <button
        className="fixed bottom-10 right-10 bg-teal-500 text-white p-3 rounded-full shadow-lg hover:bg-teal-800 focus:outline-none z-50"
        onClick={toggleChat}
      >
        {!isChatOpen ? <RiRobot3Fill size={30} /> : <RxCross2 size={30} />}
      </button>
    </div>
  );
};

export default Chatbot;