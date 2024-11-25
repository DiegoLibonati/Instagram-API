import { RedisClientType } from "redis";
import { Request, Response } from "express";

import app from "../app";
import configs from "../config";

export type AuthControllerT = {
  getUserId: (req: Request, res: Response) => Promise<Response>;
};

export const AuthController: AuthControllerT = {
  getUserId: async (_, res) => {
    const redisClient: RedisClientType = app.get("redisClient");

    await redisClient.connect();

    const INSTAGRAM_ACCESS_TOKEN = await redisClient.get("access_token");

    try {
      const request = await fetch(
        `${configs.INSTAGRAM_API}/me?access_token=${INSTAGRAM_ACCESS_TOKEN}`
      );

      const user: { id: string } = await request.json();

      const idUser = user.id;

      await redisClient.set("idUser", idUser);

      await redisClient.disconnect();

      return res
        .status(200)
        .json({ message: "Successfully found the user id", data: user });
    } catch (e: unknown) {
      await redisClient.disconnect();
      if (typeof e === "string") {
        return res.status(400).send({ error: e.toUpperCase() });
      } else if (e instanceof Error) {
        return res.status(400).send({ error: e.message, name: e.name });
      }

      return res.status(400).send({ error: e });
    }
  },
};
