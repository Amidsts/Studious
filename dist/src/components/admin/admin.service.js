"use strict";
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
exports.getSwot = exports.getAuthor = exports.getAuthors = exports.getAdmin = exports.changepassword = exports.resetPassword = exports.resendverifiCationCode = exports.enterPasswordVerificationCode = exports.forgetPassword = exports.signInAdmin = exports.signUpAdmin = void 0;
const errors_1 = require("../../helpers/errors");
const admin_model_1 = require("./admin.model");
const auth_admin_model_1 = __importDefault(require("../authModel/auth.admin.model"));
const admin_validate_1 = require("./admin.validate");
// import { date } from "joi"
const general_1 = require("../../helpers/general");
const auth_1 = require("../../utils/auth");
const general_2 = require("../../utils/general");
const redis_1 = require("../../utils/redis");
const author_model_1 = __importDefault(require("../author/author.model"));
const swot_model_1 = __importDefault(require("../swot/swot.model"));
const signUpAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, phone, email, password } = (0, admin_validate_1.signUpAdminValidate)(payload);
    const adminExist = yield admin_model_1.Admin.findOne({ email });
    if (adminExist) {
        throw new errors_1.authorizationError("admin already exists");
    }
    const newAdmin = yield new admin_model_1.Admin({
        firstName,
        lastName,
        phone,
        email,
        status: "active"
    }).save();
    const hashedPassword = (0, general_1.hashpassword)(password);
    yield new auth_admin_model_1.default({
        adminId: newAdmin._id,
        password: hashedPassword,
        lastLoggedIn: (new Date()).toUTCString()
    }).save();
    //send signUp mail
    // mailer(newAdmin.email)
    return newAdmin;
});
exports.signUpAdmin = signUpAdmin;
const signInAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = (0, admin_validate_1.signInAdminValidate)(payload);
    const adminExists = yield admin_model_1.Admin.findOne({ email });
    if (!adminExists) {
        throw new errors_1.authorizationError("invalid credential");
    }
    const adminSecret = yield auth_admin_model_1.default.findOne({ adminId: adminExists._id });
    if (!adminSecret) {
        throw new errors_1.notFoundError("there is a problem try again");
    }
    const comparePassword = (0, general_1.checkHash)(password, adminSecret.password);
    if (!comparePassword) {
        throw new errors_1.authorizationError("invalid credential");
    }
    //generateToken 
    const token = (0, auth_1.generateToken)({ id: adminExists._id, Role: adminSecret.role });
    yield auth_admin_model_1.default.updateOne({
        lastLoggedIn: (new Date()).toUTCString()
    }); // update admin last logged in date
    return {
        adminExists,
        Token: token
    };
});
exports.signInAdmin = signInAdmin;
const forgetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = (0, admin_validate_1.adminForgetPasswordValidate)(payload);
    const adminExists = yield admin_model_1.Admin.findOne({ email });
    if (!adminExists) {
        throw new errors_1.authorizationError("invalid credential");
    }
    const Code = (0, general_2.generateVerificationCode)();
    yield (0, redis_1.SETEX)(`admin password resetCode is: ${Code}`, Code);
    return {
        code: Code
    };
});
exports.forgetPassword = forgetPassword;
//supply verificationCode
const enterPasswordVerificationCode = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = (0, admin_validate_1.adminForgetPasswordCodeValidate)(payload);
    const getCode = yield (0, redis_1.GET)(`admin password resetCode is: ${code}`);
    if (!getCode) {
        throw new errors_1.notFoundError("verification code is invalid or has expired");
    }
    return getCode;
});
exports.enterPasswordVerificationCode = enterPasswordVerificationCode;
const resendverifiCationCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const Code = (0, general_2.generateVerificationCode)();
    yield (0, redis_1.SETEX)(`admin password resetCode is: ${Code}`, Code);
    return Code;
});
exports.resendverifiCationCode = resendverifiCationCode;
const resetPassword = (payload, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, newPassword, confirmPassword } = (0, admin_validate_1.adminresetPasswordValidate)(payload);
    if (newPassword !== confirmPassword) {
        throw new errors_1.conflictError("password must be same");
    }
    const getAdmin = yield admin_model_1.Admin.findOne({ _id: adminId });
    if (!getAdmin) {
        throw new errors_1.notFoundError("there is a problem please try again");
    }
    const hashedPassword = (0, general_1.hashpassword)(confirmPassword);
    const resetpassword = yield auth_admin_model_1.default.updateOne({ adminId: adminId }, { password: hashedPassword });
    if (!resetpassword) {
        throw new errors_1.expectationFailedError("unable to update password for some reason, pls try again");
    }
    (0, redis_1.DEL)(`admin password resetCode is: ${code}`);
    return "password has been updated";
});
exports.resetPassword = resetPassword;
//protected route cont'd
//change password while online
const changepassword = (payload, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    //collect admin Id from jwtToken
    const adminSecret = yield auth_admin_model_1.default.findOne({ adminId: adminId });
    if (!adminSecret) {
        throw new errors_1.authorizationError("you are not authorized");
    }
    const { oldPassword, newPassword, confirmPassword } = (0, admin_validate_1.adminchangePasswordValidate)(payload);
    // const oldPwdExist = await 
    const comparePassword = (0, general_1.checkHash)(oldPassword, adminSecret.password);
    if (!comparePassword) {
        throw new errors_1.badRequestError("incorrect password");
    }
    if (newPassword !== confirmPassword) {
        throw new errors_1.conflictError("new password and confirmPasswoord must be same");
    }
    const changedPwd = (0, general_1.hashpassword)(confirmPassword);
    yield auth_admin_model_1.default.updateOne({ adminId: adminId }, { password: changedPwd });
    return "password has been changed successfully";
});
exports.changepassword = changepassword;
const getAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findById(id);
    return admin;
});
exports.getAdmin = getAdmin;
//author
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAuthors = (page, Limit, endIndex, next, prev) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {};
    const authors = yield author_model_1.default.find().sort({ _id: -1 }).skip(page).limit(Limit).exec();
    if (page > 0) {
        result.previousPage = prev;
    }
    if (endIndex < (yield author_model_1.default.find().count())) {
        result.nextPage = next;
    }
    result.Authors = authors;
    // let resul
    return {
        result
    };
});
exports.getAuthors = getAuthors;
const getAuthor = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const Author = yield author_model_1.default.findById(authorId);
    return Author;
});
exports.getAuthor = getAuthor;
//swot
// const getSwots = async () => {
//     const authors =  await Swot.find().sort({_id: -1})
//     return authors
// }
const getSwot = (swotId) => __awaiter(void 0, void 0, void 0, function* () {
    const swot = yield swot_model_1.default.findById(swotId);
    return swot;
});
exports.getSwot = getSwot;
//admin get authors, get author , get swots, get swot
// 1) how to use eslint in nodejs, 2) how to use mongoose middleware 3)how does app.use and app.set() works in express
