"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminAuthSchema = new mongoose_1.Schema({
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "swot"
    },
    password: {
        type: String,
        min: 5,
        max: 10,
        required: true
    },
    lastLoggedIn: {
        type: Date
    }
}, { timestamps: true });
const swotAccess = (0, mongoose_1.model)("swotauth", adminAuthSchema);
exports.default = swotAccess;
