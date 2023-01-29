"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePaymentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const general_1 = require("../../utils/general");
const makePaymentValidation = (payload) => {
    return (0, general_1.validator)(joi_1.default.object({
        Email: joi_1.default.string().email().trim().required(),
        Name: joi_1.default.string().trim().required(),
        Amount: joi_1.default.number().required(),
        paymentType: joi_1.default.string().valid("flutterwave", "paypal", "paystack", "Remita", "stripe")
    }), payload);
};
exports.makePaymentValidation = makePaymentValidation;
