import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import Resume from "../models/Resume.model.js";

export const uploadResume = asyncHandler(async (req, res) => {

  if (!req.file) {
    throw new ApiError(400, "Resume file is required");
  }

  const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

  if (!cloudinaryResponse) {
    throw new ApiError(500, "Resume upload failed");
  }

  const resume = await Resume.create({
    user: req.user._id,
    originalFileName: req.file.originalname,
    resumeUrl: cloudinaryResponse.secure_url,
  });

  return apiResponse(
    res,
    201,
    true,
    "Resume uploaded successfully",
    resume
  );

});