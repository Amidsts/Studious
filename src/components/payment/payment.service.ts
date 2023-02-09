import mongoose from "mongoose"
import { 
    makePaymentValidation 
} from "./payment.validate"


export async function makePayment(payload: {[key: string]: any}, userId: string) {
    
    try {

        const {
            Email,
            firstName,
            lastName,
            currency,
            Amount,
            paymentType
        }: {
            Email: string,
            firstName: string,
            lastName: string,
            currency: "NGN" | "USD" | "GHS" | "ZAR",
            Amount: number,
            paymentType: string
        } = makePaymentValidation(payload)
        
        const referenceId = (new mongoose.Types.ObjectId()).toString()
        console.log(paymentType);
        
        const initializePaymemnt =await require(`../../utils/paymentgateway/${paymentType}`)
        .default
        .initializeTransaction({
            user: {
                firstName,
                lastName,
                Email
            },
            Amount,
            currency,
            transactionId: referenceId
        })

        return initializePaymemnt

    } catch (error) {
        return error
    }
} 

export async function paymentCallback (paymentType: string, transactionId: string) {
    try {

       const response =await require(`../../utils/paymentgateway/${paymentType}`)
       .default
       .verifyTransaction(transactionId)

       return response

    } catch (error) {
        return error
    }
}