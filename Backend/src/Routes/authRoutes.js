import express from 'express';
import bcrypt from 'bcrypt';
import User from '../db/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookie from 'cookie';

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Modified verification endpoint that supports token in headers
router.get('/verify', async (req, res) => {
  try {
    // Get token from authorization header or cookie
    let token;
    
    // Check Authorization header first (for cross-domain requests)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Check cookies as fallback (for same-domain requests)
      const cookies = cookie.parse(req.headers.cookie || '');
      token = cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ verified: false, message: 'No authentication token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Find the user to ensure they exist
    const user = await User.findOne({ email: decoded.email }).select('-password');
    
    if (!user) {
      return res.status(404).json({ verified: false, message: 'User not found' });
    }

    // Return successful verification
    res.status(200).json({ 
      verified: true,
      user: {
        email: decoded.email,
        userId: decoded.userId,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ verified: false, message: 'Invalid or expired token' });
  }
});

// Register route - updated to return token in response body too
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
      { expiresIn: '24h' } // Extended token life
    );

    // Set JWT token in HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None', // Changed to 'None' to allow cross-site requests
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    }));

    // Also return the token in the response body for frontend storage
    return res.status(201).json({ 
      message: "Registration successful",
      token: token  // Include token in response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Login route - updated to return token in response body too
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
      { expiresIn: '24h' } // Extended token life
    );

    // Set JWT token in HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None', // Changed to 'None' to allow cross-site requests
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    }));

    // Also return the token in the response body for frontend storage
    return res.status(200).json({ 
      message: "Login successful",
      token: token,  // Include token in response
      user: {
        email: user.email,
        name: user.name,
        userId: user._id
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    maxAge: 0,
    path: '/',
  }));
  
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;