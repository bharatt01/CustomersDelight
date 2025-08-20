import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./hero.css";

const slides = [
  {
    img: "/Images/hero.jpg",
    title: (
      <>
        Explore, visit and buy from the <br />
        <span className="highlight-orange">Top Stores/Shops in your City</span>
      </>
    ),
    desc:
      "Shop directly from local fashion entrepreneurs. Skip the middlemen. Support bold, original style.",
    btns: [
      { label: "Men's Wear", link: "/category/men", type: "primary" },
      { label: "Women's Wear", link: "/category/women", type: "secondary" },
    ],
  },
  {
    img: "/Images/vip5.jpg",
    title: (
      <>
        Become our <span className="highlight-yellow">Prime member</span>
        <br />
        and avail exclusive Discount/Cashback/Deals/Offers
      </>
    ),
    desc:
      "Unlock exclusive deals, get early access to sales, and enjoy free shipping on every order. Elevate your shopping experience today!",
    btns: [
      { label: "Join Now", link: "/prime", type: "primary" },
      { label: "Learn More", link: "/learn-more", type: "secondary" },
    ],
  },
];

const Heros = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [direction, setDirection] = useState("next");

  // Auto swiper slide
  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;
    const interval = setInterval(() => {
      direction === "next" ? swiper.slideNext() : swiper.slidePrev();
      setDirection(direction === "next" ? "prev" : "next");
    }, 5000);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <Swiper
      ref={swiperRef}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      loop
      speed={900}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="hero-slide">
            <img
              src={process.env.PUBLIC_URL + slide.img}
              alt="Hero"
              className="hero-image"
            />
            <div className="hero-overlay" />
            <div className="hero-text left-on-desktop">
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
              <div className="hero-buttons">
                {slide.btns.map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(btn.link)}
                    className={btn.type === "primary" ? "btn-primary" : "btn-secondary"}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Heros;
