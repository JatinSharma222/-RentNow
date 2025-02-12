import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-image-container">
        <div className="hero-text-container">
          <h1 className="hero-heading">
            Beyond Short Stays, Into New Beginnings – Choose{" "}
            <span>#RentNow</span>!
          </h1>
          <h3 className="hero-subheading">
            Host, Rent, Stay – The Choice is Yours...
          </h3>
        </div>
        <Link className="home-action-button" to="/rooms">Explore Now</Link>
      </div>
    </div>
  );
}
