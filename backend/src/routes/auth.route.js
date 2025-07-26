import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Not protected routes
router.route("/signup").post(signup);
router.route("/login").post(login);

// protected routes
router.route("/logout").post(protectRoute, logout);
router.route("/check-auth").get(protectRoute, checkAuth);
router.route("/update-profile").put(protectRoute, upload.single("profilePic"), updateProfile);

export default router;
