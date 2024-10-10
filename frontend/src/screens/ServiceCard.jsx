import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ icon, title, description }) => {
    return (
        <motion.div
            className="bg-gradient-to-br from-purple-200 via-blue-200 to-green-200 p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }} // Start off-screen
            whileInView={{ opacity: 1, y: 0 }} // Animate to position when in view
            transition={{ duration: 0.5 }} // Animation duration
            viewport={{ once: false }} // Re-trigger animation each time it comes into view
        >
            <img src={icon} alt={title} className="mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
};

export default ServiceCard;
