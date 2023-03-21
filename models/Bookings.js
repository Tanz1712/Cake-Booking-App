import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  cake: {
    type: mongoose.Types.ObjectId,
    ref: "Cake",
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Booking", bookingSchema);
