import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res) => {
  try {
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({ message: "valid gameId is required" });
    }

    const favorite = await Favorite.create({
      userId: req.userId,
      gameId,
    });

    res.status(201).json({
      message: "Game added to favorites",
      favorite,
    });
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
    const { gameId } = req.params;

    const deleted = await Favorite.findOneAndDelete({
      userId: req.userId,
      gameId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Game not favorited or already unfavorited" });
    }

    res.json({ message: "Favorite removed" });
  } catch (err) {
    console.error("Remove favorite error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFavorite = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId });

    res.json({ favorites });
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
