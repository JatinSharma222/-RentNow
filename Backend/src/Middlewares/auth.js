// Middleware for authentication
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const authenticate = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || ''); // Parse cookies from the request

  const token = cookies.jwt; // Get JWT from the cookie

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Allow the request to proceed to the next middleware/route handler
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


export default authenticate
