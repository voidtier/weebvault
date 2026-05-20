import express from "express";
const router = express.Router();
import authentify from "../middlewares/authentication.middleware.js";

import { user_data_controller } from "./user.controller.js";

router.get("/user", authentify, user_data_controller);

export default router;
