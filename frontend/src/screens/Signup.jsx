import React, { useState } from "react";
import logo from "../assets/icons/doc-link-icon.png";
import { Link, useNavigate } from "react-router-dom";
import signImage from "../assets/backgroundImg/LandingPageImg4.jpg";
import Notifier from "../services/Notifier";
import axiosInstance from "../services/axiosInterceptor";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [errorFlag, setErrorFlag] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Notifier.error("Passwords do not match!");
      return;
    }
    await axiosInstance
      .post("/auth/register", {
        email,
        role,
        password
      })
      .then((response) => {
        setErrorFlag(false);
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("role", role);
        if (role === "doctor") {
          navigate("/doctor/profile-form");
          Notifier.success("Doctor Login has been created successfully!");
        } else {
          navigate("/patient/profile-form");
          Notifier.success("Patient Login has been created successfully!");
        }
      })
      .catch((error) => {
        setErrorFlag(true);
        setError(error);
        console.error(error);
        error.response.data?.errors?.map((err) => {
          Notifier.error(err.msg);
        });
      });
  };

  return (
    <div className="py-20 flex justify-center items-center bg-gray-100">
      <div
        className="flex flex-col md:flex-row w-full max-w-6xl rounded-[4rem] bg-white overflow-hidden shadow-xl shadow-teal-100">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-center p-8">
          <div className="flex flex-col justify-center items-center">
            <img className="w-16 mb-3" src={logo} alt="asd" srcset="" />
            <h2 className="text-4xl font-bold text-center text-teal-800 mb-5">DOC LINK</h2>
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center mb-4 justify-center gap-4">
            <div>
              <input
                id="doctor"
                type="radio"
                value="doctor"
                name="role"
                checked={role === "doctor"}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="doctor"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Doctor
              </label>
            </div>
            <div>
              <input
                id="patient"
                type="radio"
                value="patient"
                name="role"
                checked={role === "patient"}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="patient"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Patient
              </label>
            </div>
          </div>

          {errorFlag && (
            <div className="flex justify-center my-2">
              <p
                id="filled_error_help"
                className=" text-xs font-medium text-red-600 dark:text-red-400"
              >
                {error.msg}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Signup
          </button>
          <p className="text-sm text-center mt-2 font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </Link>
          </p>
        </form>
        <div className="flex-1 h-80 md:h-auto">
          <img src={signImage} alt=""
               className="w-full h-full object-cover" />
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
