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
exports.findBook = exports.createBook = void 0;
const books_model_1 = __importDefault(require("./books.model"));
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield new books_model_1.default({
        payload
    }).save();
    return newBook;
});
exports.createBook = createBook;
const findBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = yield books_model_1.default.findOne({ bookTitle: bookId });
    return bookData;
});
exports.findBook = findBook;
// export  const addBulkBooks = (Books: {[payload: string]: any}[]) => {
//         new book({
//             Books
//         })
//     }
