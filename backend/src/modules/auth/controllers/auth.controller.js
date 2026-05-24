import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerUserService, loginUserService } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

     const user = await registerUserService({
      username,
      email,
      password,
    });
    
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await loginUserService({
      email,
      password,
    });

    res.status(200).json({
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
};