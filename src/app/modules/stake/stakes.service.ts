import { Stake } from "@prisma/client";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import ApiError from "../../../error/apiError";
import httpStatus from "http-status";

const startStaking = async (
  payload: {
    amount: number;
  },
  token: string
): Promise<Stake> => {
  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as string
  );
//   check enough balance have or not. if not then throw error or else decrement the balance from user table and deposit the amount in stake table
    const user = await prisma.user.findUnique({
        where: {
        id: decodedToken.id,
        },
    });
    if (Number(user?.deposit)< payload.amount) {
        throw new ApiError(httpStatus.NOT_FOUND, "User did not have enough found");
    }else{
        const user = await prisma.user.update({
            where: {
                id: decodedToken.id,
            },
            data: {
                deposit: {
                    decrement: payload.amount,
                },
            },
        });
    }
  const isExistUser = await prisma.stake.findFirst({
    where: {
      userId: decodedToken.id,
    },
  });
  if (isExistUser) {
    const stake = await prisma.stake.update({
        where: {
            id: isExistUser.id,
        },
        data: {
            amount: {
                increment: payload.amount,
            },
        },
        });
    return stake;
  }
  
  const stake = await prisma.stake.create({
    data: {
      amount: +payload.amount,
      userId: decodedToken.id,
    },
  });

  return stake;
};

export const StakesService = {
  startStaking,
};
