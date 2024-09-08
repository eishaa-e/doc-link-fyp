import React, {useEffect, useState} from "react";
import logo from "../assets/doc-link-icon.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

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
        <nav className="bg-fuchsia-100 border-gray-200 dark:bg-gray-900 w-full">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <Link to="/">
                    <div className="flex items-center">
                        <img className="w-12 mr-3" src={logo} alt="Logo"/>
                        <span className=" text-light-orchid text-3xl font-bold whitespace-nowrap">
                              DOC LINK
                            </span>
                    </div>
                </Link>

                <div className="flex justify-between items-center space-x-3">
                    <ul className="flex font-medium space-x-8 rtl:space-x-reverse mr-10">
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
                                    className="p-2 flex bg-light-orchid text-white rounded-lg "
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom"
                                    onClick={toggleDropdown}
                                >
                                    {userInfo?.name}
                                    <svg className="w-6 h-6 text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="m19 9-7 7-7-7"/>
                                    </svg>

                                </button>

                                {isDropdownOpen && (
                                    <div
                                        className="z-100 p-2 fixed my-10 text-base list-none bg-fuchsia-100 rounded-lg shadow"
                                        id="user-dropdown"
                                    >
                                        <ul aria-labelledby="user-menu-button">
                                            <li>
                                                <Link
                                                    to={
                                                        currentUserRole === "doctor"
                                                            ? `/doctor/${userInfo._id}`
                                                            : `/patient/${userInfo._id}`
                                                    }
                                                    className="block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-white"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block px-4 py-2 rounded-m text-sm text-gray-700 hover:bg-white"
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
