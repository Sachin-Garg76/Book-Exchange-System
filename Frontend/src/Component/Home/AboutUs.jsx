import React from "react";
import "../../Styles/About.css";
import LandingPageNavbar from "../Navbar/LandingpageNav";
function About() {
  return (
    <>
    <LandingPageNavbar />
    <div className="about">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About Our Platform</h1>
        <p>Connecting Readers • Sharing Knowledge • Saving Money</p>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            We are building a smart book exchange platform where students can
            easily buy, sell, and exchange books within their city. Our goal is
            to make education more affordable and accessible for everyone.
          </p>

          <p>
            Instead of letting books collect dust, our platform helps you give
            them a second life by connecting with nearby readers.
          </p>
        </div>

        <div className="about-text">
          <h2>What We Do</h2>
          <p>
            Users can upload books, search nearby listings using location
            filters, send exchange requests, and even buy books at affordable
            prices.
          </p>

          <p>
            This platform is designed with modern technologies to ensure a fast
            and smooth user experience.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="about-features">
        <h2>Our Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Book Exchange</h3>
            <p>Exchange books easily with nearby users.</p>
          </div>

          <div className="feature-card">
            <h3>💰 Buy & Sell</h3>
            <p>Get books at affordable prices.</p>
          </div>

          <div className="feature-card">
            <h3>📍 Location Based</h3>
            <p>Find books in your city using pincode.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast & Simple</h3>
            <p>Clean UI with smooth user experience.</p>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to build a community where knowledge is shared, books
          are reused, and students save money while learning more.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <p>© 2026 Book Exchange Platform | Developed by Sachin</p>
      </footer>

    </div>
    </>
  );
}

export default About;