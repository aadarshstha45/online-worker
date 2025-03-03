import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getCustomerJobs,
  getJob,
  updateJob,
} from "../controller/job.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { multiUpload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/create", multiUpload, requireAuth, createJob);
router.get("/customer", requireAuth, getCustomerJobs);
router.get("/allJobs", requireAuth, getAllJobs);
router.get("/:id", requireAuth, getJob);
router.put("/:id", multiUpload, requireAuth, updateJob);
router.patch("/:id", requireAuth, deleteJob);

export default router;
