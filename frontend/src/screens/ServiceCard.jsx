import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceCard = ({ img, title, description, link, onClick }) => {
  return (
    <Link to={link} onClick={onClick}>
      <div
        className="bg-white h-full min-h-[200px] flex flex-col justify-between items-start p-6 rounded-lg shadow-lg shadow-light-orchid hover:bg-fuchsia-100 hover:scale-105 duration-200">
        <img src={img} alt={title} className="mb-4" />
        <div>
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
