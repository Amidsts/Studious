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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getauthor = exports.getAuthors = exports.changePassword = exports.resetpassword = exports.resendPasswrdverificationCode = exports.enterverificationCode = exports.forgetpasswrd = exports.signinAdmin = exports.signupAdmin = void 0;
const adminService = __importStar(require("./admin.service"));
const general_1 = require("../../helpers/general");
// import { pagination } from "../../middlewares/pagination"
const signupAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminService.signUpAdmin(req.body);
        return res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
exports.signupAdmin = signupAdmin;
const signinAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminService.signInAdmin(req.body);
        return res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
exports.signinAdmin = signinAdmin;
const forgetpasswrd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminService.forgetPassword(req.body);
        return res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
exports.forgetpasswrd = forgetpasswrd;
const enterverificationCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminService.enterPasswordVerificationCode(req.body);
        return res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
exports.enterverificationCode = enterverificationCode;
const resendPasswrdverificationCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminService.resendverifiCationCode();
        return res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        return res.json(err);
        next(err);
    }
});
exports.resendPasswrdverificationCode = resendPasswrdverificationCode;
const resetpassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminService.resetPassword(req.body, req.params.adminId);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
exports.resetpassword = resetpassword;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminService.changepassword(req.body, req.params.adminId);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
exports.changePassword = changePassword;
const getAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paginate } = res.locals;
        const response = yield adminService.getAuthors(paginate.startIndex, paginate.limit, paginate.endIndex, paginate.next, paginate.prev);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
exports.getAuthors = getAuthors;
const getauthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminService.getAuthor(req.params.authorId);
        res.json((0, general_1.responseHandler)(response));
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
exports.getauthor = getauthor;
