import express from "express";

import authRoutes from "./auth.routes.js";
import { healthCheck } from "../controllers/health.controller.js";

const router = express.Router();

router.get("/", healthCheck);

router.use("/auth", authRoutes);

export default router;