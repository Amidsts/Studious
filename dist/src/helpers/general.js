"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationCode = exports.checkHash = exports.hashpassword = exports.responseHandler = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = __importDefault(require("bcrypt"));
const responseHandler = (payload, message = "success") => {
    return {
        success: true,
        message,
        data: payload || {}
    };
};
exports.responseHandler = responseHandler;
const hashpassword = (plainPassword) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(plainPassword, salt);
};
exports.hashpassword = hashpassword;
const checkHash = (plainPassword, hashedPassword) => {
    return bcrypt_1.default.compareSync(plainPassword, hashedPassword);
};
exports.checkHash = checkHash;
//generate 6 digit Code
const generateVerificationCode = () => {
    const token = 100000 + (Math.floor(Math.random() * 100000));
    return token;
};
exports.generateVerificationCode = generateVerificationCode;
