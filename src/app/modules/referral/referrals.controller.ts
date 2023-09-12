import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ReferralsService } from "./referrals.service";
import ApiError from "../../../error/apiError";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";

const createReferral = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ReferralsService.createReferral(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User didn't create");
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Referral created successfully",
    data: result,
  });
});

export const ReferralsController = {
    createReferral,
};
