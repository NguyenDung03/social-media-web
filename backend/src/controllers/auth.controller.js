import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from "../lib/stream.js";

// SIGNUP CONTROLLER
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // tim email trong db
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // hasding password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();

      // Tạo user trên Stream
      try {
        await upsertStreamUser({
          id: savedUser._id.toString(),
          name: savedUser.fullName,
          image: savedUser.profilePic || "",
        });
        console.log(`Stream user created for ${savedUser.fullName}`);
      } catch (streamError) {
        console.error("Error creating Stream user:", streamError);
      }

      // Generate JWT token
      generateToken(newUser._id, res);

      // Send response to client
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      // Sử dụng setImmediate để chạy sau khi response đã gửi
      setImmediate(async () => {
        try {
          await sendWelcomeEmail(
            savedUser.email,
            savedUser.fullName,
            ENV.CLIENT_URL
          );
          console.log(`Welcome email sent to ${savedUser.email}`);
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
        }
      });
    }
  } catch (error) {
    console.log("error in signup controller : ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
      // never reveal which one is incorrect because anyone can use this info to hack
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " Internal Server error" });
  }
};

// LOGOUT CONTROLLER
export const logout = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

// UPDATE PROFILE CONTROLLER
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile picture is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json(updateUser);
  } catch (error) {
    console.log("error in updateProfile controller : ", error);
    res.status(500).json({ message: "Server error" });
  }
};
