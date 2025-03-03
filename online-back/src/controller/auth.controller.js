import bcrypt from "bcrypt";
import { User } from "../database/models/users.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/dataUri.js";
import { createToken } from "../utils/tokens/createToken.js";
const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, address, password, role } = req.body;
    if (!fullName || !email || !phone || !address || !password || !role) {
      throw new Error("All fields are required");
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let cloudResponse;
    const file = req.file;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    await User.create({
      fullName,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: file ? cloudResponse.secure_url : null,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User registration failed",
      error: error.message,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = createToken(user._id);

    const { password: _, ...userDetails } = user.toObject(); // Ensure to convert mongoose object to plain object

    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      user: userDetails,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User login failed",
      error: error.message,
      success: false,
    });
  }
};
const getAllUsers = async (req, res) => {
  const { page, size } = req.query;
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).json({
      message: "You must be an admin to view all users",
      success: false,
    });
  }
  try {
    const totalUsers = await User.find({ role: { $ne: "admin" } });
    const users = await User.find({ role: { $ne: "admin" } })
      .limit(size * 1)
      .skip((page - 1) * size)
      .exec();
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
      pagination: {
        total: totalUsers.length,
        perPage: +size,
        currentPage: +page,
        lastPage: Math.ceil(totalUsers.length / size),
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
export { getAllUsers, loginUser, registerUser };
