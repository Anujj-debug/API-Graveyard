import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller.js";
import protect from "../../../shared/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getProfile);

export default router;