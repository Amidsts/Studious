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
exports.createCart = exports.getBooksByCategory = exports.getBook = exports.getBooks = exports.changepassword = exports.resetPassword = exports.resendverifiCationCode = exports.enterPasswordVerificationCode = exports.forgetPassword = exports.signInSwot = exports.signUpSwot = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const errors_1 = require("../../helpers/errors");
const swot_model_1 = __importDefault(require("./swot.model"));
const auth_swot_model_1 = __importDefault(require("../authModel/auth.swot.model"));
const swot_validate_1 = require("./swot.validate");
const general_1 = require("../../helpers/general");
const auth_1 = require("../../utils/auth");
const general_2 = require("../../utils/general");
const redis_1 = require("../../utils/redis");
const books_model_1 = __importDefault(require("../books/books.model"));
const cart_model_1 = __importDefault(require("../../model/cart.model"));
const signUpSwot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, phone, email, password } = (0, swot_validate_1.signUpswotValidate)(payload);
    const SwotExist = yield swot_model_1.default.findOne({ email });
    if (SwotExist) {
        throw new errors_1.authorizationError("credentials already exists");
    }
    const newSwot = yield new swot_model_1.default({
        firstName,
        lastName,
        phone,
        email,
        status: "active"
    }).save();
    const hashedPassword = (0, general_1.hashpassword)(password);
    yield new auth_swot_model_1.default({
        SwotId: newSwot._id,
        password: hashedPassword,
        lastLoggedIn: (new Date()).toUTCString()
    }).save();
    //send signUp mail
    // mailer(newSwot.email)
    return newSwot;
});
exports.signUpSwot = signUpSwot;
const signInSwot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = (0, swot_validate_1.signInswotValidate)(payload);
    const SwotExists = yield swot_model_1.default.findOne({ email });
    if (!SwotExists) {
        throw new errors_1.authorizationError("invalid credential");
    }
    const SwotSecret = yield auth_swot_model_1.default.findOne({ SwotId: SwotExists._id });
    if (!SwotSecret) {
        throw new errors_1.notFoundError("there is a problem try again");
    }
    const comparePassword = (0, general_1.checkHash)(password, SwotSecret.password);
    if (!comparePassword) {
        throw new errors_1.authorizationError("invalid credential");
    }
    //generateToken 
    const token = (0, auth_1.generateToken)({ id: SwotExists._id });
    yield auth_swot_model_1.default.updateOne({
        lastLoggedIn: (new Date()).toUTCString()
    }); // update Swot last logged in date
    return {
        SwotExists,
        Token: token
    };
});
exports.signInSwot = signInSwot;
const forgetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = (0, swot_validate_1.swotForgetPasswordValidate)(payload);
    const SwotExists = yield swot_model_1.default.findOne({ email });
    if (!SwotExists) {
        throw new errors_1.authorizationError("invalid credential");
    }
    const Code = (0, general_2.generateVerificationCode)();
    yield (0, redis_1.SETEX)(`Swot password resetCode is: ${Code}`, Code);
    return {
        code: Code
    };
});
exports.forgetPassword = forgetPassword;
//supply verificationCode
const enterPasswordVerificationCode = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = (0, swot_validate_1.swotForgetPasswordCodeValidate)(payload);
    const getCode = yield (0, redis_1.GET)(`Swot password resetCode is: ${code}`);
    if (!getCode) {
        throw new errors_1.notFoundError("verification code is invalid or has expired");
    }
    return getCode;
});
exports.enterPasswordVerificationCode = enterPasswordVerificationCode;
const resendverifiCationCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const Code = (0, general_2.generateVerificationCode)();
    yield (0, redis_1.SETEX)(`Swot password resetCode is: ${Code}`, Code);
    return Code;
});
exports.resendverifiCationCode = resendverifiCationCode;
const resetPassword = (payload, SwotId) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, newPassword, confirmPassword } = (0, swot_validate_1.swotresetPasswordValidate)(payload);
    if (newPassword !== confirmPassword) {
        throw new errors_1.conflictError("password must be same");
    }
    const getSwot = yield swot_model_1.default.findOne({ _id: SwotId });
    if (!getSwot) {
        throw new errors_1.notFoundError("there is a problem please try again");
    }
    const hashedPassword = (0, general_1.hashpassword)(confirmPassword);
    const resetpassword = yield auth_swot_model_1.default.updateOne({ SwotId: SwotId }, { password: hashedPassword });
    if (!resetpassword) {
        throw new errors_1.expectationFailedError("unable to update password for some reason, pls try again");
    }
    (0, redis_1.DEL)(`Swot password resetCode is: ${code}`);
    return "password has been updated";
});
exports.resetPassword = resetPassword;
//protected route cont'd
//change password while online
const changepassword = (payload, SwotId) => __awaiter(void 0, void 0, void 0, function* () {
    //collect Swot Id from jwtToken
    const SwotSecret = yield auth_swot_model_1.default.findOne({ SwotId: SwotId });
    if (!SwotSecret) {
        throw new errors_1.authorizationError("you are not authorized");
    }
    const { oldPassword, newPassword, confirmPassword } = (0, swot_validate_1.swotchangePasswordValidate)(payload);
    // const oldPwdExist = await 
    const comparePassword = (0, general_1.checkHash)(oldPassword, SwotSecret.password);
    if (!comparePassword) {
        throw new errors_1.badRequestError("incorrect password");
    }
    if (newPassword !== confirmPassword) {
        throw new errors_1.conflictError("new password and confirmPasswoord must be same");
    }
    const changedPwd = (0, general_1.hashpassword)(confirmPassword);
    yield auth_swot_model_1.default.updateOne({ SwotId: SwotId }, { password: changedPwd });
    return "password has been changed successfully";
});
exports.changepassword = changepassword;
const getBooks = (page, Limit, endIndex, next, prev) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {};
    const books = yield books_model_1.default.find().sort({ _id: -1 }).skip(page).limit(Limit).exec();
    if (page > 0) {
        result.previousPage = prev;
    }
    if (endIndex < (yield books_model_1.default.find().count())) {
        result.nextPage = next;
    }
    result.Books = books;
    // let result
    return {
        result
    };
});
exports.getBooks = getBooks;
const getBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const Book = yield books_model_1.default.findOne({ _id: bookId });
    return Book;
});
exports.getBook = getBook;
const getBooksByCategory = (Category, page, Limit, endIndex, next, prev) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {};
    const books = yield books_model_1.default.find({ category: Category }).sort({ _id: -1 }).skip(page).limit(Limit).exec();
    if (page > 0) {
        result.previousPage = prev;
    }
    if (endIndex < (yield books_model_1.default.find().count())) {
        result.nextPage = next;
    }
    result.Books = books;
    // let resul
    return {
        result
    };
});
exports.getBooksByCategory = getBooksByCategory;
const createCart = (swotId, { adminId, bookId, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findBook = yield books_model_1.default.findOne({ _id: bookId });
        if (!findBook || findBook.status !== "available") {
            throw new errors_1.notFoundError(`${findBook.bookTitle} is not available`);
        }
        else {
            const Cart = yield cart_model_1.default.findOne({ swotId: swotId });
            const bookPrice = quantity * findBook.price;
            if (Cart) {
                const bookIndex = Cart.cartItems.findIndex(book => book.bookId === bookId);
                if (bookIndex > -1) {
                    yield cart_model_1.default.updateOne({ "cartItems.bookId": bookId }, { $set: {
                            quantity,
                            price: bookPrice
                        } });
                }
                else {
                    yield cart_model_1.default.updateOne({ "cartItems": 1 }, { $push: {
                            bookId,
                            quantity,
                            price: findBook.price
                        },
                        $set: {
                            totalPrice: 20
                        } });
                }
            }
            else {
                const newCart = new cart_model_1.default({
                    adminId,
                    swotId: swotId,
                    cartItems: [{
                            bookId,
                            quantity,
                            price: findBook.price
                        }],
                    totalPrice: 20,
                    modifiedAt: Date.now
                });
            }
        }
    }
    catch (e) {
        return e;
    }
    // const Cart = await cart.findOne({ swotId: swotId })
    // if ( Cart ) {
    //    const bookIndex = Cart.cartItems.findIndex( book => book.bookId === bookId )
    //    if ( bookIndex > -1 ) {
    //         const cartBook = Cart.cartItems[ bookIndex ]
    //         cartBook.quantity = quantity
    //         Cart.cartItems[bookIndex] = cartBook
    //    } else {
    //         Cart.push({ quantity, adminId, bookId, price: findBook.price })
    //    }
    // }
});
exports.createCart = createCart;
//Swot get authors, get author , get swots, get swot
// 1) how to use eslint in nodejs, 2) how to use mongoose middleware 3)how does app.use and app.set() works in express
