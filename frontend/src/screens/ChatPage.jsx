import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axiosInstance from "../services/axiosInterceptor";

const ChatPage = ({ isOpen, onClose, doctor_id = null, doctor_name, role = null }) => {
  const [userId, setUserId] = useState(null);
  const [chats, setChats] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const storedRole = localStorage.getItem("role");
        const storedUserId = decodedToken.id;

        const currentRole = role || storedRole;
        setUserId(storedUserId);

        const fetchChats = async () => {
          try {
            if (doctor_id && currentRole === "patient") {
              axiosInstance.get(`/chat/messages/${storedUserId}/${doctor_id}`).then((response) => {
                setChatHistory(response.data || []);
              });
            } else if (currentRole === "doctor") {
              const response = axiosInstance.get(`/chat/doctor-chats/${storedUserId}`).then((response) => {
                setChats(response.data || []);
              });
            } else if (currentRole === "patient") {
              const response = axiosInstance.get(`/chat/patient-chats/${storedUserId}`).then((response) => {
                setChats(response.data || []);
              });
            }
          } catch (error) {
            console.error("Error fetching chats:", error);
          }
        };

        if (isOpen) {
          fetchChats();
        }
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen, doctor_id, role]);

  const handleChatClick = (chat) => {
    setActiveChat(chat);
    setChatHistory(chat.messages || []);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const senderRole = role || localStorage.getItem("role");
      let recipientId;
      if (doctor_id && senderRole === "patient") {
        recipientId = doctor_id;
      } else if (activeChat && activeChat.messages && activeChat.messages.length > 0) {
        recipientId = activeChat.messages[0]?.receiver;
      } else {
        console.error("Recipient ID not found.");
        return;
      }
      console.log("Patient ID:", userId);
      console.log("Doc", activeChat?.patient_id);

      await axiosInstance.post("/chat/send-message", {
        patient_id: senderRole === "doctor" ? activeChat?.patient_id : userId,
        doctor_id: senderRole === "doctor" ? userId : recipientId,
        message,
        sender: userId
      }).then((response) => {
        setChatHistory([...chatHistory, response.data.message]);
        setMessage("");
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden h-[90vh]">
            <div className="p-6 border-b bg-fuchsia-400 text-white">
              <h2 className="text-xl font-semibold">Messenger</h2>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <RxCross2 size={24} />
              </button>
            </div>

            <div className="flex max-h-[80vh]">
              <div className="w-2/5 border-r">
                <h3 className="text-2xl text-light-orchid font-bold text-center py-2 border-b-2">Chats</h3>
                {chats && chats.length > 0 ? (
                  chats.map((chat, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleChatClick(chat);
                      }}
                      className={`m-1 p-2 cursor-pointer ${activeChat?.patient_id === chat.patient_id ? "border-b-2 border-l-2 shadow-md border-fuchsia-400 rounded-md bg-fuchsia-200" : ""}`}
                    >
                      {/* Display patient name if doctor is logged in, otherwise display doctor name */}
                      <p className="text-lg font-medium text-gray-700">{role === "doctor"
                        ? (chat.patient_name || "Patient")
                        : (chat.doctor_name || chat.doctor_id || "Doctor")}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-blue-500 text-white rounded-lg">
                    <p className="font-semibold">{doctor_name}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full bg-gray-100">
                <div className="p-6 bg-fuchsia-300 text-white">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {role === "doctor" ? activeChat?.patient_name : (activeChat?.doctor_name || doctor_name || "Select a chat")}
                  </h2>
                </div>
                <div className="p-6 h-[70vh] overflow-y-auto">
                  {chatHistory && chatHistory.length > 0 ? (
                    chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.sender === userId ? "justify-end" : "justify-start"
                        } my-1`}
                      >
                        <div
                          className={`max-w-[60%] px-4 py-2 rounded-lg text-black ${
                            msg.sender === userId
                              ? "bg-fuchsia-300"
                              : "bg-fuchsia-200"
                          }`}
                        >
                          <p>{msg.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No messages</p>
                  )}
                </div>

                <form
                  className="flex justify-center items-center p-4 border-t bg-gray-100"
                  onSubmit={handleSendMessage}
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow px-4 py-2 mx-2 text-gray-800 border rounded-lg outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 py-3 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-400 flex items-center justify-center"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}
      <button
        className="fixed bottom-28 right-10 bg-fuchsia-500 text-white p-3 rounded-full shadow-lg hover:bg-fuchsia-400 focus:outline-none z-50"
        onClick={onClose}
      >
        {!isOpen ? <FaComments size={30} /> : <RxCross2 size={30} />}
      </button>

    </div>
  )
    ;
};

export default ChatPage;
