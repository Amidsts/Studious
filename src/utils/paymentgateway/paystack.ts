import paystack from "paystack"

import { paymentOptions } from "../../helpers/customTypes"
import { 
    PAYSTACK_SECRET_KEY,
    BASE_URL 
} from "../../config/env"



const Paystack = paystack(PAYSTACK_SECRET_KEY)

class Transaction {

    initializeTransaction= async (
        {
            user,
            Amount, 
            currency,
            transactionId
        }: paymentOptions
    ) => {
    
        const options = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.Email,
            amount: Amount,
            currency,
            reference: transactionId,
            callback_url: `${BASE_URL}/v1/Payment/verifyPayment/paystack/${transactionId}`
        }
    
        try {

            const initializePayment= await Paystack.transaction.initialize(options)
            
            return initializePayment
    
        } catch (error) {
            
            return error
        }
    }

    verifyTransaction= async (referenceId: string) => {
        try {

            const verifyPayment = await Paystack.transaction.verify(referenceId)
            
            return verifyPayment
    
        } catch (error) {
            
            return error
        }
    }
}

export default new Transaction()

