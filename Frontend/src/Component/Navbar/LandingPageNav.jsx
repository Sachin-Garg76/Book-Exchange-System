import { Link, useNavigate } from "react-router-dom";
import "../../Styles/LandingNav.css";

export default function LandingPageNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">📚 Boox Exchange</div>

      <div className="nav-right">
        <div className="nav-links">
          <Link to="/" className="link">Home</Link>
          <Link to="/about" className="link">About</Link>
          <Link to="/contact" className="link">Contact</Link>

          {!token ? (
            <>
              <Link to="/login" className="link">Login</Link>
              <Link to="/register" className="btn-outline">Register</Link>
            </>
          ) : (
            <>
              <Link to="/user" className="link">Dashboard</Link>
              <Link to="/addbook" className="btn-primary">+ Add Book</Link>
              <Link to="/requests" className="link">Requests</Link>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}