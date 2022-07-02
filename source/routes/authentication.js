import express from "express";
import {
  login_get,
  login_post,
  signup_get,
  signup_post,
} from "../controllers/authentication.js";

const router = express.Router();

router.get("/signup", signup_get);
router.get("/login", login_get);
router.post("/signup", signup_post);
router.post("/login", login_post);

export default router;
