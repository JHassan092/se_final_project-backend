import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/userController.js";
import { updateCurrentUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, updateCurrentUser);

export default router;
