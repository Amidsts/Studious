"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addbookValidation = exports.changePasswordValidation = exports.resetpasswordValidation = exports.passwordVerificationCodelValidation = exports.passwordVerificationEmailValidation = exports.signInAuthorValidation = exports.signUpAuthorValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const general_1 = require("../../utils/general");
const signUpAuthorValidation = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        firstName: joi_1.default.string().replace(/\s/g, "").min(3).max(15),
        lastName: joi_1.default.string().replace(/\s/g, "").min(3).max(15).required(),
        gender: joi_1.default.string().trim().valid("male", "female"),
        email: joi_1.default.string().email().trim().required(),
        aboutAuthor: joi_1.default.string().trim().required(),
        country: joi_1.default.string().trim().required(),
        state: joi_1.default.string().trim().required(),
        city: joi_1.default.string().trim().required(),
        localGovt: joi_1.default.string().trim().required(),
        postalCode: joi_1.default.string().trim().required(),
        password: joi_1.default.string().trim().min(6).required()
    }), payload);
};
exports.signUpAuthorValidation = signUpAuthorValidation;
const signInAuthorValidation = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        email: joi_1.default.string().email().trim().required(),
        password: joi_1.default.string().trim().required()
    }), payload);
};
exports.signInAuthorValidation = signInAuthorValidation;
const passwordVerificationEmailValidation = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        email: joi_1.default.string().email().trim().required()
    }), payload);
};
exports.passwordVerificationEmailValidation = passwordVerificationEmailValidation;
const passwordVerificationCodelValidation = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        code: joi_1.default.string().alphanum().trim().length(6).required()
    }), payload);
};
exports.passwordVerificationCodelValidation = passwordVerificationCodelValidation;
const resetpasswordValidation = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        email: joi_1.default.string().trim().required(),
        code: joi_1.default.string().alphanum().trim().length(6).required(),
        newPassword: joi_1.default.string().trim().min(6).required(),
        confirmPassword: joi_1.default.string().trim().min(6).required()
    }), payload);
};
exports.resetpasswordValidation = resetpasswordValidation;
const changePasswordValidation = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        oldPassword: joi_1.default.string().trim().min(6).required(),
        newPassword: joi_1.default.string().trim().min(6).required(),
        confirmPassword: joi_1.default.string().trim().min(6).required()
    }), payload);
};
exports.changePasswordValidation = changePasswordValidation;
const addbookValidation = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        bookTitle: joi_1.default.string().trim().required(),
        description: joi_1.default.string().trim().required(),
        category: joi_1.default.string().trim().valid('Religion', 'Romantic', 'mystery').required(),
        price: joi_1.default.string().trim().required(),
        discountPrice: joi_1.default.string().trim().required(),
        status: joi_1.default.string().trim().valid("available", "soldOut"),
    }), payload);
};
exports.addbookValidation = addbookValidation;
// export const bulkbooksValidation = ( payload: Record<string, string | number>[]) => {
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
