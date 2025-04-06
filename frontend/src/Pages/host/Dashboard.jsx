import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

// Default to production URL if environment variable is not set
const API_URL = process.env.REACT_APP_API_URL || 'https://rentnow-backend.onrender.com';

export default function Dashboard() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!token) {
                    throw new Error('Please login to access this page');
                }

                const res = await fetch(`${API_URL}/host`, {  
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include',
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error('Please login to access this page');
                    }
                    const errorData = await res.text();
                    console.error('Raw response:', errorData);
                    throw new Error(`Server error: ${res.status}`);
                }

                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await res.text();
                    console.error('Received non-JSON response:', text);
                    throw new Error('Received non-JSON response from server');
                }

                const userData = await res.json();
                setUser(userData.user);
                setRooms(userData.hostedRooms || []);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to fetch data');
                if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
                    setError('Unable to connect to the server. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        }).replace(',', ''); 
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">
                    <h2 className="text-xl font-bold">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">
                Welcome, <span>#</span>{user?.name || 'Guest'}
            </h1>
            <Link to="#" className="host-button">Host Now</Link>
            
            {rooms.length === 0 ? (
                <div id="room-not-found">
                    <p>No rooms found for your account.</p>
                </div>
            ) : (
                <div className="dashboard-rooms">
                    {rooms.map(room => (
                        <div 
                            key={room._id}
                            className="dashboard-room"
                        >
                            <span className="dashboard-room-badge">{room.isAvailable ? "Vacant" : "Booked"}</span>
                            <img 
                                className='dashboard-image' 
                                alt="Room" 
                                src={room.images && room.images[0] ? 
                                    room.images[0].startsWith('http') ? 
                                        room.images[0] : 
                                        `${API_URL}${room.images[0]}` 
                                    : 
                                    '#'} 
                            />
                            <h3><span>Type: </span>{room.type}</h3>
                            <h3><span>Price: </span>{room.price} Rs/Per-night</h3>
                            <h3><span>Uploaded Date: </span>{formatDate(room.createdAt)}</h3>
                            <h3><span>Edited Date: </span>{formatDate(room.updatedAt)}</h3>
                            <Link to="#" className="edit-button">Edit</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}