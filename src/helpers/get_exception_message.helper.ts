import { GetExceptionInformation } from "@src/entities/helpers";

import { CODES_ERROR } from "@src/constants/codes.constant";
import { MESSAGES_ERROR } from "@src/constants/messages.constant";

export const getExceptionMessage = (e: unknown): GetExceptionInformation => {
  return { code: CODES_ERROR.generic, message: MESSAGES_ERROR.generic };
};
