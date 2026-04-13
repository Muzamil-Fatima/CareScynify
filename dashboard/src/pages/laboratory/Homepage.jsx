import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

export default function Home() {
  return (
    <div className="main-wrapper">
      {/* 🌐 Navbar */}
      <header>
        <nav className="navbar">
          <div className="logo">🧪 CareScynify</div>
          <ul className="nav-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>

      {/* 🌟 Hero Section */}
      {/* 🌟 Hero Section */}
<section className="hero">
  <div className="hero-content">
    <h1>Smart Laboratory Management System</h1>
    <p>Manage Patients, Staff, Tests & Reports — all in one smart platform.</p>

   
      
      {/* Get Started Button ko separate rakha hai */}
      <Link to="/register" className="btn-get-started">Get Started</Link>
    </div>

</section>
      {/* 🧬 Features */}
      <section className="features">
        <h2>Our Smart Features</h2>
        <div className="feature-container">
          <div className="feature-box">
            <h3>🧾 Test Management</h3>
            <p>Organize and schedule all lab tests with a few clicks.</p>
          </div>
          <div className="feature-box">
            <h3>👨‍⚕️ Patient Dashboard</h3>
            <p>Allow patients to view reports and book tests online.</p>
          </div>
          <div className="feature-box">
            <h3>📊 Data Analytics</h3>
            <p>Visualize lab performance and generate smart insights.</p>
          </div>
          <div className="feature-box">
            <h3>🔒 Secure Access</h3>
            <p>All data encrypted and safely stored in your system.</p>
          </div>
        </div>
      </section>

      {/* 🧫 About */}
    <section className="about">
  <div className="about-content">
    <h2>About SmartLab</h2>
    <p>
      SmartLab helps laboratories digitalize their workflow. From patient
      registration to automated report generation, our platform saves time,
      reduces errors, and provides real-time monitoring.
    </p>
  </div>
</section>

      {/* 💬 Testimonials */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testi-container">
          <div className="testi-box">
            <p>"SmartLab has made managing our patients so easy. Everything is online now!"</p>
            <h4>— Dr. Ayesha, CityLab</h4>
          </div>
          <div className="testi-box">
            <p>"Quick reports, easy dashboard, and amazing design. Highly recommended!"</p>
            <h4>— Patient Ali Khan</h4>
          </div>
          <div className="testi-box">
            <p>"Our workflow became 10x faster with SmartLab automation tools."</p>
            <h4>— Lab Admin Ahmed</h4>
          </div>
        </div>
      </section>

    {/* ✉️ Newsletter */}
<section className="newsletter">
  <div className="newsletter-content">
    <h2>Subscribe for Latest Updates</h2>
    <p>Stay connected and get updates about our new smart lab features!</p>

    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
      <input type="email" placeholder="Enter your email..." required />
      <button type="submit">Subscribe</button>
    </form>
  </div>
</section>

      {/* 📞 Footer */}
      <footer>
        <p>© 2025 CareScynify| Designed with ❤️</p>
        <p>Email: support@CareScynify.com | Phone: +92 300 1234567</p>
      </footer>
    </div>
  );
}