import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DoctorProfileCard from "../components/DoctorProfileCard";
import axios from "axios";

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllDoctors = async () => {
    await axios
      .get("http://localhost:5000/api/doctors/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setDoctors(response.data);
        console.log("Doctors: ", response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="w-full h-screen flex flex-col items-center text-black bg-fuchsia-100">
        <h2 className="text-6xl font-bold my-5"> Choose the Doctor </h2>
        <div className="w-full flex flex-col justify-center items-center gap-5">
          {doctors &&
            doctors.map((doctor, index) => {
              return (
                <div
                  key={index}
                  className="w-2/3 flex justify-center items-center text-center"
                >
                  <DoctorProfileCard doctor={doctor} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;
