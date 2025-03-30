import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db.js";
import authRoutes from "./Routes/authRoutes.js";
import router from "./Routes/routes.js";
import registerRoomRouter from './Routes/registerRoom.js';
import getAllRoomsRouter from './Routes/getAllRooms.js';
import getSpecificRoomRouter from './Routes/getSpecificRoom.js';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDB();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://rentnowjash.netlify.app'
];

// Basic CORS configuration
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Handle OPTIONS requests explicitly
app.options('*', (req, res) => {
  // Get origin from request
  const origin = req.headers.origin;
  
  // Check if origin is allowed
  if (allowedOrigins.includes(origin)) {
    // Set CORS headers
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    
    // Respond with 200 OK
    res.status(200).end();
  } else {
    // Not an allowed origin
    res.status(403).end();
  }
});

// Middleware to ensure CORS headers are set on every response
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  // Set the Cross-Origin-Resource-Policy header
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  
  next();
});

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/auth", authRoutes);
app.use("/", router);
app.use(registerRoomRouter);
app.use(getAllRoomsRouter);
app.use(getSpecificRoomRouter);

// Default Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    status: "healthy",
  });
});

// Error Handlers
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Ensure CORS headers are set even on error responses
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;