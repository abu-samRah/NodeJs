import CONSTANTS from "../constants/index.js";
import User from "../models/user.js";
import { handleErrors, generateJWT } from "../utils/index.js";

export const login_get = (req, res) => {
  res.render("login/index", { title: "Login" });
};

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
};

export const signup_get = (req, res) => {
  res.render("signup/index", { title: "Signup" });
};

export const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });
    const token = generateJWT(newUser._id, newUser.email);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: CONSTANTS.JWT_MAX_AGE * 1000,
    });
    res.status(201).json({ user: newUser._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
