import express from "express";
import { createAPI, getAllAPIs, getSingleAPI } from "../controllers/api.controller.js";
import protect from "../../../shared/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllAPIs);
router.get("/:id", getSingleAPI);
router.post("/", protect, createAPI);

export default router;