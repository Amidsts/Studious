import Joi from "joi"
import { validator } from "../../utils/general"

export const signUpAuthorValidation = ( payload: { [key: string]: any}) => {
    return validator(Joi.object({
        firstName: Joi.string().replace(/\s/g, "").min(3).max(15),
        lastName: Joi.string().replace(/\s/g, "").min(3).max(15).required(),
        gender: Joi.string().trim().valid("male", "female"),
        email: Joi.string().email().trim().required(),
        aboutAuthor: Joi.string().trim().required(),
        country: Joi.string().trim().required(),
        state: Joi.string().trim().required(),
        city: Joi.string().trim().required(),
        localGovt: Joi.string().trim().required(),
        postalCode: Joi.string().trim().required(), 
        password: Joi.string().trim().required()
    }), payload )
} 

export const signInAuthorValidation = ( payload: { [key: string]: any}) => {
    return validator(Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required()
    }), payload )
} 

export const addbookValidation = ( payload: { [key: string]: any}) => {
    return validator(Joi.object({
        bookTitle: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        category: Joi.string().trim().valid('Religion', 'Romantic', 'mystery').required(),
        price: Joi.string().trim().required(),
        discountPrice: Joi.string().trim().required(),
        status: Joi.string().trim().valid("available", "soldOut"),
        
    }), payload )
} 