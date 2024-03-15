import { redisClient } from "../app";
import configs from "../config";
import {
  InstagramController as InstagramControllerT,
  User,
} from "../entities/entities";

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
    try {
      await redisClient.connect();

      const REDIS_INSTAGRAM_USER: User = JSON.parse(
        (await redisClient.get("user")) as string
      );
      const INSTAGRAM_ACCESS_TOKEN = await redisClient.get("access_token");

      const idUser = REDIS_INSTAGRAM_USER.id;

      const request = await fetch(
        `${configs.INSTAGRAM_API}/${configs.INSTAGRAM_API_VERSION}/${idUser}?fields=id,username,account_type,media_count&access_token=${INSTAGRAM_ACCESS_TOKEN}`
      );

      const profile: Pick<
        User,
        "id" | "username" | "account_type" | "media_count"
      > = await request.json();

      REDIS_INSTAGRAM_USER.username = profile.username;
      REDIS_INSTAGRAM_USER.account_type = profile.account_type;
      REDIS_INSTAGRAM_USER.media_count = profile.media_count;

      await redisClient.set("user", JSON.stringify(REDIS_INSTAGRAM_USER));

      await redisClient.disconnect();

      return res
        .status(200)
        .json({ message: "Successfully found profile user", data: profile });
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
