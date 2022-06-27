import {Request, Response} from "express"
import * as adminService from "./admin.service"
import {responseHandler} from "../../helpers/general"

export const signUpAdmin = async (req: Request, res: Response) => {

    try { 
        const response = await adminService.signUpAdmin(req.body)
        
         res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
    }
   
}