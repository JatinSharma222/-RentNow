import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, NavLink, Outlet } from "react-router-dom";
import getSpecificRoom from "../../utils/getSpecificRoom";

export default function RoomDetail() {
  const location = useLocation();
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const data = await getSpecificRoom(id);
        setRoom(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching room details:', err);
        setError(err.message || 'Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomData();
    }
  }, [id]);

  if (loading) return <div>Loading Room Details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!room) return <div>Room not found</div>;

  // Get the filter state from the previous page
  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  const activeStyles = {
    textDecoration: "underline",
    color: "#A85D28",
  };

  return (
    <>
      {/* Back button with filter memory */}
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} rooms</span>
      </Link>
      
      <div className="room-detail-container">
        <h3 className="room-detail-title">#HostName</h3>
        <img
          className="room-detail-image"
          alt="room-image"
          src={`https://rentnow-fylj.onrender.com${room.images[0]}`}
        />
        <Link className="rent-button" to="#">
          {room.isAvailable ? "Rent Room" : "Notify Me"}
        </Link>
      </div>
      <hr className="line" />

      <div className="room-info-container">
        <nav className="secondary-nav-bar">
          <NavLink to="description" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Description
          </NavLink>
          <NavLink to="photos" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Photos
          </NavLink>
          <NavLink to="location" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Location
          </NavLink>
        </nav>

        <div id="room-detail-info">
          <Outlet />
        </div>
      </div>
    </>
  );
}

