import Router from "express";

import { InstagramController } from "@src/controllers/instagram.controller";

import { verifyIdUser } from "@src/middlewares/verify_id_user.middleware";
import { verifyAccessToken } from "@src/middlewares/verify_access_token.middleware";

const router = Router();

router.get(
  "/alive",
  verifyAccessToken,
  verifyIdUser,
  InstagramController.alive
);
router.get(
  "/user/profile",
  verifyAccessToken,
  verifyIdUser,
  InstagramController.userProfile
);

export default router;
