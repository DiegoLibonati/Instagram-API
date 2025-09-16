import Router from "express";

import { AuthController } from "@src/controllers/authControllers";
import { verifyAccessToken } from "@src/middlewares/verifyAccessToken";

const authRouter = Router();

authRouter.get("/user_id", verifyAccessToken, AuthController.getUserId);

export default authRouter;
