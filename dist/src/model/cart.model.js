"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Admin"
    },
    swotId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Swot"
    },
    cartItems: [{
            bookId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Books"
            },
            quantity: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 0,
                required: true
            }
        }],
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
});
const cart = (0, mongoose_1.model)("cart", cartSchema);
exports.default = cart;
