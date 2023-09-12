import httpStatus from "http-status";
import ApiError from "../../../error/apiError";
import prisma from "../../../shared/prisma"
import { Prisma, User } from "@prisma/client";

const getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany({
      include: {
        deposits: true,
        referrals: true,
        referralIncomes: true,
        withdraws: true,
      },
    });
    if (users.length ==0) {
      throw new ApiError(httpStatus.NOT_FOUND, "No users found");
    }
    return users;
}

export const UserServices = {
    getAllUsers,
}