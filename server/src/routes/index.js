import express from "express";
import resumeRoutes from "./resume.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import { healthCheck } from "../controllers/health.controller.js"; 

const router = express.Router();

router.get("/", healthCheck);

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/resume", resumeRoutes);

export default router;