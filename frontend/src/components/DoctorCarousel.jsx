import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DoctorCard from "./DoctorCard";

const DoctorCarousel = ({ doctors }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-xl font-medium mt-4 mb-2">Consult our doctors</h2>
      <hr className="w-2/12 h-1 bg-gray-400 mb-4" />
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
        navigation={true}
        // pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="w-full max-w-6xl"
      >
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <SwiperSlide key={index}>
              <DoctorCard doctor={doctor} />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-600">No doctors available at the moment.</p>
        )}
      </Swiper>
    </div>
  );
};

export default DoctorCarousel;
