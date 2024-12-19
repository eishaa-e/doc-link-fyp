import React, { useState } from "react";
import AppointmentListItem from "../components/AppointmentListItem";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const PaginatedAppointments = ({
                                 appointments,
                                 itemsPerPage = 5,
                                 onUpdate,
                                 isPast = false
                               }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total pages
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (currentItems.length === 0) {
    return <div className="font-bold px-3 py-3 text-lg">
      There are no appointments.
    </div>;
  }

  return (
    <div>
      {(currentItems.map((appointment) => (
        <div key={appointment.id}>
          <AppointmentListItem
            appointment={appointment}
            onUpdate={onUpdate}
            isPast={isPast}
          />
        </div>
      )))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-800"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === index + 1
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-500 hover:bg-teal-500 hover:text-white"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-800"
          }`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PaginatedAppointments;