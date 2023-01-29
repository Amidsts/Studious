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

            console.log(initializePayment);
            
    //    return initializePayment

    } catch (error) {
        // return error
        console.log(error)
    }
    

    // const params = JSON.stringify({
    //     "email": Email,
    //     "amount": amount
    // })
    
    // const options = {
    //     hostname: 'api.paystack.co',
    //     port: 443,
    //     path: '/transaction/initialize',
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    //         'Content-Type': 'application/json',
    //         'cache-control': 'no-cache'
    //     }
    // }
    
    // const req = https.request(options, res => {
    //     let data = ''
    
    //     res.on('data', (chunk) => {

    //         data += chunk
    //     });
        
    //     res.on('end', () => {
            
    //         console.log(JSON.parse(data))
    //     })
    // }).on('error', error => {

    //     console.error(error)
    // })
    
    // req.write(params)
    // req.end()
}


export async function verifyTransaction (referenceId: string) {

    try {
       const initializePayment = await Paystack.transaction.verify(referenceId)

       console.log(initializePayment);
       
    //    return initializePayment

    } catch (error) {
        console.log(error)
        // return error
    }

    // const options = {
    //     hostname: 'api.paystack.co',
    //     port: 443,
    //     path: `/transaction/verify/:${referenceId}`,
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    //       'Content-Type': 'application/json',
    //       'cache-control': 'no-cache'
    //     }
    // }

    // https.request(options, res => {
    //     let data = '' 
    
    //     res.on('data', (chunk) => {
    //         data += chunk
    //     });
        
    //     res.on('end', () => {
    //         console.log(JSON.parse(data))
    //     })
    // }).on('error', error => {
    //     console.error(error)
    // })
}