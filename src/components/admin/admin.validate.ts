import {validator } from "../../utils/general"
import joi from "joi"

export const signUpAdminValidate = (payload: Record<string, string | number>) => {
    return  validator(joi.object({
            firstName: joi.string().pattern(/[A-z]\S/).required(),
            lastName: joi.string().pattern(/[A-z]\S/).required(),
            phone: joi.string().pattern(/^0\d{10}$/).required(),
            email: joi.string().trim().required(),
            status: joi.string().trim().valid("active", "inactive"),
            password: joi.string().required()
        }),
        payload
        )
}

export const signInAdminValidate = (payload: Record<string, string | number>) => {
    return  validator(joi.object({
            email: joi.string().trim().required(),
            password: joi.string().required()
        }),
        payload
        )
}

export const adminForgetPasswordValidate = (payload: Record<string, string | number>) => {
    return  validator(joi.object({
            email: joi.string().trim().required()
        }),
        payload
        )
}

export const adminForgetPasswordCodeValidate = (payload: Record<string, string | number>) => {
    return  validator(joi.object({
            code: joi.string().alphanum().length(6).trim().required()
        }),
        payload
        )
}

export const adminresetPasswordValidate = (payload: Record<string, string | number>) => {
    return  validator(joi.object({
            code: joi.string().alphanum().length(6).trim().required(),
            newPassword: joi.string().required(),
            confirmPassword: joi.string().required()
        }),
        payload
        )
}

export const adminchangePasswordValidate = (payload: Record<string, string | number>) => {
    return  validator(joi.object({
            oldPassword: joi.string().required(),
            newPassword: joi.string().required(),
            confirmPassword: joi.string().required()
        }),
        payload
        )
}