import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  clearAllFavorites,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorites);
router.delete("/", authMiddleware, clearAllFavorites);
router.delete("/:id", authMiddleware, removeFavorite);

export default router;
