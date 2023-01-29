"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controllers_1 = require("./payment.controllers");
const router = (0, express_1.Router)();
router.post("/makepayment/:userId", payment_controllers_1.paymentController);
exports.default = router;
