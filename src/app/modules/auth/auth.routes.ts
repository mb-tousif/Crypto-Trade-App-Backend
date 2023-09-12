import express from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { authValidation } from "./authZodValidation";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
  "/register",
  ValidateRequest(authValidation.signupValidation),
  AuthController.createUser
);

export const authRoutes = router;
