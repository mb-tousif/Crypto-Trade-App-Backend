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
  };
  // check if user has been referred before, if yes, throw error
  const isExistingReferral = await prisma.referral.findFirst({
    where: {
      userId: userId,
    },
  });
  if (isExistingReferral) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User has been referred before");
  };
  const referralWorks = await prisma.$transaction(async transactionClient => {
    // create referral income
    await transactionClient.referralIncome.create({
      data: {
        userId: referredBy,
        amount: referralDeposit * 0.05,
        referredTo: userId,
      },
    });

    // update user
    await transactionClient.user.update({
      where: {
        id: userId,
      },
      data: {
        deposit: {
          increment: referralDeposit - referralDeposit * 0.05,
        },
        wallet: {
          increment: referralDeposit - referralDeposit * 0.05,
        },
        role: ENUM_USER_ROLE.INVESTOR,
      },
    });
    // update referred user wallet
    await transactionClient.user.update({
      where: {
        id: referredBy,
      },
      data: {
        wallet: {
          increment: referralDeposit * 0.05,
        },
        referralReward: {
          increment: referralDeposit * 0.05,
        },
      },
    });
    // create Deposit
    await transactionClient.deposit.create({
      data: {
        userId,
        amount: referralDeposit,
      },
      include: {
        users: true,
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

// get all referrals
const getAllReferrals = async () => {
  const referrals = await prisma.referral.findMany({
    include: {
      users: true,
      referredByUser: true,
    },
  });
  return referrals;
};

// get referral by id
const getReferralById = async (paramId:string, user:any) => {
// check if user is not admin and not the owner of the referral
if (
    user.role !== ENUM_USER_ROLE.ADMIN &&
    user.id !== paramId
  ) {
      throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized to view this referral"
        );
      }
  const referral = await prisma.referral.findMany({
    where: {
      id: paramId,
    },
    include: {
      referredByUser: true,
      users: true,
    },
  });
  return referral;
};

export const ReferralsService = {
    createReferral,
    getAllReferrals,
    getReferralById,
};
