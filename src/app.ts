import express from "express";

import authRouter from "./routes/v1/authRoutes";
import instagramRouter from "./routes/v1/instagramRoutes";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/instagram", instagramRouter);

app.use((_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).json({ message: "Route not found" });
});

export default app;
