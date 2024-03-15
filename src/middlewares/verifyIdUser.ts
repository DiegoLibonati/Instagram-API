import { redisClient } from "../app";
import { VerifyIdUser } from "../entities/entities";

export const verifyIdUser: VerifyIdUser = async (req, res, next) => {
  console.log("Init ID USER Middleware");

  await redisClient.connect();

  const REDIS_INSTAGRAM_USER = await redisClient.get("user");

  if (!REDIS_INSTAGRAM_USER) {
    await redisClient.disconnect();
    return res
      .status(401)
      .json({
        message:
          "Para ejecutar este endpoint necesitas un ID USER para eso ejecuta v1/auth/user_id",
      })
      .end();
  }

  await redisClient.disconnect();
  next();
};
