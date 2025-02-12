import React from "react";
import { useParams } from "react-router-dom";
import getSpecificRoom from "../../utils/getSpecificRoom";
import { useEffect, useState } from "react";

export default function Location() {

    const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getSpecificRoom(id);
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!room) return <div>Location not found</div>;

    return(
        <div id="location-container">
            <h1>{room.location + " " + room.fullAddress}</h1>
            <div id="map"></div>
        </div>
    )
}