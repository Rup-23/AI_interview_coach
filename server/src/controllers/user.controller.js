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