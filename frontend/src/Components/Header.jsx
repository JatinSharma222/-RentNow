import React from "react";
import { Link, NavLink } from "react-router-dom";
import avatar from "../Assets/images/avatar-icon.png";
import loggedavatar from "../Assets/images/logged-Icon.png";
import { useAuth } from "../utils/AuthContext"

export default function Header() {
  const { isLoggedIn } = useAuth();

  const activeStyles = {
    textDecoration: "underline",
    color: "#A85D28",
  };

  return (
    <>
      <header>
        <Link className="site-logo" to="/">
          #<span>RentNow</span>
        </Link>
        <nav className="nav-bar">
          <NavLink
            to="host"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Host
          </NavLink>
          <NavLink
            to="about"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            About
          </NavLink>
          <NavLink
            to="rooms"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Rooms
          </NavLink>
          <Link to={isLoggedIn ? "/profile" : "/login"} className="login-link">
            <img
              src={isLoggedIn ? loggedavatar : avatar}
              alt={isLoggedIn ? "Profile Icon" : "Login Icon"}
              className="login-icon"
            />
          </Link>
        </nav>
      </header>
      <hr className="header-divider" />
    </>
  );
}
