"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swotchangePasswordValidate = exports.swotresetPasswordValidate = exports.swotForgetPasswordCodeValidate = exports.swotForgetPasswordValidate = exports.signInswotValidate = exports.signUpswotValidate = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const general_1 = require("../../utils/general");
const joi_1 = __importDefault(require("joi"));
const signUpswotValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        firstName: joi_1.default.string().pattern(/[A-z]\S/).required(),
        lastName: joi_1.default.string().pattern(/[A-z]\S/).required(),
        phone: joi_1.default.string().pattern(/^0\d{10}$/).required(),
        email: joi_1.default.string().trim().required(),
        status: joi_1.default.string().trim().valid("active", "inactive").required,
        password: joi_1.default.string().required()
    }), payload);
};
exports.signUpswotValidate = signUpswotValidate;
const signInswotValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        email: joi_1.default.string().trim().required(),
        password: joi_1.default.string().required()
    }), payload);
};
exports.signInswotValidate = signInswotValidate;
const swotForgetPasswordValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        email: joi_1.default.string().trim().required()
    }), payload);
};
exports.swotForgetPasswordValidate = swotForgetPasswordValidate;
const swotForgetPasswordCodeValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        code: joi_1.default.string().alphanum().length(6).trim().required()
    }), payload);
};
exports.swotForgetPasswordCodeValidate = swotForgetPasswordCodeValidate;
const swotresetPasswordValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        code: joi_1.default.string().alphanum().length(6).trim().required(),
        newPassword: joi_1.default.string().required(),
        confirmPassword: joi_1.default.string().required()
    }), payload);
};
exports.swotresetPasswordValidate = swotresetPasswordValidate;
const swotchangePasswordValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        oldPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string().required(),
        confirmPassword: joi_1.default.string().required()
    }), payload);
};
exports.swotchangePasswordValidate = swotchangePasswordValidate;
