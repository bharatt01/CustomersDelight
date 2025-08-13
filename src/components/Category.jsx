import React from "react";
import { useNavigate } from "react-router-dom";
import "./category.css";

const categories = [
  { title: "Men", image: "/Images/men2.avif", categorySlug: "men" },
  { title: "Women", image: "/Images/woman2.avif", categorySlug: "women" },
  { title: "Kids", image: "/Images/kids2.avif", categorySlug: "kids" },
  { title: "Home", image: "/Images/home2.jpg", categorySlug: "home" }, // ✅ New category
];

const SplitCategory = () => {
  const navigate = useNavigate();

  return (
    <section className="category-section">
      <h2 className="category-title">Categories</h2>
      <div className="category-grid">
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
    </section>
  );
};

export default SplitCategory;
