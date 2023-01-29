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
Object.defineProperty(exports, "__esModule", { value: true });
const author_service_1 = require("../src/components/author/author.service");
describe("sign up author", () => {
    test("enter details", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let req;
            expect(yield (0, author_service_1.signupAuthor)(req.body)).toBeDefined();
        }
        catch (e) {
            console.log(`jest error ${e}`);
        }
    }));
});
