import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addFavorite,
  removeFavorite,
  getFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorite);
router.delete("/:gameId", authMiddleware, removeFavorite);

export default router;
