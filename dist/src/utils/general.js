"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.generateVerificationCode = void 0;
const errors_1 = require("../helpers/errors");
const generateVerificationCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnoprstuvwxyz";
    let verificationCode = "";
    for (let i = 0; i < 6; i++) {
        const code = characters[Math.floor(Math.random() * characters.length)];
        verificationCode += code;
    }
    console.log(`verification code is ${verificationCode}`);
    return verificationCode;
};
exports.generateVerificationCode = generateVerificationCode;
const validator = (schema, inputObject) => {
    const validation = schema.validate(inputObject);
    const { error, value } = validation;
    if (error) {
        console.log(error);
        throw new errors_1.badRequestError(` ${value} ${error.message}`);
    }
    return value;
};
exports.validator = validator;
