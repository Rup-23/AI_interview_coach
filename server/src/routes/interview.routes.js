import express from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import {
    generateInterview,
    evaluateAnswer,
    completeInterview,
    getInterviewById,
    getInterviewHistory,
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
  
router.get(
    "/history",
    verifyJWT,
    getInterviewHistory
);

router.get(
    "/:interviewId",
    verifyJWT,
    getInterviewById
);




export default router;