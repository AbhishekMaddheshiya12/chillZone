import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadFilesToCloudinary } from "../utils/features.js";

dotenv.config();

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "User created successfully",
        user
      });
  } catch (error) {
    console.error("SignUp Error:", error);
    return res.status(500).json({
      success: false,
      message: "User not created",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "User not logged in",
    });
  }
};

const aboutMe = async (req, res) => {
  try {
    const userId = req.user;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Required middleware authentication",
      });
    }

    const details = await User.findOne({ _id: userId });
    return res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      details,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed To Fetch the data",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { name, email } = req.body;
    const avatar = req.file;

    console.log(name, email, avatar);

    if (!name && !email && !avatar) {
      return res.status(400).json({
        success: false,
        message: "Please provide any field",
      });
    }
    let files = [];
    if (avatar) files = [avatar];
    const user = await User.findById(userId);
    const result = await uploadFilesToCloudinary(files);

    console.log(result);

    if (name) user.name = name;
    if (email) user.email = email;
    if (files.length > 0) {
      user.avatar.url = result[0].url;
      user.avatar.public_id = result[0].public_id;
    }

    user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updataed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error in updating data",
    });
  }
};

const logOut = async (req, res) => {
  try {
    return res
      .status(201)
      .cookie("token", "", {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "User loggedOut successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to logOut",
    });
  }
};

export { signUp, login, aboutMe, updateProfile, logOut };
