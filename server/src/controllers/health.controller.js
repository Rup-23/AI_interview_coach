import apiResponse from "../utils/apiResponse.js";

export const healthCheck = (req, res) => {
  return apiResponse(
    res,
    200,
    true,
    "Backend is healthy"
  );
};