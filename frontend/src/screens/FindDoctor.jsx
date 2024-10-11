import React, {useEffect, useState} from "react";
import DoctorProfileCard from "../components/DoctorProfileCard";
import gynecologistIcon from "../assets/icons/gynecologist-icon.png";
import dermatologistIcon from "../assets/icons/dermatologist-icon.png";
import dentistIcon from "../assets/icons/dentist-icon.png";
import orthopedicIcon from "../assets/icons/orthopedic-icon.png";
import neurologistIcon from "../assets/icons/neurologist-icon.png";
import cardiologistIcon from "../assets/icons/cardiologist-icon.png";
import axiosInstance from "../services/axiosInterceptor";

const FindDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);

    const specializations = [
        {
            title: "Dentist",
            img: dentistIcon,
        },
        {
            title: "Gynecologist",
            img: gynecologistIcon,
        },
        {
            title: "Dermatologist",
            img: dermatologistIcon,
        },
        {
            title: "Orthopedic Surgeon",
            img: orthopedicIcon,
        },
        {
            title: "Neurologist",
            img: neurologistIcon,
        },
        {
            title: "Cardiologist",
            img: cardiologistIcon,
        },
    ];

    const getDoctors = async (specialization = "") => {
        let url = "/doctors/";

        if (specialization) {
            url += `?specialization=${specialization}`;
        }

        await axiosInstance
            .get(url)
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleSpecializationClick = (specialization) => {
        if (specialization === selectedSpecialization) {
            setSelectedSpecialization(null);
            getDoctors();
            return;
        }
        setSelectedSpecialization(specialization);
        getDoctors(specialization);
    };

    useEffect(() => {
        getDoctors();
    }, []);

    return (
        <div className="w-full py-10 flex flex-col items-center text-black bg-gray-100">
            <div className="flex flex-col justify-center items-center mt-4 mb-10 cursor-pointer">
                <h2 className="text-center text-4xl font-bold mb-4">Select Doctor</h2>
                <hr className="w-1/2 h-1 bg-gray-800"/>
            </div>

            <div className="px-10 grid grid-cols-6 items-center gap-6 mb-10">
                {specializations.map((specialization, index) => (
                    <div
                        key={index}
                        onClick={() => handleSpecializationClick(specialization.title)}
                        className={`flex flex-col justify-center items-center gap-2 cursor-pointer ${
                            selectedSpecialization === specialization.title
                                ? "border-2 border-blue-500 rounded-lg p-2"
                                : ""
                        }`}
                    >
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center">
                            <img
                                className="w-16 h-16 rounded-full"
                                src={specialization.img}
                                alt={specialization.title}
                            />
                        </div>
                        <h3 className="text-sm font-medium">{specialization.title}</h3>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-8xl flex flex-col justify-center items-center gap-5">
                {doctors &&
                    doctors.map((doctor, index) => {
                        return (
                            <div
                                key={index}
                                className="w-full flex justify-center items-center text-center"
                            >
                                <DoctorProfileCard doctor={doctor}/>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default FindDoctor;
