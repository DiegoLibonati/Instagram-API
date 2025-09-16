import { NextFunction, Request, Response } from "express";
import { RedisClientType } from "redis";

import app from "@src/app";

export type VerifyIdUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const verifyIdUser: VerifyIdUser = async (_, res, next) => {
  console.log("Init ID USER Middleware");

  const redisClient: RedisClientType = app.get("redisClient");

  await redisClient.connect();

  const REDIS_INSTAGRAM_USER_ID = await redisClient.get("idUser");

  if (!REDIS_INSTAGRAM_USER_ID) {
    await redisClient.disconnect();
    return res
      .status(401)
      .json({
        message:
          "To run this endpoint you need a USER ID for that run v1/auth/user_id.",
      })
      .end();
  }

  await redisClient.disconnect();
  next();
};
