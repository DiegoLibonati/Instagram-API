import request from "supertest";

import app from "@src/app";

import { envs } from "@src/config/env.config";
import redisClient from "@src/config/redis.config";

import { SessionService } from "@src/services/session.service";

import {
  MESSAGES_NOT,
  MESSAGES_SUCCESS,
} from "@src/constants/messages.constant";
import { CODES_NOT, CODES_SUCCESS } from "@src/constants/codes.constant";

import { createServer } from "@tests/msw/server";
import { mockMe, mockProfile } from "@tests/jest.constants";

describe("app.ts", () => {
  beforeAll(async () => {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  });

  afterAll(async () => {
    if (redisClient.isOpen) {
      await redisClient.disconnect();
    }
  });

  describe("Auth Route", () => {
    const PREFIX_AUTH = "/api/v1/auth";

    createServer([
      {
        path: "https://graph.instagram.com/me",
        method: "get",
        res: () => mockMe,
      },
      {
        path: `https://graph.instagram.com/v19.0/${mockMe.id}`,
        method: "get",
        res: () => mockProfile,
      },
    ]);

    test("It should return an error message in case it does not have an access token.", async () => {
      const accessToken = envs.INSTAGRAM_USER_ACCESS_TOKEN;

      envs.INSTAGRAM_USER_ACCESS_TOKEN = "";

      const response = await request(app).get(`${PREFIX_AUTH}/user_id`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        code: CODES_NOT.foundAccessToken,
        message: MESSAGES_NOT.foundAccessToken,
      });

      envs.INSTAGRAM_USER_ACCESS_TOKEN = accessToken;
    });

    describe(`${PREFIX_AUTH}/user_id`, () => {
      test("It should return a user id.", async () => {
        const response = await request(app).get(`${PREFIX_AUTH}/user_id`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          code: CODES_SUCCESS.getUserId,
          message: MESSAGES_SUCCESS.getUserId,
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
        res: () => mockMe,
      },
      {
        path: `https://graph.instagram.com/v19.0/${mockMe.id}`,
        method: "get",
        res: () => mockProfile,
      },
    ]);

    test("It should return an error message in case it does not have an access token.", async () => {
      const accessToken = envs.INSTAGRAM_USER_ACCESS_TOKEN;

      envs.INSTAGRAM_USER_ACCESS_TOKEN = "";

      const response = await request(app).get(`${PREFIX_INSTAGRAM}/alive`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        code: CODES_NOT.foundAccessToken,
        message: MESSAGES_NOT.foundAccessToken,
      });

      envs.INSTAGRAM_USER_ACCESS_TOKEN = accessToken;
    });

    test("It should return an error message in case it does not have an user id.", async () => {
      const idUser = await SessionService.getUserId();

      await SessionService.deleteUserId();

      const response = await request(app).get(`${PREFIX_INSTAGRAM}/alive`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        code: CODES_NOT.foundUserId,
        message: MESSAGES_NOT.foundUserId,
      });

      await SessionService.setUserId(idUser!);
    });

    describe(`${PREFIX_INSTAGRAM}/alive`, () => {
      test("It should return the information from the api.", async () => {
        const response = await request(app).get(`${PREFIX_INSTAGRAM}/alive`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          author: "Diego Libonati",
          version: envs.API_VERSION,
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
          code: CODES_SUCCESS.getUserProfile,
          message: MESSAGES_SUCCESS.getUserProfile,
          data: mockProfile,
        });
      });
    });
  });
});
