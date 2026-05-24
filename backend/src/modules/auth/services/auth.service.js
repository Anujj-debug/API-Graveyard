import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUserService = async ({
  username,
  email,
  password,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  };
};

export const loginUserService = async ({
  email,
  password,
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};
