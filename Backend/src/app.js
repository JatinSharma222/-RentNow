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

// CORS Configuration with proper origin handling
app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
        }
        return callback(null, true);
    },
    credentials: true // Allow cookies
}));

// Handle OPTIONS requests
app.options('*', cors());

// Set the Cross-Origin-Resource-Policy header
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Middleware
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