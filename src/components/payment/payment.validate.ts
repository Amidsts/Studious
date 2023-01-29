import Joi from "joi"

import {
    validator
} from "../../utils/general"

export const makePaymentValidation = ( payload: {[key: string]: any}) => {

    return validator(Joi.object({
        Email: Joi.string().email().trim().required(),
        Name: Joi.string().trim().required(),
        Amount: Joi.number().required(),
        paymentType: Joi.string().valid("flutterwave", "paypal", "paystack", "Remita", "stripe")
    }), payload)
}