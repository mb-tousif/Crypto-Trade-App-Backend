
import { z } from "zod";

const postValidation = z.object({
    body: z.object({
        userId: z.string({
            required_error: "User id is required"
        }).nonempty(),
        referralId: z.string({
            required_error: "Referral User id is required"
        }).nonempty(),
    })
});

const updateValidation = z.object({
    body: z.object({

    })
});

export const referralsValidation = {
    postValidation,
    updateValidation
}