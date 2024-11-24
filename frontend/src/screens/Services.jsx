import React from "react";
import ServiceCard from "./ServiceCard";
import Service1 from "../assets/services/Service1.png";
import Service2 from "../assets/services/Service2.png";
import Service3 from "../assets/services/Service3.png";
import Service4 from "../assets/services/Service4.png";
import Service5 from "../assets/services/Service5.png";
import Service6 from "../assets/services/Service6.png";
import { Link, useLocation } from "react-router-dom";

const Services = ({ toggleChat }) => {
  const path = useLocation();
  const services = [
    {
      img: Service1,
      title: "Find Doctor",
      description:
        "Easily search and find doctors based on specialization, location, and expertise.",
      link: "/find-doctor"
    },
    {
      img: Service2,
      title: "Chat With AI",
      description: "Get instant health advice by chatting with our advanced AI assistant.",
      onClick: toggleChat // Call toggleChat when clicked
    },
    {
      img: Service3,
      title: "Appointment Booking",
      description: "Book appointments with your preferred doctor quickly and hassle-free.",
      link: "/find-doctor"
    },
    {
      img: Service4,
      title: "Reviews",
      description:
        "Read and share feedback about doctors and healthcare services.",
      link: "/"
    },
    {
      img: Service5,
      title: "Stone Identification",
      description:
        "Identify potential kidney stones using our AI-powered tool by giving image.",
      link: "/kidney-stone-prediction"
    },
    {
      img: Service6,
      title: "Brain Tumor Prediction",
      description:
        "Get AI-driven predictions for potential brain tumor using CT-images.",
      link: "/brain-tumor-prediction"
    }
  ];

  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-6xl mx-auto p-10 flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-xl font-medium mt-4 mb-2">
            OUR SERVICES</h2>
          <hr className="w-2/12 h-1 bg-gray-400 mb-4" />

          <p className="text-sm text-gray-500 text-center font-medium mb-8">
            We provide you the best choices for you. Adjust it to your health
            needs and make sure your undergo treatment with our highly qualified
            doctors you can consult with us which type of service is suitable for
            your health.
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                img={service.img}
                title={service.title}
                description={service.description}
                link={service.link}
                onClick={service.onClick ? service.onClick : null}

              />
            ))}
          </div>

          {
            path.pathname === "/" &&
            <Link to="/services"
                  className="mt-8 px-4 py-2 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-800">
              View All
            </Link>
          }

          {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
          {/*  {services.map((service, index) => (*/}
          {/*    <ServiceCard*/}
          {/*      key={index}*/}
          {/*      {...service}*/}
          {/*      onClick={service.onClick ? service.onClick : null}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
      </div>
    </div>);
};

export default Services;
