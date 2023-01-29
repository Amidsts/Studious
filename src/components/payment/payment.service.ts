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

        await initializeTransaction({
            Email,
            Amount,
            Name,
            transactionId: referenceId.toString()
        })

        await verifyTransaction(
            referenceId.toString()
        )
        
        
        const newPayment = {
            Email,
            Amount,
            paymentType: "paystack",
            userid: userId,
            transactionId: referenceId
        }
        
        
        return newPayment

    } catch (error) {
        return error
    }
} 