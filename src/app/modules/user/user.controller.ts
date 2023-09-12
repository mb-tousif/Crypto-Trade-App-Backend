import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { UserServices } from "./user.services";
import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

export const UserControllers = {
    getAllUsers,
};