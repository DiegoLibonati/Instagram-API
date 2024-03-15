import { redisClient } from "../app";
import configs from "../config";
import { VerifyAccessToken } from "../entities/entities";

export const verifyAccessToken: VerifyAccessToken = async (req, res, next) => {

  console.log("Init Access Token Middleware")

  const INSTAGRAM_USER_ACCESS_TOKEN = configs.INSTAGRAM_USER_ACCESS_TOKEN;

  if (!INSTAGRAM_USER_ACCESS_TOKEN)
    return res
      .status(401)
      .json({ message: "Genera tu propio access token" })
      .end();

  await redisClient.connect();

  const REDIS_INSTAGRAM_ACCESS_TOKEN = await redisClient.get("access_token");

  if (!REDIS_INSTAGRAM_ACCESS_TOKEN)
    await redisClient.set("access_token", INSTAGRAM_USER_ACCESS_TOKEN);

  await redisClient.disconnect()

  next();
};
