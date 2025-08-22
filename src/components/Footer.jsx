import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand-section">
          <h4 className="footer-brand">Customer's Delight</h4>
          <p className="footer-text">
            Discover premium products curated just for you. Shop smart. Shop stylish.
          </p>
        </div>

        {/* Company Links */}
        <div className="footer-links-section">
          <h6 className="footer-title">Company</h6>
          <ul className="footer-links">
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/prime-member">Prime Membership</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact-section">
          <h6 className="footer-title">Contact</h6>
          <ul className="footer-links">
            <li>📞 +91 9871428686</li>
            <li>✉️ info@customersdelight.com</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-social-section">
          <h6 className="footer-title">Connect</h6>
          <div className="footer-social">
            <a href="https://www.facebook.com/customerdelight"><i className="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/customerdelight_/"><i className="bi bi-instagram"></i></a>
            <a href="https://x.com/CSDelight_"><i className="bi bi-twitter"></i></a>
            <a href="https://www.linkedin.com/in/customer-delight/"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <hr />
        <p>&copy; {new Date().getFullYear()} Customer's Delight — All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
