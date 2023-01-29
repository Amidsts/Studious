import { Router } from "express"

import {
    paymentController
} from "./payment.controllers"

const router = Router()

router.post("/makepayment/:userId", paymentController)

export default router