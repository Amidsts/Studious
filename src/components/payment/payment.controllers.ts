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

        req.body.paymentType === "paystack" ? res.redirect(response.data.authorization_url)
        : req.body.paymentType === "flutterwave" ? res.redirect(response.data.link)
        : console.log("gbuh");
        

    } catch (error) {
        return error
    }
}

export async function paymentCallbackController (req: Request, res: Response) {
    try {
        const response = await paymentCallback( req.params.paymentType, req.params.transactionId )

        res.send(response)
       
    } catch (error) {
        return error
    }
}