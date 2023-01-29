"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    authorId: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    currency: [{
            type: String
        }],
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: String
    },
    bookSwots: [{
            type: String,
        }],
    status: {
        type: String,
        enum: ["available", "sold out"],
        required: true
    },
    img: {
        imgId: {
            type: String,
            default: ""
        },
        imgLink: {
            type: String,
            default: ""
        }
    },
    recommended: {
        type: Boolean
    },
    ratings: {
        type: Number,
        default: 0
    },
    categoryType: {
        type: String,
        enum: ['religion', 'romance', 'mystery'],
        required: true
    }
}, { timestamps: true });
const book = (0, mongoose_1.model)("Books", bookSchema);
exports.default = book;
