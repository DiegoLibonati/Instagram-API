import { Router } from "express";

import authRoutes from "@src/routes/v1/auth.route";
import instagramRoutes from "@src/routes/v1/instagram.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/instagram", instagramRoutes);

export default router;
