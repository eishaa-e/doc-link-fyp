import React from "react";
import Navbar from "../components/Navbar";
import img from "../assets/img.png";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="w-full h-screen text-black bg-fuchsia-100 flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold">
              Empowering Health, <br />
              One Click at a Time
            </h1>
            <p className="font-light mt-4">
              Cruise through your health journey effortlessly with our
              user-friendly application. Stay informed, connected, and
              empowered, all in one place. Welcome To Doc Link!
            </p>
            <button className="w-32 mt-6 text-white bg-#b992dd hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Consult today
            </button>
          </div>
          <div className="flex-1 mt-6 md:mt-0">
            <img
              src={img}
              alt="Health illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
