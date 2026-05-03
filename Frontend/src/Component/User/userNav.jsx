import { Link, useNavigate } from "react-router-dom";
import "./Styles/UserNav.css";

export default function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Boox Exchange</h2>

      <div className="nav-right">
        <Link to="/user">Home</Link>
        <Link to="/mybooks">My Books</Link>
        <Link to="/requests">Requests</Link>

        <Link to="/addbook">
          <button className="add-btn">+ Add Book</button>
        </Link>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}