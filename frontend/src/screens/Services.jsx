import React from "react";
import ServiceCard from "./ServiceCard"; 
import { motion } from "framer-motion";

const Services = ({ toggleChat }) => {
    const services = [
        {
            icon: "https://img.icons8.com/ios/50/000000/search--v1.png",
            title: "Search doctor",
            description: "Choose your doctor from thousands of specialists, general, and trusted hospitals.",
        },
        {
            icon: "https://img.icons8.com/ios/50/000000/chat.png",
            title: "Chat With AI",
            description: "Buy your medicines with our mobile application with a simple delivery system.",
            onClick: toggleChat, // Call toggleChat when clicked
        },
        {
            icon: "https://img.icons8.com/ios/50/000000/appointment-scheduling.png",
            title: "Appointment Booking",
            description: "Free consultation with our trusted doctors and get the best recommendations.",
        },
        {
            icon: "https://img.icons8.com/ios/50/000000/review-document.png",
            title: "Reviews",
            description: "Read reviews and feedback from other patients for better insights.",
        },
        {
            icon: "https://img.icons8.com/ios/50/000000/kidney.png",
            title: "Stone Identification",
            description: "Get 24/7 urgent care for yourself or your family.",
        },
        {
            icon: "https://img.icons8.com/ios/50/000000/health-checkup.png",
            title: "Disease Prediction",
            description: "Track and save your medical history and health data.",
        },
    ];

    return (
        <div className="w-full max-w-6xl my-10">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <ServiceCard 
                        key={index} 
                        {...service} 
                        onClick={service.onClick ? service.onClick : null} // Add onClick if defined
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;
