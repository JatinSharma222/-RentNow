import express from 'express';
import authenticate from '../Middlewares/auth.js';
import User from '../db/user.js'
import Room from '../db/rooms.js'

const router = express.Router();

// Middleware for logging
const logger = (req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
};

// Use logging middleware for all routes
router.use(logger);

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Home Page' });
});

router.get('/about', (req, res) => {
  res.json({ message: 'Welcome to #RentNow, your ultimate destination for finding or offering the perfect room! Unlike traditional platforms, we empower you to dream beyond the short term. Whether you’re searching for a cozy retreat for a week or a place to call home for years, #RentNow bridges the gap with flexible, long-term rental options and convenient monthly payments. Hosts can list their spaces with ease, and renters can explore a world of possibilities—because your next adventure shouldn’t be limited by time. At #RentNow, we’re reimagining the way you rent, making it seamless, secure, and tailored to your life. Ready to move in? Let’s make it happen!' });
});

// Protected routes
router.get('/host', authenticate, async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: 'Unauthorized - No user email found' });
    }

    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const rooms = await Room.find({ host: userEmail });

    res.json({
      user,
      hostedRooms: rooms  
    });
  } catch (error) {
    console.error('Error in /host route:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/profile', authenticate, async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: 'Unauthorized - No user email found' });
    }

    const userEmail = req.user.email;

    // Fetch user details from the database (excluding password for security)
    const user = await User.findOne({ email: userEmail }).select('email phone _id');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the response with email, phone, and ID
    res.json({
      email: user.email,
      phone: user.phone,
      id: user._id
    });

  } catch (error) {
    console.error('Error in /profile route:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


export default router;
