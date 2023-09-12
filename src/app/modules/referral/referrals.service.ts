import { Referral } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../error/apiError";
import httpStatus from "http-status";

const createReferral = async (payload:Referral) => {
  const { userId, referredBy, referralDeposit } = payload;
  // check if user exists
  const isExistingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  // check if referredBy user exists
  const isExistingReferralUser = await prisma.user.findUnique({
    where: {
      id: referredBy,
    },
  });
  // handle error if user does not exist
  if (!isExistingUser || !isExistingReferralUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
  }
  const referralWorks = await prisma.$transaction(async (transactionClient) => {
    // create referral
    const referral = await transactionClient.referral.create({
      data: {
        userId,
        referredBy,
        referralDeposit,
      },
    });
    // create referral income
    await transactionClient.referralIncome.create({
      data: {
        userId: referredBy,
        amount: referralDeposit * 0.5,
      },
    });

    // update user
    await transactionClient.user.update({
      where: {
        id: userId,
      },
      data: {
        deposit: {
          increment: referralDeposit,
        },
        wallet: {
          increment: referralDeposit,
        },
      },
    });
    // create Deposit
    await transactionClient.userDeposit.create({
      data: {
        userId,
        amount: referralDeposit,
      },
    });
    return referral;
  });
  return referralWorks;
};

export const ReferralsService = {
    createReferral,
};
