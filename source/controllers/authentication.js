import User from "../models/user.js";
import { handleErrors } from "../utils/index.js";

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
    res.status(201).json(newUser);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
