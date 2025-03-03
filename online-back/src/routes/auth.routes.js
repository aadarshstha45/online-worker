import { Router } from "express";
import { loginUser, registerUser } from "../controller/auth.controller.js";
import { singleUpload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register", singleUpload, registerUser);
router.post("/login", loginUser);

export default router;
