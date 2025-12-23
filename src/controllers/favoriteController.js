import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res) => {
  try {
    const { gameId, name, background_image, rating, released } = req.body;
    console.log("BODY RECIEVED:", req.body);

    if (!gameId) {
      return res.status(400).json({ message: "valid gameId is required" });
    }

    const favorite = await Favorite.create({
      userId: req.userId,
      gameId,
      name,
      background_image,
      rating,
      released,
    });

    res.status(201).json(favorite);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Game already favorited" });
    }

    console.error("Add favorite error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Favorite.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Game unfavorited" });
  } catch (err) {
    console.error("Remove favorite error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId });

    res.json(favorites);
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearAllFavorites = async (req, res) => {
  try {
    await Favorite.deleteMany({ userId: req.userId });
    res.json({ message: "All favorites cleared" });
  } catch (err) {
    console.error("Clear all error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
