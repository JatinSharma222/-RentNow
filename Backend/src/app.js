const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: ["http://localhost:3000", "https://rentnowjash.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Allow cookies and authentication headers
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Additional CORS Headers to Ensure Proper Handling
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
    console.log("MongoDB Connected");
}).catch((err) => {
    console.error("MongoDB Connection Error:", err);
});

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to RentNow Backend!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

