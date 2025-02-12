import React from "react";
import { useParams } from "react-router-dom";
import getSpecificRoom from "../../utils/getSpecificRoom";
import { useEffect, useState } from "react";

export default function Description() {
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
  if (!room) return <div>Description not found</div>;

  return (
    <div id="description-container">
      <ul>
        <li>
          Type: <span>{room.type}</span>
        </li>
        <li>
          Description: <span>{room.description}</span>
        </li>
        <li>
          Price: <span>{room.price}Rs/Per-night</span>
        </li>
      </ul>
    </div>
  );
}
