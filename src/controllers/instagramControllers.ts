import { Request, Response } from "express";
import { RedisClientType } from "redis";

import app from "../app";
import configs from "../config";
import { User } from "../models/User";

export type InstagramControllerT = {
  alive: (req: Request, res: Response) => Response;
  userProfile: (req: Request, res: Response) => Promise<Response>;
};

export const InstagramController: InstagramControllerT = {
  alive: (_, res) => {
    try {
      return res
        .status(200)
        .json({ author: "Diego Libonati", version: configs.API_VERSION });
    } catch (e: unknown) {
      if (typeof e === "string") {
        return res.status(400).send({ error: e.toUpperCase() });
      } else if (e instanceof Error) {
        return res.status(400).send({ error: e.message, name: e.name });
      }

      return res.status(400).send({ error: e });
    }
  },
  userProfile: async (_, res) => {
    const redisClient: RedisClientType = app.get("redisClient");
    await redisClient.connect();

    const REDIS_INSTAGRAM_USER_ID: string = JSON.parse(
      (await redisClient.get("idUser")) as string
    );
    const INSTAGRAM_ACCESS_TOKEN = (await redisClient.get(
      "access_token"
    )) as string;

    try {
      const request = await fetch(
        `${configs.INSTAGRAM_API}/${configs.INSTAGRAM_API_VERSION}/${REDIS_INSTAGRAM_USER_ID}?fields=id,username,account_type,media_count&access_token=${INSTAGRAM_ACCESS_TOKEN}`
      );

      const profile: Pick<
        User,
        "id" | "username" | "account_type" | "media_count"
      > = await request.json();

      const user = new User(
        profile.id,
        profile.username,
        profile.account_type,
        profile.media_count
      );

      await redisClient.set("user", user.userStringify());

      await redisClient.disconnect();

      return res
        .status(200)
        .json({ message: "Successfully found profile user.", data: profile });
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
