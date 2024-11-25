import * as redis from "redis";

import app from "./app";
import configs from "./config";

const loadRedis = () => {
  const redisClient = redis.createClient({
    url: `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`,
  });

  redisClient.on("error", function (error) {
    console.error("Error de conexión a Redis:", error);
  });

  app.set("redisClient", redisClient);
};

const onInit = () => {
  console.log(`Server running on ${configs.PORT}`);

  // Load Redis
  loadRedis();
};

app.listen(configs.PORT, onInit);
