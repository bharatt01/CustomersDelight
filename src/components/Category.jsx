import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./category.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import LazyImage from "./LazyImage";
const categories = [
  { title: "Men", image: "/Images/men2.avif", categorySlug: "men" },
  { title: "Women", image: "/Images/woman2.avif", categorySlug: "women" },
  { title: "Kids", image: "/Images/kids2.avif", categorySlug: "kids" },
  { title: "Home Appliances", image: "/Images/Appliances.jpg", categorySlug: "homeappliances" },
  { title: "Furniture", image: "/Images/furniture.jpg", categorySlug: "furniture" }
];

const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
    <i className="chevron">›</i>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
    <i className="chevron">‹</i>
  </div>
);

const SplitCategory = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2500,
    swipeToSlide: true,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <section className="category-section">
      <div className="category-heading">
        <h2 className="category-title">
          Shop <span>by Category</span>
        </h2>
        <div className="heading-design desktop-only"></div>
      </div>

      {/* Desktop: Slider | Mobile: List */}
      {!isMobile ? (
        <Slider {...settings} className="category-slider">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="category-card"
              onClick={() => navigate(`/category/${cat.categorySlug}`)}
            >
              <div
                className="category-image"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="category-overlay">
                <h3>{cat.title}</h3>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="category-list">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="category-card"
              onClick={() => navigate(`/category/${cat.categorySlug}`)}
            >
              <div
                className="category-image"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="category-overlay">
                <h3>{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SplitCategory;
