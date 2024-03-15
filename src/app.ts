import express from "express";
import * as redis from "redis";
import authRouter from "./routes/v1/authRoutes";
import instagramRouter from "./routes/v1/instagramRoutes";
import configs from "./config";

const app = express();
export const redisClient = redis.createClient({
  url: `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`,
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/instagram", instagramRouter);

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).json({ message: "Route not found" });
});

redisClient.on("error", function (error) {
  console.error("Error de conexión a Redis:", error);
});

export default app;
