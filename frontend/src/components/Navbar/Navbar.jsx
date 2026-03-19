import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">📦 PrepBox</Link>
      <ul className="navbar-links">
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
        <li><Link to="/questions" className={location.pathname === "/questions" ? "active" : ""}>Questions</Link></li>
        <li><Link to="/experiences" className={location.pathname === "/experiences" ? "active" : ""}>Experiences</Link></li>
        {user ? (
          <li className="navbar-user">
            <span className="navbar-username">👤 {user.username}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li><Link to="/auth" className={location.pathname === "/auth" ? "active" : ""}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
}
