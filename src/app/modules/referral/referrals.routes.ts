import express from "express";
import { ReferralsController } from "./referrals.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { ReferralsValidation } from "./referrals.zod.validation";
import AuthPermission from "../../middleware/authPermission";
import { ENUM_USER_ROLE } from "../../../enums";

const router = express.Router();
router.post(
  "/createReferral",
  AuthPermission(ENUM_USER_ROLE.ADMIN),
  ValidateRequest(ReferralsValidation.postValidation),
  ReferralsController.createReferral
);

export const referralsRoutes = router;
