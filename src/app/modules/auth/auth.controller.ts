import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import ApiError from "../../../error/apiError";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { User } from "@prisma/client";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await AuthServices.createUser(payload);
    if (!result){
        throw new ApiError( httpStatus.BAD_REQUEST, "User didn't create");
    }

    sendResponse( res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: result,
    });
});


export const AuthController = {
    createUser,
};
