"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["female", "male"]
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended", "disabled"]
    },
    aboutAuthor: {
        type: String,
        required: true
    },
    address: {
        type: {
            country: String,
            state: String,
            city: String,
            localGovt: String,
            postalCode: String,
        },
        required: true
    },
    bookPublished: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "books"
        }
    ]
}, { timestamps: true });
const author = (0, mongoose_1.model)("authors", authorSchema);
exports.default = author;
