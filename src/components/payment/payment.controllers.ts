import {
    Request, 
    Response
} from "express"

import {
    makePayment, paymentCallback
} from "./payment.service"


export async function initializePaymentController (req: Request, res: Response) {
    try {
        const response = await makePayment(req.body, req.params.userId)

        res.redirect(response.data.authorization_url)

    } catch (error) {
        return error
    }
}

export async function paymentCallbackController (req: Request, res: Response) {
    try {
        const response = await paymentCallback(req.query.reference as string)

        res.send(response)
       
    } catch (error) {
        return error
    }
}