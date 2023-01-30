import paystack from "paystack"

import https from "https"
import { PAYSTACK_SECRET_KEY } from "../env"

const Paystack = paystack(PAYSTACK_SECRET_KEY)


export async function initializeTransaction(
    {
        Name,
        Email,
        Amount,
        transactionId
        
    }:{
        Email: string,
        Amount: number,
        transactionId: string,
        Name: string
    }  
) {

    const options = {
        name: Name,
        email: Email,
        amount: Amount,
        reference: transactionId
    }

    try {
       const initializePayment = await Paystack.transaction.initialize(options)

            // console.log(initializePayment);
            
       return initializePayment

    } catch (error) {
        // return error
        console.log(error)
    }
}


export async function verifyTransaction (referenceId: string) {

    try {
       const initializePayment = await Paystack.transaction.verify(referenceId)

    //    console.log(initializePayment);
       
       return initializePayment

    } catch (error) {
        console.log(error)
        // return error
    }
}