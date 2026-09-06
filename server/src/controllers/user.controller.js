import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import Interview from "../models/Interview.model.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  return apiResponse(
    res,
    200,
    true,
    "Current User",
    req.user
  );
});

export const getDashboardStats = asyncHandler(async (req, res) => {

    const completedInterviews = await Interview.find({
        user: req.user._id,
        status: "Completed",
    })
        .select("role difficulty overallScore completedAt")
        .sort({ completedAt: -1 });

    const totalCompleted = completedInterviews.length;

    const totalScore = completedInterviews.reduce(
        (sum, interview) => sum + interview.overallScore,
        0
    );

    const averageScore =
        totalCompleted === 0
            ? 0
            : Math.round(totalScore / totalCompleted);

    const highestScore =
        totalCompleted === 0
            ? 0
            : Math.max(
                  ...completedInterviews.map((i) => i.overallScore)
              );

    const recentInterviews = completedInterviews.slice(0, 5);

    return apiResponse(
        res,
        200,
        true,
        "Dashboard statistics fetched successfully.",
        {
            totalCompleted,
            averageScore,
            highestScore,
            recentInterviews,
        }
    );

});