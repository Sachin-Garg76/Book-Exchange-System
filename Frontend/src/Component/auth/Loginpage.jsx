import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../Styles/auth.css";
import LandingPageNavbar from "../Navbar/LandingpageNav";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields are required ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful ✅");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/user");
      } else {
        alert(data.message || "Login Failed ❌");
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
        <form className="auth-box login-box" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email Address</label>
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

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn">
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account? <Link to="/register">Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
}