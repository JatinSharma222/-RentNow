import express from 'express';
import Room from '../db/rooms.js'; // Import the Room model

const router = express.Router();

// Route to get all rooms
router.get('/auth/rooms', async (req, res) => {
  try {
    const rooms = await Room.find(); // Fetch all rooms from the database
    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No rooms found' }); // If no rooms found
    }
    res.status(200).json(rooms); // Return the list of rooms
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
});

export default router;
