"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminchangePasswordValidate = exports.adminresetPasswordValidate = exports.adminForgetPasswordCodeValidate = exports.adminForgetPasswordValidate = exports.signInAdminValidate = exports.signUpAdminValidate = void 0;
const general_1 = require("../../utils/general");
const joi_1 = __importDefault(require("joi"));
const signUpAdminValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        firstName: joi_1.default.string().pattern(/[A-z]\S/).required(),
        lastName: joi_1.default.string().pattern(/[A-z]\S/).required(),
        phone: joi_1.default.string().pattern(/^0\d{10}$/).required(),
        email: joi_1.default.string().trim().required(),
        status: joi_1.default.string().trim().valid("active", "inactive"),
        password: joi_1.default.string().required()
    }), payload);
};
exports.signUpAdminValidate = signUpAdminValidate;
const signInAdminValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        email: joi_1.default.string().trim().required(),
        password: joi_1.default.string().required()
    }), payload);
};
exports.signInAdminValidate = signInAdminValidate;
const adminForgetPasswordValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        email: joi_1.default.string().trim().required()
    }), payload);
};
exports.adminForgetPasswordValidate = adminForgetPasswordValidate;
const adminForgetPasswordCodeValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        code: joi_1.default.string().alphanum().length(6).trim().required()
    }), payload);
};
exports.adminForgetPasswordCodeValidate = adminForgetPasswordCodeValidate;
const adminresetPasswordValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        code: joi_1.default.string().alphanum().length(6).trim().required(),
        newPassword: joi_1.default.string().required(),
        confirmPassword: joi_1.default.string().required()
    }), payload);
};
exports.adminresetPasswordValidate = adminresetPasswordValidate;
const adminchangePasswordValidate = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        oldPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string().required(),
        confirmPassword: joi_1.default.string().required()
    }), payload);
};
exports.adminchangePasswordValidate = adminchangePasswordValidate;
