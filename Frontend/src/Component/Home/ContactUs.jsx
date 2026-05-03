import React, { useState } from "react";
import LandingPageNavbar from "../Navbar/LandingpageNav";
import "../../Styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message Sent Successfully ✅");

        setForm({
          name: "",
          email: "",
          message: ""
        });
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LandingPageNavbar />

      <div className="contact-container">
        <div className="contact-box">

          <h2>Contact Us 📩</h2>
          <p>Have any questions? We'd love to hear from you!</p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="contact-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}