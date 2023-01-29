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
exports.verifyTransaction = exports.initializeTransaction = void 0;
const paystack_1 = __importDefault(require("paystack"));
const env_1 = require("../env");
const Paystack = (0, paystack_1.default)(env_1.PAYSTACK_SECRET_KEY);
function initializeTransaction({ Name, Email, Amount, transactionId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            name: Name,
            email: Email,
            amount: Amount,
            reference: transactionId
        };
        try {
            const initializePayment = yield Paystack.transaction.initialize(options);
            console.log(initializePayment);
            //    return initializePayment
        }
        catch (error) {
            // return error
            console.log(error);
        }
        // const params = JSON.stringify({
        //     "email": Email,
        //     "amount": amount
        // })
        // const options = {
        //     hostname: 'api.paystack.co',
        //     port: 443,
        //     path: '/transaction/initialize',
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        //         'Content-Type': 'application/json',
        //         'cache-control': 'no-cache'
        //     }
        // }
        // const req = https.request(options, res => {
        //     let data = ''
        //     res.on('data', (chunk) => {
        //         data += chunk
        //     });
        //     res.on('end', () => {
        //         console.log(JSON.parse(data))
        //     })
        // }).on('error', error => {
        //     console.error(error)
        // })
        // req.write(params)
        // req.end()
    });
}
exports.initializeTransaction = initializeTransaction;
function verifyTransaction(referenceId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const initializePayment = yield Paystack.transaction.verify(referenceId);
            console.log(initializePayment);
            //    return initializePayment
        }
        catch (error) {
            console.log(error);
            // return error
        }
        // const options = {
        //     hostname: 'api.paystack.co',
        //     port: 443,
        //     path: `/transaction/verify/:${referenceId}`,
        //     method: 'GET',
        //     headers: {
        //       Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        //       'Content-Type': 'application/json',
        //       'cache-control': 'no-cache'
        //     }
        // }
        // https.request(options, res => {
        //     let data = '' 
        //     res.on('data', (chunk) => {
        //         data += chunk
        //     });
        //     res.on('end', () => {
        //         console.log(JSON.parse(data))
        //     })
        // }).on('error', error => {
        //     console.error(error)
        // })
    });
}
exports.verifyTransaction = verifyTransaction;
