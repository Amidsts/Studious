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
exports.mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporter = nodemailer_1.default.createTransport(
/*{
  service: "gmail",
  // secure: false,
  auth: {
    user: ENV.mailUrl,
    pass: ENV.mailPassword,
  },
}*/
);
// send mail with defined transport object
const mailer = (receiver) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let info = yield transporter.sendMail({
            from: 'noreply@me.com',
            to: receiver,
            subject: "Hello you now have an active account",
            html: "<b>Hello world</b>",
        });
    }
    catch (err) {
        console.log(err);
    }
    // console.log("mkf")
});
exports.mailer = mailer;
// transporter.sendMail()
console.log((0, exports.mailer)("oreeyomi@gmail.com"));
