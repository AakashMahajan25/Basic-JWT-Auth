import express from "express";
const router = express.Router();
import requireAuth from "../middlewares/requireAuth.js";

import {
  registerUser,
  loginUser,
  testRoute,
  refreshAccessToken,
  validate_token,
} from "../controllers/user.controller.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/test", requireAuth, testRoute);
router.post("/refresh-token", refreshAccessToken);
router.post("/validate-token", requireAuth, validate_token);

export default router;
