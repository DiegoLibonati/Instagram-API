// ### TYPES ###
export type Configs = {
  PORT: number;
  INSTAGRAM_API: string;
  INSTAGRAM_API_VERSION: string;
  INSTAGRAM_SECRET_CLIENT: string;
  INSTAGRAM_USER_ACCESS_TOKEN: string;
  API_VERSION: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
};

export type User = {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
};
