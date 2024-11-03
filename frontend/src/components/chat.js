// Chat.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = ({ doctorId, patientId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch chat messages
    axios
      .get(`/api/chat/messages/${doctorId}/${patientId}`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.log("Error fetching messages", error);
      });
  }, [doctorId, patientId]);

  const sendMessage = () => {
    axios
      .post("/api/chat/send-message", {
        doctorId,
        patientId,
        sender: "patient", // Assuming this is patient
        message,
      })
      .then((response) => {
        setMessages(response.data.messages);
        setMessage("");
      })
      .catch((error) => {
        console.log("Error sending message", error);
      });
  };

  return (
    <div>
      <h2>Chat with Doctor</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}: </strong>{msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
