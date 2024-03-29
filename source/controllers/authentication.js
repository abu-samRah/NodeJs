import CONSTANTS from "../constants/index.js";
import User from "../models/user.js";
import { handleErrors, generateJWT, verifyToken } from "../helpers/auth.js";

export const getLoginPage = (req, res) => {
  const token = req.cookies.jwt;
  verifyToken(
    token,
    () => res.redirect("/"),
    () => res.render("login/index", { title: "Login" })
  );
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = generateJWT(user._id, user.email);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: CONSTANTS.JWT_MAX_AGE * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const getSignupPage = (req, res) => {
  const token = req.cookies.jwt;
  verifyToken(
    token,
    () => res.redirect("/"),
    () => res.render("signup/index", { title: "Signup" })
  );
};

export const signup = async (req, res) => {
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

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
