import React from "react";
import "./associate.css";
import { FaHandshake, FaUsers, FaMapMarkedAlt, FaLaptopCode, FaStar, FaBullhorn } from "react-icons/fa";

const steps = [
  {
    title: "Step 1: Meeting & Plan",
    description: "Meeting and finalisation of implementation plan",
    icon: <FaHandshake />,
  },
  {
    title: "Step 2: WhatsApp Setup",
    description: "Formation of WhatsApp group with the shop and put the QR code at the counter",
    icon: <FaUsers />,
  },
  {
    title: "Step 3: Google My Business",
    description: "Listing, address, mapping, phone, WhatsApp, timings, reviews",
    icon: <FaMapMarkedAlt />,
  },
  {
    title: "Step 4: Website",
    description: "Website building",
    icon: <FaLaptopCode />,
  },
  {
    title: "Step 5: Prime Membership",
    description: "Prime membership for Customers",
    icon: <FaStar />,
  },
  {
    title: "Step 6: Execution",
    description: "Execution of different programs, strategies, and promotional activities",
    icon: <FaBullhorn />,
  },
];

const AssociateWithUs = () => {
  return (
    <section className="associate-section">
      <div className="associate-container">
        
        {/* Left side: cards */}
        <div className="associate-left">
          <div className="associate-grid">
            {steps.map((step, index) => (
              <div key={index} className="associate-card">
                <div className="associate-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: heading */}
        <div className="associate-right">
          <h2 className="associate-title">🚀 How to Associate With Us</h2>
          <p className="associate-sub">
            Follow these steps to join and grow with our platform.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AssociateWithUs;
