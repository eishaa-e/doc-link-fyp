import React from "react";

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img src={icon} alt={title} className="mb-4 mx-auto" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
