import mongoose from "mongoose"
const Flutterwave= require("flutterwave-node-v3")

import {
    FLW_PUBLIC_KEY,
    FLW_SECRET_KEY,
    BASE_URL
} from "../../config/env"
import client from "../../helpers/client"
import {paymentOptions} from "../../helpers/customTypes"

const flw = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY)


class FlutterwaveTransction {
    initializeTransaction= ({
        user,
        Amount, 
        currency,
        transactionId
    }: paymentOptions) => {
        
        const response = client.post(
            "https://api.flutterwave.com/v3/payments",
            {
                customer: {
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.Email,
                },
                amount: Amount,
                currency,
                tx_ref: transactionId,
                redirect_url: `${BASE_URL}/v1/Payment/verifyPayment/paystack/${transactionId}`
            }
        )

        console.log("Flutterwave response" ,response);
        
        return response

    }

    verifyTransaction= () => {


    }
}

export default new FlutterwaveTransction()