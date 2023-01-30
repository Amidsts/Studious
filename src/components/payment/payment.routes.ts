import { Router } from "express"

import {
    initializePaymentController, paymentCallbackController
} from "./payment.controllers"

const router = Router()

router.post("/makepayment/:userId", initializePaymentController)
router.get("/callback/payment", paymentCallbackController)

export default router