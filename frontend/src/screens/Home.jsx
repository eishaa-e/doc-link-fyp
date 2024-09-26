import React from "react";

import img from "../assets/home-image.png";
import { Feedback } from "../components/Feedback";
import Services from "./Services";

function Home() {
  return (
    <div>
      <div className="w-full text-black bg-white flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-center  mt-20">
          <div className="flex-1">
            <h1 className="text-4xl font-bold">
              Empowering Health, <br />
              One Click at a Time
            </h1>
            <p className="font-light w-5/6 mt-4">
              Cruise through your health journey effortlessly with our
              user-friendly application. Stay informed, connected, and
              empowered, all in one place. Welcome To Doc Link!
            </p>
            <button className="w-50 mt-6 text-white bg-light-orchid  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Consult today
            </button>
          </div>
          <div className="flex-1 md:mt-0">
            <img src={img} alt="Health illustration" className="w-11/12" />
          </div>
        </div>
        <Services />
        <div className="w-full max-w-6xl my-5 p-10 flex justify-center align-middle">
          <Feedback />
        </div>
      </div>
    </div>
  );
}

export default Home;
