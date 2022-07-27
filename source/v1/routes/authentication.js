import express from "express";
import {
  getLoginPage,
  login,
  getSignupPage,
  signup,
  logout,
} from "../../controllers/authentication.js";

const router = express.Router();

router.get("/signup", getSignupPage);
router.get("/login", getLoginPage);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
