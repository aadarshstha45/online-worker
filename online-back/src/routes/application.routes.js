import { Router } from "express";
import {
  addApplication,
  getAllApplications,
  getMyApplications,
  updateApplication,
} from "../controller/application.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", requireAuth, addApplication);
router.get("/all", requireAuth, getAllApplications);
router.get("/myApplications", requireAuth, getMyApplications);
router.patch("/update/:id", requireAuth, updateApplication);

export default router;
