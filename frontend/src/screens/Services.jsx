import React from "react";
import ServiceCard from "./ServiceCard";
import Service1 from "../assets/Service1.png";
import Service2 from "../assets/Service2.png";
import Service3 from "../assets/Service3.png";
import Service4 from "../assets/Service4.png";
import Service5 from "../assets/Service5.png";
import Service6 from "../assets/Service6.png";

const Services = () => {
  // Data for each card
  const services = [
    {
      img: Service1,
      title: "Search doctor",
      description:
        "Choose your doctor from thousands of specialists, general, and trusted hospitals.",
    },
    {
      img: Service2,
      title: "Chat With AI",
      description:
        "Buy your medicines with our mobile application with a simple delivery system.",
    },
    {
      img: Service3,
      title: "Appointment Booking",
      description:
        "Free consultation with our trusted doctors and get the best recommendations.",
    },
    {
      img: Service4,
      title: "Reviews",
      description:
        "Free consultation with our trusted doctors and get the best recommendations.",
    },
    {
      img: Service5,
      title: "Stone Identification",
      description: "You can get 24/7 urgent care for yourself or your family.",
    },
    {
      img: Service6,
      title: "Disease Prediction",
      description: "Track and save your medical history and health data.",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">Our services</h2>

      <p className="text-gray-500 text-center max-w-md mb-8">
        We provide you the best choices for you. Adjust it to your health needs
        and make sure your undergo treatment with our highly qualified doctors
        you can consult with us which type of service is suitable for your
        health.
      </p>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            img={service.img}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>

      <button className="mt-8 px-6 py-3 bg-light-orchid text-white rounded-lg shadow-md hover:bg-fuchsia-300">
        Learn more
      </button>
    </div>
  );
};

export default Services;
