import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller.js";
import protect from "../../../shared/middlewares/auth.middleware.js";
import validate from "../../../shared/middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register",validate(registerSchema),registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/me", protect, getProfile);

export default router;