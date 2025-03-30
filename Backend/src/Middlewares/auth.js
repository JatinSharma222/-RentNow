import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookie from 'cookie';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
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
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Add user data to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticate;