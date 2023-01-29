"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ["flutterwave", "paypal", "paystack", "Remita", "stripe"],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
const payment = (0, mongoose_1.model)("payment", paymentSchema);
exports.default = payment;
