import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getCurrentUser,getDashboardStats } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", verifyJWT, getCurrentUser);

router.get(
    "/dashboard-stats",
    verifyJWT,
    getDashboardStats
);

export default router;