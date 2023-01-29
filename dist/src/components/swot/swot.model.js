"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    books_purchased: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "book"
        }
    ],
    referralLink: {
        type: String
    },
    referredBy: {
        type: String
    },
    referralBonus: {
        type: String
    },
    commentsMade: [
        {
            type: String
        }
    ]
}, { timestamps: true });
const Swot = (0, mongoose_1.model)("swot", adminSchema);
exports.default = Swot;
