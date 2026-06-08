import cors from "cors";
import express from "express";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import apiRoutes from "./modules/api-registry/routes/api.routes.js";
import userRoutes from "./modules/users/routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Graveyard Backend Running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/apis", apiRoutes);
app.use("/api/v1/users", userRoutes);

// Global error handler

export default app;
