export type MessagesSuccess = {
  getUserId: string;
  getUserProfile: string;
};

export type MessagesNot = {
  foundRoute: string;
  foundAccessToken: string;
  foundUserId: string;
};

export type MessagesError = {
  generic: string;
};

export type CodesSuccess = {
  getUserId: "SUCCESS_GET_USER_ID";
  getUserProfile: "SUCCESS_GET_USER_PROFILE";
};

export type CodesNot = {
  foundRoute: "NOT_FOUND_ROUTE";
  foundAccessToken: "NOT_FOUND_ACCESS_TOKEN";
  foundUserId: "NOT_FOUND_USER_ID";
};

export type CodesError = {
  generic: "ERROR_GENERIC";
};
