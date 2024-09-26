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
      title: "Find Doctor",
      description:
        "Easily search and find doctors based on specialization, location, and expertise.",
      link: "/find-doctor",
    },
    {
      img: Service2,
      title: "Chat With AI",
      description:
        "Get instant health advice by chatting with our advanced AI assistant.",
      link: "/",
    },
    {
      img: Service3,
      title: "Appointment Booking",
      description:
        "Book appointments with your preferred doctor quickly and hassle-free.",
      link: "/find-doctor",
    },
    {
      img: Service4,
      title: "Reviews",
      description:
        "Read and share feedback about doctors and healthcare services.",
      link: "/",
    },
    {
      img: Service5,
      title: "Stone Identification",
      description:
        "Identify potential kidney stones using our AI-powered tool by giving input as image.",
      link: "/",
    },
    {
      img: Service6,
      title: "Disease Prediction",
      description:
        "Get AI-driven predictions for potential diseases based on your symptoms.",
      link: "/",
    },
  ];

  return (
    <div className="w-full max-w-6xl my-5 p-10 flex justify-center align-middle">
      <div className="bg-white flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>

        <p className="text-black-500 text-center mb-8">
          We provide you the best choices for you. Adjust it to your health
          needs and make sure your undergo treatment with our highly qualified
          doctors you can consult with us which type of service is suitable for
          your health.
        </p>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              img={service.img}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>

        <button className="mt-8 px-6 py-3 bg-light-orchid text-white rounded-lg shadow-md hover:bg-fuchsia-300">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Services;
