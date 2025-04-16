import React from "react";
import { ShieldCheck, MousePointerClick, Headphones, Mail } from "lucide-react";
import "./About.css";

const AboutContent = () => {
  return (
    <div className="about-wrapper">
      <div className="about-card">
        
        <h1 className="about-title"><br></br>About Us</h1>
        <p className="about-description">
          Welcome to our platform! We're dedicated to delivering top-tier services with a seamless user interface and a delightful user experience.
        </p>

        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-description">
          We simplify daily life through smart, innovative, and reliable solutions—putting user satisfaction at the heart of everything we build.
        </p>

        <h2 className="about-subtitle">Why Choose Us?</h2>
        <ul className="about-list">
          <li><ShieldCheck size={18} /> Reliable and secure platform</li>
          <li><MousePointerClick size={18} /> Intuitive and easy-to-use interface</li>
          <li><Headphones size={18} /> 24/7 Dedicated support team</li>
        </ul>

        <h2 className="about-subtitle">Contact Us</h2>
        <p className="about-description">
          We'd love to hear from you! Drop us an email at{" "}
          <span className="email"><Mail size={16} /> support@example.com</span>
        </p>
      </div>
    </div>
  );
};

export default AboutContent;
