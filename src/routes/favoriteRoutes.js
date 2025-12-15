import express from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favoriteController";

const router = express.Router();

router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorite);
router.delete("/:gameId", authMiddleware, removeFavorite);

export default router;
