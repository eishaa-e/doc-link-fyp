import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/doc-link-icon.png";
import axiosInstance from "../services/axiosInterceptor";
import Loader from "../components/Loader";
import CommonService from "../services/CommonService";

const PatientProfileForm = () => {
  const authToken = localStorage.getItem("authToken");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance
      .put(
        "/patients/update-profile",
        {
          name,
          dob,
          gender,
          phone,
          city,
          profileImage
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((response) => {
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPatientProfile = async () => {
    await axiosInstance
      .get(`/patients/get-profile`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        console.log("Patient Profile here: ", response);
        setName(response.data?.name);
        setDob(CommonService.formatDate(response.data?.dob));
        setGender(response.data?.gender);
        setPhone(response.data?.phone);
        setCity(response.data?.city);
        setProfileImage(response.data?.profileImage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patient profile: ", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getPatientProfile();
    console.log("name: ", name);
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full py-10 bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 bg-white flex justify-center flex-col p-10 rounded-xl shadow-xl shadow-light-orchid"
      >
        <div className="flex flex-col justify-center items-center">
          <img className="w-16 mb-3" src={logo} alt="asd" srcset="" />
          <h2 className="text-4xl font-bold text-center mb-5">DOC LINK</h2>
          <h1 className="text-2xl font-semibold text-center mb-5">
            Patient Profile Form
          </h1>
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone number
          </label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="12544589657"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="dob"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your city
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Lahore"
            required
          />
        </div>

        <div className="flex items-center mb-4 justify-center gap-4">
          <div>
            <input
              id="doctor"
              type="radio"
              value="male"
              name="gender"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              className="w-4 h-4 text-fuchsia-500 bg-gray-100 border-gray-300 focus:ring-fuchsia-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="male"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Male
            </label>
          </div>
          <div>
            <input
              id="doctor"
              type="radio"
              value="female"
              name="gender"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              className="w-4 h-4 text-fuchsia-500 bg-gray-100 border-gray-300 focus:ring-fuchsia-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="female"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Female
            </label>
          </div>
          <div>
            <input
              id="doctor"
              type="radio"
              value="other"
              name="gender"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
              className="w-4 h-4 text-fuchsia-500 bg-gray-100 border-gray-300 focus:ring-fuchsia-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="other"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Other
            </label>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="profileImage"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {profileImage && (
          <div className="mb-5">
            <img
              src={profileImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full text-white bg-fuchsia-500 hover:bg-fuchsia-400 transition focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default PatientProfileForm;
