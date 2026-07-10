import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "../config/cloudinary.js";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
      folder: "AI-Interview-Coach/Resumes",
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;