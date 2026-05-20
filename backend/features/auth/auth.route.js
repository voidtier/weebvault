import express from "express";
const router = express.Router();
import {
  register_user_controller,
  login_user_controller,
} from "./auth.controller.js";

router.post("/register", register_user_controller);
router.post("/login", login_user_controller);

export default router;
