import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

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

    const interviews = await Interview.find({
        user: req.user._id,
    });

    const totalInterviews = interviews.length;

    const completedInterviews = interviews.filter(
        (interview) => interview.status === "Completed"
    ).length;

    const pendingInterviews = interviews.filter(
        (interview) => interview.status === "Pending"
    ).length;

    const totalScore = interviews.reduce(
        (sum, interview) => sum + interview.overallScore,
        0
    );

    const averageScore =
        completedInterviews === 0
            ? 0
            : Math.round(totalScore / completedInterviews);

    return apiResponse(
        res,
        200,
        true,
        "Dashboard statistics fetched successfully.",
        {
            totalInterviews,
            completedInterviews,
            pendingInterviews,
            averageScore,
        }
    );

});