import express from 'express';
import bcrypt from 'bcrypt';
import User from '../db/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookie from 'cookie';
import { authenticate } from '../Middlewares/auth.js'; // Import the authenticate middleware

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Add verification endpoint
router.get('/verify', authenticate, (req, res) => {
  // If authenticate middleware passes, user is authenticated
  res.status(200).json({ 
    verified: true,
    user: {
      email: req.user.email,
      userId: req.user.userId
    }
  });
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Set JWT token in HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use 'true' in production for HTTPS
      sameSite: 'Strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    }));

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Set JWT token in HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60,
      path: '/',
    }));

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default router;
