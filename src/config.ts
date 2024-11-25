import * as dotenv from "dotenv";

import { Configs } from "./entities/entities";

dotenv.config();

const configs: Configs = {
  PORT: Number(process.env.PORT) || 5000,
  API_VERSION: "0.0.1",
  INSTAGRAM_API: process.env.INSTAGRAM_API || "https://graph.instagram.com",
  INSTAGRAM_API_VERSION: process.env.INSTAGRAM_API_VERSION || "v19.0",
  INSTAGRAM_SECRET_CLIENT: process.env.INSTAGRAM_SECRET_CLIENT || "",
  INSTAGRAM_USER_ACCESS_TOKEN: process.env.INSTAGRAM_USER_ACCESS_TOKEN || "",
  REDIS_HOST: process.env.REDIS_HOST || "host.docker.internal",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
};

export default configs;
