"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authorAccessSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "author"
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: Date,
    isLoggedIn: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        default: "author"
    }
}, { timestamps: true });
const Auth = (0, mongoose_1.model)("authoraccess", authorAccessSchema);
exports.default = Auth;
