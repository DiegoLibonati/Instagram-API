import { NextFunction, Request, Response } from "express";
import { RedisClientType } from "redis";

import app from "../app";
import configs from "../config";

export type VerifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const verifyAccessToken: VerifyAccessToken = async (_, res, next) => {
  console.log("Init Access Token Middleware");

  const INSTAGRAM_USER_ACCESS_TOKEN = configs.INSTAGRAM_USER_ACCESS_TOKEN;

  if (!INSTAGRAM_USER_ACCESS_TOKEN)
    return res
      .status(401)
      .json({ message: "Genera tu propio access token" })
      .end();

  const redisClient: RedisClientType = app.get("redisClient");

  await redisClient.connect();

  const REDIS_INSTAGRAM_ACCESS_TOKEN = await redisClient.get("access_token");

  if (!REDIS_INSTAGRAM_ACCESS_TOKEN)
    await redisClient.set("access_token", INSTAGRAM_USER_ACCESS_TOKEN);

  await redisClient.disconnect();

  next();
};
