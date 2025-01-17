import { execSync } from "child_process";
import * as redis from "redis";

import request from "supertest";

import app from "./app";
import configs from "./config";

import { createServer } from "./tests/msw/server";
import { mockMe, mockProfile } from "./tests/jest.constants";

describe("app.ts", () => {
  beforeAll(() => {
    console.log("Starting Redis container...");
    try {
      // Levanta el contenedor Redis si no está corriendo
      execSync("docker-compose up -d redis", { stdio: "inherit" });
      console.log("Redis container is running!");

      console.log("Setting up Redis client...");
      const redisClient = redis.createClient({
        url: `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`,
      });

      app.set("redisClient", redisClient);
    } catch (error) {
      console.error("Error starting Redis container:", error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      console.log("Stopping Redis container...");

      // Detiene el contenedor Redis
      execSync("docker-compose down", { stdio: "inherit" });
      console.log("Redis container stopped!");
    } catch (e) {
      console.error("Error stopping Redis container:", e);
      return e;
    }
  });

  describe("Auth Route", () => {
    const PREFIX_AUTH = "/api/v1/auth";

    createServer([
      {
        path: "https://graph.instagram.com/me",
        method: "get",
        res: ({ request }) => {
          const url = new URL(request.url);
          const accessToken = url.searchParams.get("access_token");

          console.log(accessToken);
          return mockMe;
        },
      },
      {
        path: `https://graph.instagram.com/v19.0/${mockMe.id}`,
        method: "get",
        res: ({ request }) => {
          const url = new URL(request.url);
          const fields = url.searchParams.get("fields");
          const accessToken = url.searchParams.get("access_token");

          console.log(fields, accessToken);
          return mockProfile;
        },
      },
    ]);

    test("It should return an error message in case it does not have an access token.", async () => {
      const accessToken = configs.INSTAGRAM_USER_ACCESS_TOKEN;
      configs.INSTAGRAM_USER_ACCESS_TOKEN = "";

      const response = await request(app).get(`${PREFIX_AUTH}/user_id`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Generate your own access token.",
      });

      configs.INSTAGRAM_USER_ACCESS_TOKEN = accessToken;
    });

    describe(`${PREFIX_AUTH}/user_id`, () => {
      test("It should return a user id.", async () => {
        const response = await request(app).get(`${PREFIX_AUTH}/user_id`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          message: "Successfully found the user id.",
          data: { id: mockMe.id },
        });
      });
    });
  });

  describe("Instagram Route", () => {
    const PREFIX_INSTAGRAM = "/api/v1/instagram";

    createServer([
      {
        path: "https://graph.instagram.com/me",
        method: "get",
        res: ({ request }) => {
          const url = new URL(request.url);
          const accessToken = url.searchParams.get("access_token");

          console.log(accessToken);
          return mockMe;
        },
      },
      {
        path: `https://graph.instagram.com/v19.0/${mockMe.id}`,
        method: "get",
        res: ({ request }) => {
          const url = new URL(request.url);
          const fields = url.searchParams.get("fields");
          const accessToken = url.searchParams.get("access_token");

          console.log(fields, accessToken);
          return mockProfile;
        },
      },
    ]);

    test("It should return an error message in case it does not have an access token.", async () => {
      const accessToken = configs.INSTAGRAM_USER_ACCESS_TOKEN;
      configs.INSTAGRAM_USER_ACCESS_TOKEN = "";

      const response = await request(app).get(`${PREFIX_INSTAGRAM}/alive`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Generate your own access token.",
      });

      configs.INSTAGRAM_USER_ACCESS_TOKEN = accessToken;
    });

    test("It should return an error message in case it does not have an user id.", async () => {
      const redisClient = redis.createClient({
        url: `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`,
      });
      await redisClient.connect();
      const idUser = await redisClient.get("idUser");

      await redisClient.del(["idUser"]);

      const response = await request(app).get(`${PREFIX_INSTAGRAM}/alive`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message:
          "To run this endpoint you need a USER ID for that run v1/auth/user_id.",
      });

      await redisClient.set("idUser", idUser!);
      await redisClient.disconnect();
    });

    describe(`${PREFIX_INSTAGRAM}/alive`, () => {
      test("It should return the information from the api.", async () => {
        const response = await request(app).get(`${PREFIX_INSTAGRAM}/alive`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          author: "Diego Libonati",
          version: configs.API_VERSION,
        });
      });
    });

    describe(`${PREFIX_INSTAGRAM}/user/profile`, () => {
      test("It should return the user's profile.", async () => {
        const response = await request(app).get(
          `${PREFIX_INSTAGRAM}/user/profile`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          message: "Successfully found profile user.",
          data: mockProfile,
        });
      });
    });
  });
});
