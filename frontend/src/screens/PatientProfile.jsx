import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const PatientProfile = () => {
    const {id} = useParams();
    const [patient, setPatient] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPatient = async () => {
        await axios
            .get(`http://localhost:5000/api/patients/get-profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then((response) => {
                setLoading(false);
                setPatient(response.data);
                console.log("Patient - Profile: ", response.data)
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const formatDate = (date) => {
        if (date === null) return "";

        const dateObj = new Date(date);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        getPatient();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto bg-white my-10 flex justify-center items-start">
            <div
                className="w-1/2 bg-fuchsia-100 shadow-lg rounded-lg p-6 mb-8 flex justify-center items-center gap-12">
                <div className="w-5/12 flex flex-col justify-center items-center mb-4 border-r-2 border-gray-300">
                    <img
                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Patient"
                        className="w-32 h-32 rounded-full mr-4 mb-5"
                    />
                    <h2 className="text-2xl font-bold">{patient.name}</h2>
                    <p className="text-lg text-gray-500 mt-2">{patient.email}</p>

                    <div className="flex flex-col justify-center items-center mt-5">
                        <p className="text-xl font-medium text-gray-500">Appointments</p>
                        <div className="grid grid-cols-2 my-3">
                            <div className="flex flex-col justify-center items-center border-r-2 border-gray-300 pr-5">
                                <p className="text-3xl font-bold text-center">5</p>
                                <h2 className="text-lg font-medium text-gray-500">Past</h2>
                            </div>
                            <div className="flex flex-col justify-center items-center pl-5">
                                <p className="text-3xl font-bold text-center">2</p>
                                <h2 className="text-lg font-medium text-gray-500">Upcoming</h2>
                            </div>
                        </div>
                    </div>


                    <Link to="/patient/profile-form"
                          className="text-center bg-light-orchid text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600">
                        Update Profile
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <p className="font-medium text-gray-500">Gender</p>
                        <p className="font-semibold">{patient.gender.toUpperCase()}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Birthday</p>
                        <p className="font-semibold">{formatDate(patient.dob)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Phone number</p>
                        <p className="font-semibold">{patient.phone}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Address</p>
                        <p className="font-semibold">{patient.address || "Abc Street, Xyz Town"}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">City</p>
                        <p className="font-semibold">{patient.city}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">ZIP Code</p>
                        <p className="font-semibold">{patient.zipcode || "123456"}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Registration date</p>
                        <p className="font-semibold">{formatDate(patient.registeredAt)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Member status</p>
                        <p className="font-semibold">{patient.status}</p>
                    </div>
                </div>
            </div>

            <div className="w-2/5 mx-auto bg-fuchsia-100 shadow-lg rounded-lg p-6">
                <div className="flex mb-4">
                    <button
                        className="px-4 py-2 font-semibold text-blue-500 border-b-2 border-blue-500 focus:outline-none">
                        Upcoming appointments
                    </button>
                    <button className="px-4 py-2 font-semibold text-gray-500 hover:text-blue-500 focus:outline-none">
                        Past appointments
                    </button>
                    <button className="px-4 py-2 font-semibold text-gray-500 hover:text-blue-500 focus:outline-none">
                        Medical records
                    </button>
                </div>
                <div>
                    <div className="flex items-center my-5 bg-white p-4 rounded-xl">
                        <div className="w-1/4 text-sm">
                            <p className="font-semibold">01 Jun '20</p>
                            <p className="text-gray-500">09:00 AM</p>
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                            <div className="flex-1 bg-fuchsia-100 p-4 rounded-lg">
                                <p className="font-semibold">Consultation</p>
                                <p className="">Dr. Arkady Ch.</p>
                            </div>
                            <div className="text-right ml-4">
                                <p className="text-gray-500">Type</p>
                                <p className="font-semibold">Cardiologist</p>
                            </div>
                        </div>
                        <button className="text-blue-500 hover:underline ml-4">Button</button>
                    </div>
                    <div className="flex items-center my-5 bg-white p-4 rounded-xl">
                        <div className="w-1/4 text-sm">
                            <p className="font-semibold">04 Jun '20</p>
                            <p className="text-gray-500">09:00 AM</p>
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                            <div className="flex-1 bg-fuchsia-100 p-4 rounded-lg">
                                <p className="font-semibold">Treatment Procedure</p>
                                <p className="">Dr. Arkady Ch.</p>
                            </div>
                            <div className="text-right ml-4">
                                <p className="text-gray-500">Type</p>
                                <p className="font-semibold">Dermatologist</p>
                            </div>
                        </div>
                        <button className="text-blue-500 hover:underline ml-4">Button</button>
                    </div>
                    <div className="flex items-center my-5 bg-white p-4 rounded-xl">
                        <div className="w-1/4 text-sm">
                            <p className="font-semibold">04 Jun '20</p>
                            <p className="text-gray-500">09:00 AM</p>
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                            <div className="flex-1 bg-fuchsia-100 p-4 rounded-lg">
                                <p className="font-semibold">Treatment Procedure</p>
                                <p className="">Dr. Arkady Ch.</p>
                            </div>
                            <div className="text-right ml-4">
                                <p className="text-gray-500">Type</p>
                                <p className="font-semibold">Dermatologist</p>
                            </div>
                        </div>
                        <button className="text-blue-500 hover:underline ml-4">Button</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PatientProfile;