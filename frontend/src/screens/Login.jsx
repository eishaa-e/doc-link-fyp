import React, {useState} from "react";
import axios from "axios";
import logo from "../assets/doc-link-icon.png";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios
            .post("http://localhost:5000/api/auth/login", {email, password, role})
            .then((response) => {
                if (response.data.success) {
                    localStorage.setItem("authToken", response.data.authToken);
                    localStorage.setItem('role', role);
                    console.log(response.data);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className="w-full h-screen bg-fuchsia-100 flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="w-1/3 bg-white flex justify-center flex-col p-10 rounded-xl"
            >
                <div className="flex flex-col justify-center items-center">
                    <img className="w-16 mb-3" src={logo} alt="Logo"/>
                    <h2 className="text-4xl font-bold text-center mb-5">DOC LINK</h2>
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
                <div className="flex items-center mb-4 justify-center gap-4">
                    <div>
                        <input
                            id="doctor"
                            type="radio"
                            value="doctor"
                            name="role"
                            checked={role === "doctor"}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-4 h-4 text-fuchsia-500 bg-gray-100 border-gray-300 focus:ring-fuchsia-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                            className="w-4 h-4 text-fuchsia-500 bg-gray-100 border-gray-300 focus:ring-fuchsia-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="patient"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Patient
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full text-black bg-fuchsia-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Login
                </button>
                <p className="text-sm text-center mt-2 font-light text-gray-800 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
