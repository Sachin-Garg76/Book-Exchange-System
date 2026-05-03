import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../Styles/Singnup.css";
import LandingPageNavbar from "../Navbar/LandingpageNav";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: ""
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

    if (!form.name || !form.email || !form.password) {
      alert("Name, Email & Password required ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account Created Successfully ✅");
        navigate("/login");
      } else {
        alert(data.message || "Signup Failed ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LandingPageNavbar />

      <div className="auth-container">
        <form className="auth-box large" onSubmit={handleSubmit}>
          <h2>Register</h2>

          <div className="form-grid">

            {/* NAME */}
            <div className="input-group">
              <label>Name</label>
              <div className="input-field">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label>Email</label>
              <div className="input-field">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* PHONE */}
            <div className="input-group">
              <label>Phone</label>
              <div className="input-field">
                <FaPhone />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* ADDRESS FULL WIDTH */}
            <div className="input-group full">
              <label>Address</label>
              <div className="input-field">
                <FaMapMarkerAlt />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>

          <button className="register-btn" type="submit">
            {loading ? "Creating..." : "Register"}
          </button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}