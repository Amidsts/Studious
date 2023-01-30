// import payment from "./payment.model"
import { 
    initializeTransaction,
    verifyTransaction 
} from "../../config/paymentTypes/paystck"
import { 
    makePaymentValidation 
} from "./payment.validate"
import mongoose from "mongoose"
// import Swot from "../swot/swot.model"

export async function makePayment(payload: {[key: string]: any}, userId: string) {
    
    try {

        const {
            Email,
            Amount,
            Name,
            paymentType
        }: {
            Email: string,
            Amount: number,
            paymentType: string,
            Name: string
        } = makePaymentValidation(payload)
        
        const referenceId = new mongoose.Types.ObjectId()

       const initializePaymemnt =  await initializeTransaction({
            Email,
            Amount,
            Name,
            transactionId: referenceId.toString()
        })

        return initializePaymemnt

    } catch (error) {
        return error
    }
} 

export async function paymentCallback (referenceId: string) {
    try {

       const response =  await verifyTransaction(referenceId)

       console.log(response);

       return response

    } catch (error) {
        return error
    }
}