import {
  MessagesSuccess,
  MessagesError,
  MessagesNot,
} from "@src/entities/constants";

export const MESSAGES_SUCCESS: MessagesSuccess = {
  getUserId: "Successfully found the user id.",
  getUserProfile: "Successfully found profile user.",
};

export const MESSAGES_NOT: MessagesNot = {
  foundRoute: "Route not found.",
  foundAccessToken: "Generate your own access token.",
  foundUserId:
    "To run this endpoint you need a USER ID for that run v1/auth/user_id.",
};

export const MESSAGES_ERROR: MessagesError = {
  generic: "Something went wrong!",
};
