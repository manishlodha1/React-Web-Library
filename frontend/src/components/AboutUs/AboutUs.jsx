import React from 'react';
import './About.css';
import { Link } from 'react-router';

const amenities = [
  "Fully Air-Conditioned Reading Hall",
  "RO Drinking Water and Clean Washrooms",
  "Free High-Speed WiFi for Research & Online Classes",
  "Individual Desks with Charging Points",
  "Strict Silence Policy for Uninterrupted Focus",
  "24x7 CCTV Surveillance for Safety and Security",
  "Spacious Seating and Well-lit Interior",
  "Clean, Hygienic, and Regularly Sanitized Environment"
];

const testimonials = [
  { quote: "A perfect place for serious study. Clean and calm environment!", author: "Radhika, NEET Aspirant" },
  { quote: "WiFi is super fast, and the ambiance helps me stay focused.", author: "Aman, UPSC Student" },
  { quote: "I love coming here daily. It's safe and comfortable.", author: "Priya, CA Final Student" },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Rudra Library</h1>
        <p>
          Rudra Library is a modern, student-centric library designed to provide a calm, secure,
          and resourceful environment for learners of all ages.
        </p>
      </div>

      {/* Intro Text */}
      <p className="intro-text">
        Our facility is equipped with all the essential amenities to ensure a productive learning experience.
        Whether you're preparing for competitive exams like <strong>UPSC, NEET, JEE, SSC</strong>, or simply
        want a peaceful place to study, Rudra Library is your ideal companion.
      </p>

      {/* Amenities List */}
      <section className="amenities-section">
        <h2>Facilities We Offer</h2>
        <ul className="amenities-list">
          {amenities.map((item, index) => (
            <li key={index}>🔹 {item}</li>
          ))}
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Members Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p>“{t.quote}”</p>
              <span>- {t.author}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery-section">
        <h2>Library Photo Gallery</h2>
        <div className="gallery-grid">
          <img src="/images/library1.jpg" alt="Library Interior" />
          <img src="/images/library2.jpg" alt="Study Tables" />
          <img src="/images/library3.jpg" alt="Entry View" />
        </div>
      </section>

      {/* Contact Info */}
      <section className="info-section">
        <h2>Visit Us</h2>
        <p><strong>Address:</strong> Rudra Library, 123 Study Lane, YourCity</p>
        <p><strong>Opening Hours:</strong> Mon - Sun: 8:00 AM - 10:00 PM</p>
        <p><strong>Contact:</strong> +91 98765 43210 | rudralibrary@email.com</p>
      </section>

      {/* Call to Action */}
      <div className="cta-button">
        <Link to="/add-new-member" className="join-now-btn">Join Now</Link>
      </div>
    </div>
  );
};

export default AboutUs;
