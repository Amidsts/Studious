"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorController = __importStar(require("./author.controller"));
const auth_1 = require("../../middlewares/auth");
const pagination_1 = require("../../middlewares/pagination");
const router = (0, express_1.Router)();
//unprotected APIs
router.post("/signUpAuthor", authorController.signUpAuthor);
router.post("/signInAuthor", authorController.signInAuthor);
router.post("/forgotPassword", authorController.forgotPasswordEmail);
router.post("/enterPasswordVerificationCode", authorController.passwordVerificationCode);
router.post("/resendPasswordVerificationCode", authorController.resendPasswordVerificationCode);
router.post("/resetPassword", authorController.resetpassword);
//protected APIs
router.post("/changePassword/:authorId", auth_1.validateAuthor, authorController.changepassword);
router.post("/uploadBook/:authorid", auth_1.validateAuthor, authorController.addBook);
router.post("/:bookId/uploadImage", authorController.uploadImage);
router.post("/:authorId/bulkUpload", authorController.bulkBooksUpload);
router.get("/books", auth_1.validateAuthor, pagination_1.pagination, authorController.getBooks);
router.get("/author/:authorId", authorController.getauthor);
exports.default = router;
