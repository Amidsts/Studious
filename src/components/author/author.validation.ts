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
        password: Joi.string().trim().min(6).required()
    }), payload )
} 

export const signInAuthorValidation = ( payload: { [key: string]: any}) => {
    return validator(Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required()
    }), payload )
} 

export const passwordVerificationEmailValidation = (payload: { [key: string]: any} ) => {
    return validator(Joi.object({
        email: Joi.string().email().trim().required()
    }), payload)
}

export const passwordVerificationCodelValidation = (payload: { [key: string]: any} ) => {

    return validator(Joi.object({
        code: Joi.string().trim().min(6).max(6).required()
    }), payload)
   
}

export const resetpasswordValidation = (payload: { [key: string]: any}) => {
    return validator(Joi.object({
        code: Joi.string().trim().min(6).max(6).required(),
        newPassword: Joi.string().trim().min(6).required(), 
        confirmPassword:Joi.string().trim().min(6).required()
    }), payload)
    
}

export const changePasswordValidation = (payload: { [key: string]: any}) => {

    return validator(Joi.object({
        oldPassword: Joi.string().trim().min(6).required(), 
        newPassword: Joi.string().trim().min(6).required(), 
        confirmPassword:Joi.string().trim().min(6).required()
    }), payload)
    
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

// export const bulkbooksValidation = ( payload: { [key: string]: any}[]) => {
//     return validator( Joi.array().items( Joi.object({
//         bookTitle: Joi.string().required(),
//         description : Joi.string().required(),
//         category: Joi.string().required(),
//         price: Joi.number().required().validate(price, ),
//         status: Joi.string().required(),
//         recommended: Joi.boolean().required(),
//         'category type': Joi.string().required(),
//     }) ), payload )
// }
