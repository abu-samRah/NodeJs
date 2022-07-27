import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { verifyToken } from "../helpers/auth.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  verifyToken(token, next, () => res.redirect("/api/v1/login"));
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
