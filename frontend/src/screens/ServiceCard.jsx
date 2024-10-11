import React from "react";
import {Link} from "react-router-dom";

const ServiceCard = ({img, title, description, link}) => {
    return (
        <Link to={link}>
            <div
                className="bg-white h-full min-h-[200px] flex flex-col justify-between items-start p-6 rounded-lg shadow-lg shadow-light-orchid">
                <img src={img} alt={title} className="mb-4 "/>
                <div>
                    <h2 className="text-lg font-bold mb-2">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;
