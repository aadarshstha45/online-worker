import { Router } from "express";
import { getAllUsers } from "../controller/auth.controller.js";
import { allStats } from "../controller/stats.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import applicationRoutes from "./application.routes.js";
import authRoutes from "./auth.routes.js";
import jobRoutes from "./job.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/application", applicationRoutes);
router.use("/job", jobRoutes);
router.use("/stats", requireAuth, allStats);
router.use("/users", requireAuth, getAllUsers);

export default router;
