import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import { healthCheck } from "../controllers/health.controller.js"; 

const router = express.Router();

router.get("/", healthCheck);

router.use("/auth", authRoutes);

router.use("/users", userRoutes);



export default router;