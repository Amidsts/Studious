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
const adminController = __importStar(require("./admin.controller"));
const auth_1 = require("../../middlewares/auth");
const pagination_1 = require("../../middlewares/pagination");
const router = (0, express_1.Router)();
//add new admin
router.post("/signUpAdmin", adminController.signupAdmin);
router.post("/signInAdmin", adminController.signinAdmin);
router.post("/forgetPassword", adminController.forgetpasswrd);
router.post("/VerificationCode", adminController.enterverificationCode);
router.post("/resendVerificationCode", adminController.resendPasswrdverificationCode);
router.post("/resetPassword/:adminId", adminController.resetpassword);
router.post("/changePassword/:adminId", auth_1.validateAdmin, adminController.changePassword);
router.get("/Authors", auth_1.validateAdmin, pagination_1.pagination, adminController.getAuthors);
router.get("/author/:authorId", auth_1.validateAdmin, adminController.getauthor);
//role base authentication from jwt
exports.default = router;
