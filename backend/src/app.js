import express from "express";
import authRoutes from "./modules/auth/routes/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Graveyard Backend Running",
  });
});

app.use("/api/v1/auth", authRoutes);


export default app;