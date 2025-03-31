import express from "express";
import Room from "../db/rooms.js"; // Import the Room model

const router = express.Router();

// Validate ObjectId middleware
function isValidObjectId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

// Route to get a specific room by ID
router.get("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Room ID format" });
    }

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch room", error: error.message });
  }
});

// Route to get specific info about a room by ID
router.get("/auth/rooms/:id/:infoType", async (req, res) => {
  try {
    const { id, infoType } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Room ID format" });
    }

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    switch (infoType) {
      case "description":
        return res.status(200).json({ description: room.description });
      case "photos":
        return res.status(200).json({ photos: room.photos });
      case "location":
        return res.status(200).json({ location: room.location });
      default:
        return res.status(400).json({ message: "Invalid info type" });
    }
  } catch (error) {
    console.error("Error fetching room info:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch room info", error: error.message });
  }
});

export default router;
