import { Router } from "express"

import {
    initializePaymentController,
    paymentCallbackController
} from "./payment.controllers"

const router = Router()

router.post("/makePayment", initializePaymentController)
router.get("/verifyPayment/:paymentType/:transactionId", paymentCallbackController)

export default router