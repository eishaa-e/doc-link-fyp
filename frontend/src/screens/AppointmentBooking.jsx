import React from "react";
import Navbar from "../components/Navbar";
import DoctorProfileCard from "../components/DoctorProfileCard";

const AppointmentBooking = () => {
    return (
        <div>
            <Navbar/>
            <div className="w-full flex flex-col justify-center items-center text-black bg-fuchsia-100">
                <h2 className="text-6xl font-bold my-5"> Choose the Doctor </h2>
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <div className="w-2/3 flex justify-center items-center text-center">
                        <DoctorProfileCard/>
                    </div>
                    <div className="w-2/3 flex justify-center items-center text-center">
                        <DoctorProfileCard/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBooking;
