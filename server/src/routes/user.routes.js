import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", verifyJWT, getCurrentUser);

export default router;