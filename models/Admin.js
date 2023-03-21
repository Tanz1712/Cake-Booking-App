import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  addedCakes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cake",
    },
  ],
});

export default mongoose.model("Admin", adminSchema);
