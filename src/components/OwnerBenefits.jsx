import React from "react";
import "./services.css";
import { FaLaptopCode, FaGoogle, FaShareAlt, FaSearch, FaPaintBrush } from "react-icons/fa";

const services = [
  {
    title: "Website Development",
    description: "We build modern and responsive website tailored to our client's business profile",
    icon: <FaLaptopCode />,
  },
  {
    title: "Google Business Profile",
    description: "We build Google business profile to boost local visibility, search and customers' trust",
    icon: <FaGoogle />,
  },
  {
    title: "Social Media Marketing",
    description: "We help build audience engagement with impactful content across all social media platforms",
    icon: <FaShareAlt />,
  },
  {
    title: "SEO Optimization",
    description: "We work in improving our clients' Google search rankings and get discovered by more customers",
    icon: <FaSearch />,
  },
  {
    title: "Branding Solutions",
    description: "We help create lasting impression with branding and marketing services",
    icon: <FaPaintBrush />,
  },
  {
    title: "WhatsApp Community",
    description: "We build whatsapp community to create awareness, promote offers and increase footfall",
    icon: <FaShareAlt />,
  },
];

const Services = () => {
  return (
    <section className="services-section">
      <div className="services-container">

        {/* Left Side */}
        <div className="services-left">
          <h2 className="services-title">✨ Our Suite of Services</h2>
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
