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
exports.getauthor = exports.getBooks = exports.bulkBooksUpload = exports.uploadImage = exports.addBook = exports.changepassword = exports.resetpassword = exports.resendPasswordVerificationCode = exports.passwordVerificationCode = exports.forgotPasswordEmail = exports.signInAuthor = exports.signUpAuthor = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
// import { csvParser } from "../../utils/files"
const authorService = __importStar(require("../author/author.service"));
const general_1 = require("../../helpers/general");
const errors_1 = require("../../helpers/errors");
const signUpAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield authorService.signupAuthor(req.body);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.signUpAuthor = signUpAuthor;
const signInAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // limitWrongPassword(req, res) 
        const response = yield authorService.signinAuthor(req.body);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.signInAuthor = signInAuthor;
const forgotPasswordEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield authorService.passwordVerificationEmail(req.body);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.forgotPasswordEmail = forgotPasswordEmail;
const passwordVerificationCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield authorService.enterPasswordVerificationCode(req.body);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.passwordVerificationCode = passwordVerificationCode;
const resendPasswordVerificationCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield authorService.resendVerificationCode();
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.resendPasswordVerificationCode = resendPasswordVerificationCode;
const resetpassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield authorService.resetPassword(req.body);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.resetpassword = resetpassword;
const changepassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield authorService.changePassword(req.body, req.params.authorId);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.changepassword = changepassword;
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield authorService.addbook(req.body, req.params.authorid);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.addBook = addBook;
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files) {
            throw new errors_1.expectationFailedError("select a file");
            // return
        }
        const response = yield authorService.addImage(req.files.img, req.params.bookId);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.uploadImage = uploadImage;
const bulkBooksUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = [];
        //upload csv file to temporary file path and get file path
        const filepath = (req.files.csvfile).tempFilePath;
        //read csv file in bit/chunk and pass the content to a writeable csv()
        fs_1.default.createReadStream(filepath).pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            results.push(data);
        })
            .on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield authorService.bulkBookUpload(req.params.authorId, results);
            return res.json((0, general_1.responseHandler)(response));
        }));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.bulkBooksUpload = bulkBooksUpload;
//get books
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paginate } = res.locals;
        const response = yield authorService.books(paginate.startIndex, paginate.limit, paginate.endIndex, paginate.next, paginate.previous);
        return res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.getBooks = getBooks;
const getauthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield authorService.findAuthor(req.params.authorId);
        return res.json((0, general_1.responseHandler)(response));
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
exports.getauthor = getauthor;
