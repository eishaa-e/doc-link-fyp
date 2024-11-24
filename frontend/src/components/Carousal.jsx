import React, { useEffect } from "react";
import img1 from "../assets/bannerImg1.png";
import img2 from "../assets/bannerImg2.png";
import img3 from "../assets/bannerImg1.png";

const Carousal = () => {
  useEffect(() => {
    const items = document.querySelectorAll("[data-carousel-item]");
    let currentIndex = 0;

    const updateCarousel = (newIndex) => {
      items[currentIndex]?.classList.add("hidden");
      items[newIndex]?.classList.remove("hidden");
      currentIndex = newIndex;
    };

    const prevButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");

    prevButton?.addEventListener("click", () => {
      const newIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel(newIndex);
    });

    nextButton?.addEventListener("click", () => {
      const newIndex = (currentIndex + 1) % items.length;
      updateCarousel(newIndex);
    });

    // Auto slide every 5 seconds
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % items.length;
      updateCarousel(newIndex);
    }, 5000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="animation-carousel" className="relative w-full rounded-3xl bg-teal-100 z-10" data-carousel="static">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div className="hidden duration-200 ease-linear" data-carousel-item="active">
          <img
            src={img1}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Slide 1"
          />
        </div>
        <div className="hidden duration-200 ease-linear" data-carousel-item>
          <img
            src={img2}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Slide 2"
          />
        </div>
        <div className="hidden duration-200 ease-linear" data-carousel-item>
          <img
            src={img3}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Slide 3"
          />
        </div>
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white"
        >
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white"
        >
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 9l4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Carousal;
