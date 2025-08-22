import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./hero.css"; // custom CSS for fine-tuning

const HeroSlider = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/Images/hero3.png"
              alt="Local Stores"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl">
                Explore, {" "}
                <span className="text-orange-500">Visit and Buy</span> from the{" "}
                <span className="text-orange-500">Top Stores</span> in Your City
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
                Shop directly from local fashion entrepreneurs.{" "}
                <span className="text-orange-400 font-semibold">
                  Skip the middlemen
                </span>{" "}
                and support bold, original style.
              </p>
              <div className="mt-6 flex gap-4">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
                  Men's Wear
                </button>
                <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                  Women's Wear
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/Images/hero6.jpg"
              alt="Prime Membership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl">
                Become our{" "}
                <span className="text-yellow-400">Prime Member</span> and Avail{" "}
                <span className="text-yellow-400">Exclusive Discounts/Cashback/Deals/Offers</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
                Unlock exclusive offers, early access to sales, and free
                shipping on every order.{" "}
                <span className="text-yellow-300 font-semibold">
                  Elevate your shopping experience today!
                </span>
              </p>
              <div className="mt-6 flex gap-4">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition">
                  Join Now
                </button>
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
