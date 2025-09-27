import { User } from "@src/entities/app";

import { RedisDAO } from "@src/daos/redis.dao";

export const SessionService = {
  getUserId: async () => RedisDAO.getValue("idUser"),
  getAccessToken: async () => RedisDAO.getValue("access_token"),
  getUser: async () => RedisDAO.getValue("user"),
  setUserId: async (idUser: string) => RedisDAO.setValue("idUser", idUser),
  setAccessToken: async (accessToken: string) =>
    RedisDAO.setValue("access_token", accessToken),
  setUser: async (user: User) =>
    RedisDAO.setValue("user", JSON.stringify(user)),
  deleteUserId: async () => RedisDAO.deleteKey("idUser"),
};
