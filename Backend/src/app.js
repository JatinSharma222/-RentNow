import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: ["http://localhost:3000", "https://rentnowjash.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Additional CORS Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://rentnowjash.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to RentNow Backend!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

