import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const uri = process.env.MONGODB_URI
export async function connectDB() {
  try {
    // Connect using mongoose for better integration with your models
    await mongoose.connect(uri, {
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if unable to connect
  }
}
