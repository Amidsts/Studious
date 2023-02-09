import Joi from "joi"

import {
    validator
} from "../../utils/general"

export const makePaymentValidation = ( payload: {[key: string]: any}) => {

    return validator(Joi.object({
        Email: Joi.string().email().trim().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        Amount: Joi.number().required(),
        currency: Joi.string().valid("USD", "NGN", "ZAR", "GHS"),
        paymentType: Joi.string().valid("flutterwave", "paypal", "paystack", "Remita", "stripe").required()
    }), payload)
}