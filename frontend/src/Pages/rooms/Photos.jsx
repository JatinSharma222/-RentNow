import React from "react";
import { useParams } from "react-router-dom";
import getSpecificRoom from "../../utils/getSpecificRoom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  if (!room) return <div>Photos not found</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Hide arrows on mobile
          dots: true
        }
      }
    ]
  };

  return (
    <div id="photos-container">
      <Slider {...settings} className="slick-slider">
        {room.images.map((image, index) => (
          <div key={index} className="slider-image-container">
            <img src={`http://localhost:3001${image}`} alt={`Room ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}