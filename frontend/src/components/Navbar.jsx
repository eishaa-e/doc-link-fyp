import React, { useEffect, useState } from "react";
import logo from "../assets/doc-link-icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState();
  const [currentUserRole, setCurrentUserRole] = useState();
  const [userInfo, setUserInfo] = useState();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const checkUser = async () => {
    const token = await localStorage.getItem("authToken");
    const role = await localStorage.getItem("role");

    if (!token) {
      setIsUserLoggedIn(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        setIsUserLoggedIn(false);
        localStorage.removeItem("authToken");
      } else {
        setAuthToken(token);
        setCurrentUserRole(role);
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsUserLoggedIn(false);
    }
  };

  const getUser = async () => {
    if (!authToken || !currentUserRole) return;

    try {
      let response;
      if (currentUserRole === "doctor") {
        response = await axios.get(
          "http://localhost:5000/api/doctors/get-profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
      } else if (currentUserRole === "patient") {
        response = await axios.get(
          "http://localhost:5000/api/patients/get-profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
      }

      if (response) {
        console.log(`${currentUserRole} profile: `, response.data);
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsUserLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [authToken, currentUserRole]);

  return (
    <div>
      <nav className="bg-fuchsia-100 border-gray-200 dark:bg-gray-900 w-full">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link to="/">
            <div className="flex items-center">
              <img className="w-12 mr-3" src={logo} alt="Logo" />
              <span className=" text-light-orchid text-3xl font-bold whitespace-nowrap">
                DOC LINK
              </span>
            </div>
          </Link>
          <div className="flex items-center space-x-3">
            <ul className="flex font-medium space-x-8 rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className="py-2 px-3 text-blue-700 rounded md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              {currentUserRole === "patient" && (
                <li>
                  <Link
                    to="/find-doctor"
                    className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Find Doctor
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/"
                  className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center flex-col md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!isUserLoggedIn ? (
              <div>
                <Link
                  to="/login"
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="user photo"
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="z-100 fixed my-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    {userInfo && (
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                          {userInfo.name}
                        </span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                          {userInfo.email}
                        </span>
                      </div>
                    )}
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link
                          to={
                            currentUserRole === "doctor"
                              ? `/doctor/${userInfo._id}`
                              : `/patient/${userInfo._id}`
                          }
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
