import {NextFunction, Request, Response} from "express"
import * as adminService from "../author/author.service"
import {responseHandler} from "../../helpers/general"


export const signUpAuthor = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const response = await adminService.signupAuthor(req.body)

         res.json(responseHandler(response))
    } catch (error) {
        res.json(error)
        next(error)
    }
   
}
export const signInAuthor = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const response = await adminService.signinAuthor(req.body)

         res.json(responseHandler(response))
    } catch (error) {
        res.json(error)
        next(error)
    }
   
}
