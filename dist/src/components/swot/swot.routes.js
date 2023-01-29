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
const SwotController = __importStar(require("./swot.controller"));
const auth_1 = require("../../middlewares/auth");
const pagination_1 = require("../../middlewares/pagination");
const router = (0, express_1.Router)();
//add new Swot
router.post("/signUpSwot", SwotController.signupSwot);
router.post("/signInSwot", SwotController.signinSwot);
router.post("/forgetPassword", SwotController.forgetpasswrd);
router.post("/VerificationCode", SwotController.enterverificationCode);
router.post("/resendVerificationCode", SwotController.resendPasswrdverificationCode);
router.post("/resetPassword/:SwotId", SwotController.resetpassword);
router.post("/changePassword/:SwotId", auth_1.validateSwot, SwotController.changePassword);
router.get("/Books", auth_1.validateSwot, pagination_1.pagination, SwotController.getbooks);
router.get("/Book", auth_1.validateSwot, SwotController.getbook);
router.get("/Books/:Category", auth_1.validateSwot, pagination_1.pagination, SwotController.getbooksBycategory);
exports.default = router;
