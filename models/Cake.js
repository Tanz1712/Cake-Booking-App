import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  flavours: [{ type: String, required: true }],
  description: {
    type: String,
    required: true,
  },
  celebratedOn: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
    },
  ],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Cake", cakeSchema);
