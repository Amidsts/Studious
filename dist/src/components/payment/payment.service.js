"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = void 0;
// import payment from "./payment.model"
const paystck_1 = require("../../config/paymentTypes/paystck");
const payment_validate_1 = require("./payment.validate");
const mongoose_1 = __importDefault(require("mongoose"));
// import Swot from "../swot/swot.model"
function makePayment(payload, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Email, Amount, Name, paymentType } = (0, payment_validate_1.makePaymentValidation)(payload);
            const referenceId = new mongoose_1.default.Types.ObjectId();
            yield (0, paystck_1.initializeTransaction)({
                Email,
                Amount,
                Name,
                transactionId: referenceId.toString()
            });
            yield (0, paystck_1.verifyTransaction)(referenceId.toString());
            const newPayment = {
                Email,
                Amount,
                paymentType: "paystack",
                userid: userId,
                transactionId: referenceId
            };
            return newPayment;
        }
        catch (error) {
            return error;
        }
    });
}
exports.makePayment = makePayment;
