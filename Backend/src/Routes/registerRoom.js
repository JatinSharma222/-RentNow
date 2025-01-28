import express from 'express';
import Room from '../db/rooms.js';

const router = express.Router();

// Register the Room Route
router.post('/registerRoom', async (req, res) => {
    const { type, price, images, description, location, isAvailable, fullAddress } = req.body; 

    try {
        const newRoom = new Room({
            type,
            price,
            images,
            description,
            location,
            isAvailable,
            fullAddress,
        });

        await newRoom.save();

        res.status(201).json({ message: "Room is successfully registered" });
    } catch (error) {
        console.error("Registration Error: ", error);
        res.status(500).json({ message: "Failed to register room", error: error.message });
    }
});

export default router;
