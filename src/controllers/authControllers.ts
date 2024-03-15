import { redisClient } from "../app";
import configs from "../config";
import {
  AuthController as AuthControllerT,
  User as UserT,
} from "../entities/entities";
import { User } from "../models/User";

export const AuthController: AuthControllerT = {
  getUserId: async (_, res) => {
    await redisClient.connect();

    const INSTAGRAM_ACCESS_TOKEN = await redisClient.get("access_token");

    try {
      const request = await fetch(
        `${configs.INSTAGRAM_API}/me?access_token=${INSTAGRAM_ACCESS_TOKEN}`
      );

      const user: Pick<UserT, "id"> = await request.json();

      const userModel = new User(user.id, "", "", 0);

      await redisClient.set("user", JSON.stringify(userModel.createUser()));

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
