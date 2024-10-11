import React, {useEffect, useState} from "react";
import logo from "../assets/icons/doc-link-icon.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axiosInstance from "../services/axiosInterceptor";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState();
    const [currentUserRole, setCurrentUserRole] = useState();
    const [userInfo, setUserInfo] = useState();

    const currentPath = useLocation()

    const openDropdown = () => {
        setIsDropdownOpen(true);
    };
    const closeDropdown = () => {
        setIsDropdownOpen(false);
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
                response = await axiosInstance.get("/doctors/get-profile");
            } else if (currentUserRole === "patient") {
                response = await axiosInstance.get("/patients/get-profile");
            }

            if (response) {
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
        window.location.reload();
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        console.log("path: ", currentPath.pathname === '/')
        getUser();
    }, [authToken, currentUserRole]);

    return (
        <nav className="bg-white w-full border-b-2 border-light-orchid z-50">
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
                                className={`py-2 px-3 rounded md:p-0 hover:text-fuchsia-500 ${currentPath.pathname === '/' ? 'text-fuchsia-500' : "text-light-orchid"}`}
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className={`py-2 px-3 rounded md:p-0 hover:text-fuchsia-500 ${currentPath.pathname === '/services' ? 'text-fuchsia-500' : "text-light-orchid"}`}
                            >
                                Services
                            </Link>
                        </li>
                        {currentUserRole === "patient" && (
                            <li>
                                <Link
                                    to="/find-doctor"
                                    className={`py-2 px-3 rounded md:p-0 hover:text-fuchsia-500 ${currentPath.pathname === '/find-doctor' ? 'text-fuchsia-500' : "text-light-orchid"}`}
                                >
                                    Find Doctor
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/contact-us"
                                className={`py-2 px-3 rounded md:p-0 hover:text-fuchsia-500 ${currentPath.pathname === '/contact-us' ? 'text-fuchsia-500' : "text-light-orchid"}`}
                            >
                                Contact us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about-us"
                                className={`py-2 px-3 rounded md:p-0 hover:text-fuchsia-500 ${currentPath.pathname === '/about-us' ? 'text-fuchsia-500' : "text-light-orchid"}`}
                            >
                                About Us
                            </Link>
                        </li>
                    </ul>
                    <div className="flex items-center flex-col md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {!isUserLoggedIn ? (
                            <div>
                                <Link
                                    to="/login"
                                    className="text-white bg-fuchsia-500 hover:bg-fuchsia-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-white bg-fuchsia-500 hover:bg-fuchsia-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Signup
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <button
                                    type="button"
                                    className="text-white text-sm text-center font-bold rounded-lg flex justify-center items-center gap-1 px-2 py-2 bg-fuchsia-500 hover:bg-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-purple-200"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom"
                                    onMouseEnter={openDropdown}
                                    onMouseLeave={closeDropdown}
                                >
                                    {userInfo?.name?.toUpperCase()}

                                    <svg
                                        className="w-6 h-6 text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>

                                    <svg
                                        className="w-5 h-5 text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 9-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div
                                        onMouseEnter={openDropdown}
                                        onMouseLeave={closeDropdown}
                                        className="z-100 p-2 w-40 fixed text-base list-none bg-fuchsia-100 rounded-lg divide-y divide-light-orchid shadow"
                                        id="user-dropdown"
                                    >
                                        <ul aria-labelledby="user-menu-button" className="">
                                            <li>
                                                <Link
                                                    to={
                                                        currentUserRole === "doctor"
                                                            ? `/doctor/${userInfo?._id}`
                                                            : `/patient/${userInfo?._id}`
                                                    }
                                                    className="block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-light-orchid hover:text-light-orchid"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <Link
                                                onClick={handleLogout}
                                                className="block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-light-orchid hover:text-light-orchid"
                                            >
                                                Sign out
                                            </Link>
                                        </div>
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
