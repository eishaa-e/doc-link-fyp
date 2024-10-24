import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/icons/doc-link-icon.png";
import axiosInstance from "../services/axiosInterceptor";
import Notifier from "../services/Notifier"; // Assuming you have a Notifier for messages

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    // Get the authToken from localStorage (or another place you store it)
    const authToken = localStorage.getItem('authToken'); // Ensure this matches where you're storing the token

    const changePassword = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        
        // Check if new password matches confirmation
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match");
            Notifier.error("New password and confirm password do not match");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,  // Include the token
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                Notifier.error(data.message || 'Error updating password');
                return;
            }

            Notifier.success('Password updated successfully!');
            
            // Redirect to profile page after a brief delay
            setTimeout(() => {
                navigate("/Home");
            }, 2000); // 2-second delay before redirecting to profile
        } catch (error) {
            console.error('Error:', error);  // Log the error for debugging
            Notifier.error('Something went wrong');
        }
    };

    return (
        <div className="w-full my-20 px-50 bg-white flex justify-center gap-16 items-center">
           

            {/* Update Password Form */}
            <form
                onSubmit={changePassword}
                className="w-1/3 bg-fuchsia-100 flex justify-center flex-col p-10 rounded-xl"
            >
                {/* Logo Section */}
                <div className="flex flex-col justify-center items-center mb-5">
                    <img className="w-16 mb-3" src={logo} alt="Logo" />
                    <h2 className="text-4xl font-bold text-center mb-5">DOC LINK</h2>
                </div>

                {/* Old Password Input */}
                <div className="mb-5">
                    <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Old Password
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Old password"
                        required
                    />
                </div>

                {/* New Password Input */}
                <div className="mb-5">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="New password"
                        required
                    />
                </div>

                {/* Confirm Password Input */}
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Confirm new password"
                        required
                    />
                </div>

                {/* Display error message */}
                {message && <p className="text-red-500 text-center">{message}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full text-white bg-light-orchid hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;
