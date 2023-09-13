import httpStatus from "http-status";
import ApiError from "../../../error/apiError";
import prisma from "../../../shared/prisma"
import { Prisma, User } from "@prisma/client";

// getAllUsers Service
const getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany({
      include: {
        deposits: true,
        referredBy: true,
        referredTo: true,
        referralIncomes: true,
        withdraws: true,
      },
    });
    if (users.length ==0) {
      throw new ApiError(httpStatus.NOT_FOUND, "No users found");
    }
    return users;
}

// getUserById Service
const getUserById = async (payload: string): Promise<User> => {
    const user = await prisma.user.findUnique({
      where: {
        id: payload,
      },
      include: {
        deposits: true,
        referredBy: true,
        referredTo: true,
        referralIncomes: true,
        withdraws: true,
      },
    });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
}

export const UserServices = {
    getAllUsers,
    getUserById,
}