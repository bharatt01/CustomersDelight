import React from "react";
import "./associate.css";
import { FaHandshake, FaUsers, FaMapMarkedAlt, FaLaptopCode, FaStar, FaBullhorn } from "react-icons/fa";

const steps = [
  {
    title: "Step 1: Meeting & Plan",
    description: "Meeting, discussion and finalization of implementation plan ",
    icon: <FaHandshake />,
  },
  {
    title: "Step 2: WhatsApp Community Setup",
    description: "Formation of Whatsapp group and Whatsapp community to build local customer base",
    icon: <FaUsers />,
  },
  {
    title: "Step 3: Prime Membership ",
    description: "Start of building prime members community ",
    icon: <FaMapMarkedAlt />,
  },
  {
    title: "Step 4: Website",
    description: "Building of website according to clients' business profile ",
    icon: <FaLaptopCode />,
  },
  {
    title: "Step 5: Google My Business Setup",
    description: "Listing on GMB. Address, map, phone, whatsapp, and reviews setup",
    icon: <FaStar />,
  },
  {
    title: "Step 6: Other work",
    description: "Creation and implementation of other work such as video content, posters and messages",
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
          <h2 className="associate-title">🚀 How Retailers Can Associate With Us</h2>
          <p className="associate-sub">
            Follow these steps to join and grow with our platform.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AssociateWithUs;
