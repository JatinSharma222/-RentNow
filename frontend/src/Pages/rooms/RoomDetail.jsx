import React, { useState, useEffect } from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';
import getSpecificRoom from '../../utils/getSpecificRoom';

// Default to production URL if environment variable is not set
const API_URL = process.env.REACT_APP_API_URL || 'https://rentnow-backend.onrender.com';

export default function RoomDetail() {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading room details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Room not found</p>
      </div>
    );
  }

  return (
    <div className="room-detail-container">
      <h1 className="room-title">{room.type}</h1>
      
      <div className="room-price">
        <span>₹{room.price}</span>/night
      </div>
      
      <div className="room-nav">
        <NavLink 
          to={`/rooms/${id}/description`} 
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Description
        </NavLink>
        <NavLink 
          to={`/rooms/${id}/photos`} 
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Photos
        </NavLink>
        <NavLink 
          to={`/rooms/${id}/location`} 
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Location
        </NavLink>
      </div>
      
      <div className="room-content">
        <Outlet context={{ room }} />
      </div>
    </div>
  );
}