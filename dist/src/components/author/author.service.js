"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.findAuthor = exports.books = exports.bulkBookUpload = exports.addImage = exports.addbook = exports.changePassword = exports.resetPassword = exports.resendVerificationCode = exports.enterPasswordVerificationCode = exports.passwordVerificationEmail = exports.signinAuthor = exports.signupAuthor = void 0;
const author_model_1 = __importDefault(require("./author.model"));
const auth_1 = require("../../utils/auth");
// import {adminstatusENUM, bookStatusENUM} from "../../helpers/custom"
const auth_author_model_1 = __importDefault(require("../authModel/auth.author.model"));
const general_1 = require("../../helpers/general");
const errors_1 = require("../../helpers/errors");
const author_validation_1 = require("./author.validation");
const books_model_1 = __importDefault(require("../books/books.model"));
const general_2 = require("../../utils/general");
const redis_1 = require("../../utils/redis");
const cloudinary_config_1 = require("../../config/cloudinary.config");
//include log out api, for log out, access token has to be stored on redis, so we can delete it when a user log out of the website
const signupAuthor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, gender, email, aboutAuthor, country, state, city, localGovt, postalCode, password } = (0, author_validation_1.signUpAuthorValidation)(payload);
    try {
        const authorExist = yield author_model_1.default.findOne({ email });
        if (authorExist) {
            throw new errors_1.authorizationError("Author already exist");
            return;
        }
        const hashedPassword = (0, general_1.hashpassword)(password);
        const newauthor = yield new author_model_1.default({
            firstName,
            lastName,
            gender,
            email,
            status: "active",
            aboutAuthor,
            address: {
                country,
                state,
                city,
                localGovt,
                postalCode
            }
        }).save();
        yield new auth_author_model_1.default({
            author: newauthor._id,
            password: hashedPassword,
            lastLogin: (new Date()).toUTCString(),
            role: "author"
        }).save();
        //send signUp mail
        // mailer(newauthor.email)
        return newauthor;
    }
    catch (err) {
        return err;
    }
});
exports.signupAuthor = signupAuthor;
const signinAuthor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = (0, author_validation_1.signInAuthorValidation)(payload);
    const authorExist = yield author_model_1.default.findOne({ email });
    if (!authorExist) {
        throw new errors_1.notFoundError("invalid email or passsword");
    }
    const authorSecret = yield auth_author_model_1.default.findOne({ author: authorExist._id });
    const comparePassword = (0, general_1.checkHash)(password, authorSecret.password);
    // const isLoggedIn = authorSecret.isLoggedIn
    //use this for now
    if (comparePassword) {
        yield auth_author_model_1.default.updateOne({ password: authorSecret.password }, { isLoggedIn: true });
    }
    //use this for now
    if (!comparePassword) {
        throw new errors_1.notFoundError("invalid email or passsword");
    }
    if (!authorSecret) {
        throw new errors_1.notFoundError("invalid email or passsword");
    }
    if (authorExist.status !== "active") {
        throw new errors_1.badRequestError("account is disabled, suspended or inactive");
    }
    const Token = (0, auth_1.generateToken)({ id: authorExist._id, status: authorExist.status, role: authorSecret.role });
    return {
        id: authorExist._id,
        name: authorExist.firstName + " " + authorExist.lastName,
        token: Token
    };
});
exports.signinAuthor = signinAuthor;
//unprotected routes
//forgot password
//verify email route
const passwordVerificationEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = (0, author_validation_1.passwordVerificationEmailValidation)(payload);
    const emailExist = yield author_model_1.default.findOne({ email });
    if (!emailExist) {
        throw new errors_1.notFoundError("invalid credential");
    }
    //generate verificattion code
    const code = (0, general_2.generateVerificationCode)();
    //save verification code
    yield (0, redis_1.SETEX)(`authorVerificationcode_${code}`, code);
    //send verification code to user's mail
    return code;
});
exports.passwordVerificationEmail = passwordVerificationEmail;
//supply verificattion code and verify verificattion code
const enterPasswordVerificationCode = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = (0, author_validation_1.passwordVerificationCodelValidation)(payload);
    const codeExist = yield (0, redis_1.GET)(`authorVerificationcode_${code}`);
    if (!codeExist) {
        throw new errors_1.notFoundError("verification code is invalid or has expired");
    }
    return "codeExist";
});
exports.enterPasswordVerificationCode = enterPasswordVerificationCode;
//resend verificattion code
const resendVerificationCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const code = (0, general_2.generateVerificationCode)();
    yield (0, redis_1.SETEX)(`authorVerificationcode_${code}`, code);
    //send verification code to user's mail
    return code;
});
exports.resendVerificationCode = resendVerificationCode;
//reset password
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code, newPassword, confirmPassword } = (0, author_validation_1.resetpasswordValidation)(payload);
    if (newPassword !== confirmPassword) {
        throw new errors_1.badRequestError("password must be the same");
    }
    const author = yield author_model_1.default.findOne({ email });
    if (!author) {
        throw new errors_1.conflictError("there is a problem, pls try again");
    }
    const authoraccess = yield auth_author_model_1.default.updateOne({ author: author._id }, { password: newPassword });
    if (!authoraccess) {
        throw new errors_1.expectationFailedError("unable to update password for some reason, pls try again");
    }
    yield (0, redis_1.DEL)(`authorVerificationcode_${code}`);
    return "password has been updated";
});
exports.resetPassword = resetPassword;
//protected route continues
//change password while online
const changePassword = (payload, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, confirmPassword } = (0, author_validation_1.changePasswordValidation)(payload);
    const authoraccessCheck = yield auth_author_model_1.default.findOne({ author: authorId });
    if (!authoraccessCheck) {
        throw new errors_1.conflictError("there is a problem, pls try again");
    }
    const comparePassword = (0, general_1.checkHash)(oldPassword, authoraccessCheck.password);
    if (!comparePassword) {
        throw new errors_1.authorizationError("password does not exist");
    }
    if (newPassword !== confirmPassword) {
        throw new errors_1.badRequestError("password must be the same");
    }
    const hashedPassword = (0, general_1.hashpassword)(newPassword);
    const authoraccess = yield auth_author_model_1.default.updateOne({ author: authorId }, { password: hashedPassword });
    if (!authoraccess) {
        throw new errors_1.conflictError("unable to update password");
    }
    return "password has been updated successfully!";
});
exports.changePassword = changePassword;
//book
// author add one book
const addbook = (payload, authorid) => __awaiter(void 0, void 0, void 0, function* () {
    const bookExist = yield books_model_1.default.findOne({ bookTitle: payload.bookTitle, authorId: authorid });
    if (bookExist) {
        throw new errors_1.conflictError("book already exist");
    }
    // if (bookExist.authorId.status)
    const newBook = yield new books_model_1.default({
        authorId: authorid,
        bookTitle: payload.bookTitle,
        description: payload.description,
        category: payload.category,
        currency: payload.currency,
        price: payload.price,
        discountPrice: payload.discountPrice,
        bookSwot: payload.bookSwot,
        status: "available",
        categoryType: payload.categoryType
    }).save();
    return newBook;
});
exports.addbook = addbook;
//add book image
const addImage = (imgFile, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // const Path = path.join(__dirname, `../../upload/${image.name}`)
    const imageExist = yield books_model_1.default.findOne({ _id: bookId });
    const image = (imgFile);
    function updateImage(imgId, imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateBook = yield books_model_1.default.findOneAndUpdate({ _id: bookId }, { "img.imgId": imgId, "img.imgLink": imgUrl });
                if (!updateBook) {
                    throw new errors_1.expectationFailedError("book not found");
                }
                console.log(updateBook);
                return updateBook;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    try {
        if (imageExist.img.imgId !== "" || imageExist.img.imgLink !== "") {
            const uploadedImg = yield cloudinary_config_1.uploader.upload(image.tempFilePath, { public_id: imageExist.img.imgId });
            return yield updateImage(uploadedImg.public_id, uploadedImg.url);
        }
        else {
            const uploadedImg = yield cloudinary_config_1.uploader.upload(image.tempFilePath);
            return yield updateImage(uploadedImg.public_id, uploadedImg.url);
        }
    }
    catch (err) {
        throw new errors_1.conflictError(`unable to upload image, ${err.message}`);
    }
});
exports.addImage = addImage;
//add multiple books at once using csv file
const bulkBookUpload = (authorid, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDocuments = [];
        for (let i = 0; i < payload.length; i++) {
            const document = payload[i];
            const bookExist = yield books_model_1.default.findOne({ bookTitle: document.bookTitle, authorId: authorid });
            if (bookExist) {
                throw new errors_1.conflictError(`book named ${document.bookTitle} already exists`);
            }
            allDocuments.push({
                authorId: authorid,
                bookTitle: document.bookTitle,
                description: document.description,
                category: document.category,
                currency: "#",
                price: parseFloat(document.price),
                discountPrice: parseFloat(document.discountPrice || 0),
                status: document.status,
                recommended: Boolean(document.recommended),
                categoryType: document.categoryType
            });
        }
        const addBooks = yield books_model_1.default.insertMany(allDocuments);
        return addBooks;
    }
    catch (err) {
        return err;
    }
});
exports.bulkBookUpload = bulkBookUpload;
//get plenty books
const books = (offset, Limit, endIndex, next, previous) => __awaiter(void 0, void 0, void 0, function* () {
    const results = {};
    //count the number of books in the collection
    const booksCount = yield books_model_1.default.find().count();
    //get books in ascending order, skip n documents, determine the number documents to return
    const Books = yield books_model_1.default.find().sort({ _id: -1 }).skip(offset).limit(Limit).exec();
    //if offset is less than or equal to zero, there should be no prvious page
    if (offset > 0) {
        results.previousPage = previous;
    }
    //check if the endIndex is not greater than the documents number
    if (endIndex < booksCount) {
        results.nextPage = next;
    }
    results.Books = Books;
    return results;
});
exports.books = books;
//Author
const findAuthor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield author_model_1.default.findById(id);
        if (!author) {
            throw new errors_1.notFoundError("author does not exist");
        }
        return author;
    }
    catch (err) {
        return err;
    }
});
exports.findAuthor = findAuthor;
//get one book and 
//comment my code
//upload project to production, heroku and aws
//add ratings by swot on books
//password rate limiting and session to login on multiple devices
