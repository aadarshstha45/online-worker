// utils/cloudStorage.js
import { v2 as cloudinary } from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../../config/env.js";

// Configure Cloudinary with your API keys (make sure to store these securely)
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export default cloudinary;
