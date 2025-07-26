import express from "express";
import { getMessages, getUsers, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/users").get(protectRoute, getUsers);
router.route("/send/:id").post(protectRoute, upload.single("image"), sendMessage);
router.route("/:id").get(protectRoute, getMessages);

export default router;
