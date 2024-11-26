import React, { useState } from "react";
import logo from "../assets/doc-link-icon.png"; // Logo for the application
import resetPasswordImage from "../assets/reset.png"; // Add an image related to password reset
import { useParams, Link, useNavigate } from "react-router-dom"; // Include useNavigate for navigation
import axios from "axios";
import Notifier from "../services/Notifier"; // Assuming you have a Notifier for messages


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); // Assuming you pass the token as a URL parameter
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/reset-password/${token}`, { password: newPassword });
      setMessage(res.data.message);
      Notifier.success(res.data.message);
      setTimeout(() => {
        navigate("/login"); // Navigate to login after successful reset
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
      Notifier.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center my-20 bg-white">
      <div className="flex justify-center items-center gap-16 w-full">
        <img src={resetPasswordImage} alt="Reset Password" className="w-5/12 h-auto" />
        <div className="w-1/3 bg-teal-100 flex justify-center flex-col p-10 rounded-xl">
          <div className="flex flex-col justify-center items-center">
            <img className="w-16 mb-3" src={logo} alt="Logo" />
            <h2 className="text-4xl font-bold text-center mb-5">Reset Password</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset Password
            </button>
          </form>
          {message && <p className="mt-3 text-center text-gray-800">{message}</p>}
          <p className="text-sm text-center mt-2 font-light text-gray-800 dark:text-gray-400">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
