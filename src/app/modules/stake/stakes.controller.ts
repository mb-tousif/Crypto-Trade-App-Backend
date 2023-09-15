import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StakesService } from "./stakes.service";

const startStaking = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const token = req.headers.authorization
    const tok = await StakesService.startStaking(payload, token as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Staking started successfully",
        data: tok,
    });
});

export const StakesController = {
    startStaking,
};
