import Router from "express";

import { InstagramController } from "../../controllers/instagramControllers";
import { verifyIdUser } from "../../middlewares/verifyIdUser";
import { verifyAccessToken } from "../../middlewares/verifyAccessToken";

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
