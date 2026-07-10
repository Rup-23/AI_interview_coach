import express from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import {
  generateInterview,
  evaluateAnswer,
  completeInterview,
} from "../controllers/interview.controller.js";

const router = express.Router();

router.post(
    "/generate",
    verifyJWT,
    generateInterview
);

router.post(
  "/evaluate-answer",
  verifyJWT,
  evaluateAnswer
);

router.post(
  "/complete",
  verifyJWT,
  completeInterview
);

export default router;