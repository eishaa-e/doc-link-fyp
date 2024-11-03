import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

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
                            const response = await axios.get(`http://localhost:5000/api/chat/messages/${storedUserId}/${doctor_id}`);
                            //setChats(response.data || []);
                            setChatHistory(response.data || []);
                        } else if (currentRole === "doctor") {
                            const response = await axios.get(`http://localhost:5000/api/chat/doctor-chats/${storedUserId}`);
                            setChats(response.data || []);
                        } else if (currentRole === "patient") {
                            const response = await axios.get(`http://localhost:5000/api/chat/patient-chats/${storedUserId}`);
                            setChats(response.data || []);
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
            console.log("Doc",activeChat?.patient_id);

            const res = await axios.post("http://localhost:5000/api/chat/send-message", {
                patient_id: senderRole === "doctor" ? activeChat?.patient_id : userId,
                doctor_id: senderRole === "doctor" ? userId : recipientId,
                message,
                sender: userId,
            });

            setChatHistory([...chatHistory, res.data.message]);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    
    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-2xl w-full">
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>X</button>
                    <div className="flex">
                        <div className="w-1/4 border-r p-4">
                            <h3>Chats</h3>
                            {chats && chats.length > 0 ? (
                                chats.map((chat, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleChatClick(chat)}
                                        className={`p-2 cursor-pointer ${activeChat?._id === chat._id ? "bg-gray-300" : ""}`}
                                    >
                                        {/* Display patient name if doctor is logged in, otherwise display doctor name */}
                                        <p>{role === "doctor"
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
                        <div className="flex-1 p-4">
                            <div className="p-6 border-b bg-purple-600 text-white">
                                <h2 className="text-xl font-semibold">
                                Chat with {role === "doctor" ? activeChat?.patient_name : (activeChat?.doctor_name || doctor_name || "Select a chat")}
                                </h2>
                            </div>
                            <div className="p-6 h-[70vh] overflow-y-auto">
    {chatHistory && chatHistory.length > 0 ? (
        chatHistory.map((msg, index) => (
            <div
                key={index}
                className={`flex ${
                    msg.sender === userId ? "justify-end" : "justify-start"
                } mb-4`}
            >
                            <div
                                className={`max-w-[60%] p-4 rounded-lg ${
                                    msg.sender === userId
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
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

                            <form className="flex items-center p-4 border-t bg-gray-100" onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-grow p-2 border rounded-l-lg outline-none"
                                />
                                <button type="submit" className="p-2 py-3 bg-purple-500 text-white rounded-r-lg">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ChatPage;
