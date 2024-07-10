import React from "react";

function Home() {
    return (
        <div className="w-full h-screen text-black bg-fuchsia-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Empowering Health, One Click at a Time</h1>
            <p className="font-light">
                Cruise through your health journey effortlessly with our user-friendly
                application. Stay informed, connected, and empowered, all in one place.
            </p>
            <button
                className="w-32 text-white bg-fuchsia-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                Consult today
            </button>
        </div>
    );
}

export default Home;
