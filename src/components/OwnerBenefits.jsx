import React from "react";
import "./services.css";
import { FaLaptopCode, FaGoogle, FaShareAlt, FaSearch, FaPaintBrush } from "react-icons/fa";

const services = [
  {
    title: "Website Development",
    description: "We build modern, responsive websites tailored to your business needs.",
    icon: <FaLaptopCode />,
  },
  {
    title: "Google Business Profile",
    description: "Boost local visibility and customer trust with Google Business Profile.",
    icon: <FaGoogle />,
  },
  {
    title: "Social Media Marketing",
    description: "Engage your audience with impactful campaigns across all social platforms.",
    icon: <FaShareAlt />,
  },
  {
    title: "SEO Optimization",
    description: "Improve your search engine rankings and get discovered by more customers.",
    icon: <FaSearch />,
  },
  {
    title: "Branding Solutions",
    description: "Create a lasting impression with custom branding and design services.",
    icon: <FaPaintBrush />,
  },
  {
    title: "WhatsApp Community",
    description: "Build WhatsApp Community to create awareness, promote offers, and increase footfall.",
    icon: <FaShareAlt />,
  },
];

const Services = () => {
  return (
    <section className="services-section">
      <div className="services-container">

        {/* Left Side */}
        <div className="services-left">
          <h2 className="services-title">✨ Our Services</h2>
          <p className="services-sub">
            We provide innovative digital solutions to grow your business.
          </p>
        </div>

        {/* Right Side */}
        <div className="services-right">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
