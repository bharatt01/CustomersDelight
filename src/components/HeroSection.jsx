import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Heros = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [direction, setDirection] = useState("next"); // start moving forward

  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;

    const interval = setInterval(() => {
      if (direction === "next") {
        swiper.slideNext(); // move forward
        setDirection("prev"); // next time go backward
      } else {
        swiper.slidePrev(); // move backward
        setDirection("next"); // next time go forward
      }
    }, 4000); // change every 4s

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <Swiper
      ref={swiperRef}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      loop
      speed={800}
      className="w-full h-[90vh]"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="relative h-[90vh] flex items-center justify-start px-6 md:px-16 bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-120"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + "/Images/hero.jpg"})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 max-w-4xl text-left text-white space-y-6">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
              Explore{" "}
              <span className="text-orange-400">Top Fashion Stores</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-xl">
              Shop directly from local fashion entrepreneurs. Skip the middlemen.
              Support bold, original style.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate("/category/men")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md"
              >
                Men's Wear
              </button>
              <button
                onClick={() => navigate("/category/women")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md"
              >
                Women's Wear
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
    {/* Slide 2 */}
<SwiperSlide>
  <div className="relative h-[90vh] flex items-center justify-start px-6 md:px-16">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/Images/vip5.jpg"})`,
      }}
    ></div>
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-yellow-900/40"></div>
    <div className="relative z-10 max-w-4xl text-left text-white space-y-6">
      <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
        Become a{" "}
        <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-md">
          Prime Member
        </span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-200 max-w-xl leading-relaxed">
        Unlock <span className="text-yellow-300 font-semibold">exclusive deals</span>, 
        get <span className="text-yellow-300 font-semibold">early access</span> to sales, 
        and enjoy <span className="text-yellow-300 font-semibold">free shipping</span> on every order.  
        Elevate your shopping experience today!
      </p>
      <div className="flex flex-wrap gap-4 pt-4 justify-start">
        <button
          onClick={() => navigate("/prime")}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-lg hover:scale-105 transform transition"
        >
          Join Now
        </button>
        <button
          onClick={() => navigate("/learn-more")}
          className="px-8 py-3 rounded-full border-2 border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black font-semibold transition"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
</SwiperSlide>

    </Swiper>
  );
};

export default Heros;
