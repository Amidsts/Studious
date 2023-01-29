import {
    Request, 
    Response
} from "express"
import path from "path"

import {
    makePayment
} from "./payment.service"


export async function paymentController (req: Request, res: Response) {
    try {
        const response = await makePayment(req.body, req.params.userId)
        // let datas =""

        // res.on("data", (chunk)=> {
        //     datas += chunk
        //     console.log(datas)
        // })
        res.send(response)
       return 
    } catch (error) {
        return error
    }
}