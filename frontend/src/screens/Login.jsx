import React, { useState } from "react";
import logo from "../assets/icons/doc-link-icon.png";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/backgroundImg/LandingPageImg6.jpg";
import axiosInstance from "../services/axiosInterceptor";
import Notifier from "../services/Notifier";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/auth/login", { email, password, role })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("authToken", response.data.authToken);
          localStorage.setItem("role", role);
          navigate("/");
          window.location.reload();
          Notifier.success("Login Successful!");
        }
      })
      .catch((error) => {
        Notifier.error("Invalid Credentials!");
        console.error(error);
      });
  };

  return (
    <div className="py-20 flex justify-center items-center bg-gray-100">
      <div
        className="flex flex-col md:flex-row w-full max-w-6xl rounded-[4rem] shadow-xl bg-white overflow-hidden shadow-teal-100">
        <div className="flex-1 h-80 md:h-auto">
          <img src={loginImage} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col justify-center p-8">
          <div className="flex flex-col justify-center items-center">
            <img className="w-16 mb-3" src={logo} alt="Logo" />
            <h2 className="text-4xl font-bold text-center mb-5 text-teal-800">
              DOC LINK
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 text-gray-900 rounded-lg p-2.5"
                placeholder="email@gmail.com"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 text-gray-900 rounded-lg p-2.5"
                placeholder="********"
                required
              />
            </div>

            <div className="flex items-center justify-center gap-4 mb-5">
              <div>
                <input
                  id="doctor"
                  type="radio"
                  value="doctor"
                  name="role"
                  checked={role === "doctor"}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500"
                />
                <label
                  htmlFor="doctor"
                  className="ms-2 text-sm font-medium text-gray-900"
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
                  className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500"
                />
                <label
                  htmlFor="patient"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Patient
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-teal-500 hover:bg-teal-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>

            {/* Add the Forget Password button */}
            <p className="text-sm text-center mt-2 font-light text-gray-800 dark:text-gray-400">
              <Link
                to="/forget-password"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forget Password?
              </Link>
            </p>

            <p className="text-sm text-center mt-2 text-gray-800">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:underline"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
