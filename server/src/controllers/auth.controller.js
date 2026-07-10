import jwt from "jsonwebtoken";
import env from "../config/env.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import User from "../models/User.model.js";


// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validation
  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // Create user
  const user = await User.create({
    fullName,
    email,
    password,
  });

  // Generate Tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save Refresh Token
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  // Remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return apiResponse(
    res,
    201,
    true,
    "User registered successfully",
    {
      user: createdUser,
      accessToken,
      refreshToken,
    }
  );
});


// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  // Find User
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Compare Password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  // Generate Tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save Refresh Token
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  // Remove sensitive fields
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return apiResponse(
    res,
    200,
    true,
    "Login successful",
    {
      user: loggedInUser,
      accessToken,
      refreshToken,
    }
  );
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return apiResponse(
    res,
    200,
    true,
    "Logout successful"
  );
});


// Refresh Access Token
export const refreshAccessToken = asyncHandler(async (req, res) => {

  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh Token is required");
  }

  const decodedToken = jwt.verify(
    refreshToken,
    env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Refresh Token is expired or used");
  }

  const accessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  user.refreshToken = newRefreshToken;

  await user.save({ validateBeforeSave: false });

  return apiResponse(
    res,
    200,
    true,
    "Access Token Refreshed Successfully",
    {
      accessToken,
      refreshToken: newRefreshToken,
    }
  );

});