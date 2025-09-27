import redisClient from "@src/config/redis.config";

export const RedisDAO = {
  getValue: async (key: string) => redisClient.get(key),
  setValue: async (key: string, value: string) => redisClient.set(key, value),
  deleteKey: async (key: string) => redisClient.del(key),
};
