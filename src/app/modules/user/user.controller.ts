import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { UserServices } from "./user.services";
import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";

// getAllUsers Controller
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

// getUserById Controller
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserServices.getUserById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});

export const UserControllers = {
    getAllUsers,
    getUserById,
};