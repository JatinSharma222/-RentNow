import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import getRooms from '../../utils/getRooms';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Get filter type from URL params
    const typeFilter = searchParams.get("type");

    const activeStyles = {
        textDecoration: "underline",
        color: "#A85D28",
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getRooms();
                setRooms(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handleFilterChange = (key, value) => {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        });
    };

    // Filter rooms based on type
    const displayedRooms = typeFilter
        ? rooms.filter(room => room.type.toLowerCase() === typeFilter.toLowerCase())
        : rooms;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='rooms-container'>
            {/* Filter Buttons */}
            <div className="room-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "cabin")}
                    style={typeFilter === "cabin" ? activeStyles : null}
                >
                    Cabin's
                </button>
                <button
                    onClick={() => handleFilterChange("type", "villa")}
                    style={typeFilter === "villa" ? activeStyles : null}
                >
                    Villa's
                </button>
                <button
                    onClick={() => handleFilterChange("type", "Farm House")}
                    style={typeFilter === "Farm House" ? activeStyles : null}
                >
                    Farm-House's
                </button>
                {typeFilter && (
                    <button onClick={() => handleFilterChange("type", null)}>
                        Clear filter
                    </button>
                )}
            </div>

            {/* Display rooms without empty spaces when filtering */}
            <div className="rooms-list">
                {displayedRooms.length === 0 ? (
                    <div>No rooms available at the moment.</div>
                ) : (
                    displayedRooms.map((room) => (
                        <div className='room' key={room._id}>
                            <div className="room-info">
                                <span className='room-badge'>
                                    {room.isAvailable ? "Available" : "Not Available"}
                                </span>
                                <img alt='room-image' src={`https://rentnow-fylj.onrender.com${room.images[0]}`} />
                                <div className='secondary-room-info'>
                                    <span>Type: {room.type}</span>
                                    <span>Price: {room.price}Rs/Per-night</span>
                                    <span>Location: {room.location}</span>
                                    <Link 
                                        className='room-detail'
                                        to={`/rooms/${room._id}/description`}
                                        state={{
                                            search: `?${searchParams.toString()}`,
                                            type: typeFilter
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

