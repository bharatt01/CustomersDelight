import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "./hero.css";

const HeroSlider = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
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
              <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-snug max-w-4xl">
                Explore,{" "}
                <span className="text-orange-500">Visit and Buy</span> <br />
                from the <span className="text-orange-500">Top Stores</span> in
                Your City
              </h1>
              <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-3xl">
                Shop directly from local fashion entrepreneurs.{" "}
                <span className="text-orange-400 font-semibold">
                  Skip the middlemen
                </span>{" "}
                and support bold, original style.
              </p>
              <div className="mt-6 flex gap-4 flex-wrap justify-center">
                <button
                  onClick={() => navigate("/category/men")}
                  className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  Men's Wear
                </button>
                <button
                  onClick={() => navigate("/category/women")}
                  className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                >
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
              <h1 className="text-3xl md:text-6xl font-extrabold leading-tight max-w-4xl text-white drop-shadow-lg">
                Become our{" "}
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-extrabold">
                  Prime Member
                </span>
                <br className="hidden md:block" />
                and Avail{" "}
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-extrabold">
                  Exclusive Discounts, Cashback, Deals & Offers
                </span>
              </h1>

              <p className="mt-4 text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow">
                Unlock exclusive offers, early access to sales, and free
                shipping on every order.{" "}
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-semibold">
                  Elevate your shopping experience today!
                </span>
              </p>

           <div className="mt-6 flex gap-4 flex-wrap justify-center">
  {/* WhatsApp Button */}
  <button
    onClick={() =>
      window.open(
        "https://wa.me/919871428686?text=Hi, I want to join the Prime Membership!",
        "_blank"
      )
    }
    className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-orange-600 hover:to-yellow-500 transition"
  >
    Join Now
  </button>

  {/* Navigate to Prime Membership Page */}
  <button
    onClick={() => navigate("/prime-member")}
    className="px-6 py-3 rounded-full font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 border-2 border-orange-400 hover:border-yellow-500 hover:scale-105 transition"
  >
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
