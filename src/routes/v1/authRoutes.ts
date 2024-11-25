import Router from "express";

import { AuthController } from "../../controllers/authControllers";
import { verifyAccessToken } from "../../middlewares/verifyAccessToken";

const authRouter = Router();

authRouter.get("/user_id", verifyAccessToken, AuthController.getUserId);

export default authRouter;
