import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../error/apiError";
import httpStatus from "http-status";
import { hashPasswordHelper } from "../../../utils/hashPassword";

const createUser = async (payload: User) => {
  const isExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  
  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exist with this email"
    );
  }
  // Hash password
  payload.password = await hashPasswordHelper.hashPassword(payload.password);
  const user = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      contactNo: true,
      img: true,
      wallet: true,
    },
  });
  return user;
};

export const AuthServices = {
    createUser,
};
