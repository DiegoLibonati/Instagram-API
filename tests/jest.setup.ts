jest.mock("@src/config", () => ({
  PORT: 5000,
  API_VERSION: "0.0.1",
  INSTAGRAM_API: "https://graph.instagram.com",
  INSTAGRAM_API_VERSION: "v19.0",
  INSTAGRAM_SECRET_CLIENT: "secret_test",
  INSTAGRAM_USER_ACCESS_TOKEN: "fake_token_for_tests",
  REDIS_HOST: "host.docker.internal",
  REDIS_PORT: "6379",
}));
