import Router from "express";

import { InstagramController } from "@src/controllers/instagramControllers";
import { verifyIdUser } from "@src/middlewares/verifyIdUser";
import { verifyAccessToken } from "@src/middlewares/verifyAccessToken";

const instagramRouter = Router();

instagramRouter
  .get("/alive", verifyAccessToken, verifyIdUser, InstagramController.alive)
  .get(
    "/user/profile",
    verifyAccessToken,
    verifyIdUser,
    InstagramController.userProfile
  );

export default instagramRouter;
