import express from 'express';
import jwt from 'jsonwebtoken';
import Room from '../db/rooms.js';

const router = express.Router();

// Middleware to extract user from JWT
const authenticateUser = (req) => {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.email;
  } catch (error) {
    return null;
  }
};

// Route to get ALL rooms (no authentication required)
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No rooms available' });
    }
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
});

// Route to get only the rooms of the logged-in user (authentication required)
router.get('/auth/rooms', async (req, res) => {
  try {
    const userEmail = authenticateUser(req);
    if (!userEmail) return res.status(401).json({ message: 'Unauthorized' });

    const rooms = await Room.find({ host: userEmail });
    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No rooms found for this user' });
    }
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
});

export default router;
