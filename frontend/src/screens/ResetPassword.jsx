import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const { token } = useParams(); // Assuming you pass the token as a URL parameter

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use the environment variable for the API base URL
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/reset-password/${token}`, { password: newPassword });

            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
