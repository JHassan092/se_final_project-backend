import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  background_image: {
    type: String,
  },
  rating: {
    type: Number,
  },
  released: {
    type: String,
  },
});

favoriteSchema.index({ userId: 1, gameId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
