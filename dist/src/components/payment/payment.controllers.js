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
exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
function paymentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, payment_service_1.makePayment)(req.body, req.params.userId);
            // let datas =""
            // res.on("data", (chunk)=> {
            //     datas += chunk
            //     console.log(datas)
            // })
            res.send(response);
            return;
        }
        catch (error) {
            return error;
        }
    });
}
exports.paymentController = paymentController;
