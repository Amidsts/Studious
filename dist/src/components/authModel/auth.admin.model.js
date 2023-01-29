"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminAuthSchema = new mongoose_1.Schema({
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "admin"
    },
    password: {
        type: String,
        min: 5,
        max: 10,
        required: true
    },
    lastLoggedIn: {
        type: Date
    },
    role: {
        type: String,
        default: "admin"
    }
}, { timestamps: true });
const adminAccess = (0, mongoose_1.model)("adminauth", adminAuthSchema);
exports.default = adminAccess;
