import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], 
      required: true,
      validate: {
        validator: (v) => v.length > 0, // Ensures at least one image URL is provided
        message: "At least one image URL is required",
      },
    },
    description: {
      type: String,
      required: true,
      minlength: 50,
    },
    location: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    fullAddress: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
