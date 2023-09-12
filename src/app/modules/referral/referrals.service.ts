import { Referral } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../error/apiError";
import httpStatus from "http-status";
import { ENUM_USER_ROLE } from "../../../enums";

const createReferral = async (payload:Referral) => {
  const { userId, referredBy, referralDeposit } = payload;
  // check if user exists
  const isExistingUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  // check if referredBy user exists
  const isExistingReferralUser = await prisma.user.findFirst({
    where: {
      id: referredBy,
    },
  });
  // handle error if user does not exist
  if (!isExistingUser || !isExistingReferralUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
  }
  const referralWorks = await prisma.$transaction(async transactionClient => {
    // create referral income
    await transactionClient.referralIncome.create({
      data: {
        userId: referredBy,
        amount: referralDeposit * 0.05,
      },
    });

    // update user
    await transactionClient.user.update({
      where: {
        id: userId,
      },
      data: {
        deposit: referralDeposit,
        wallet: referralDeposit,
        role: ENUM_USER_ROLE.STAKER,
      },
    });
    // create Deposit
    await transactionClient.deposit.create({
      data: {
        userId,
        amount: referralDeposit,
      },
    });
    // create referral
    const referral = await transactionClient.referral.create({
      data: payload,
    });
    return referral;
  });
  return referralWorks;
};

export const ReferralsService = {
    createReferral,
};
