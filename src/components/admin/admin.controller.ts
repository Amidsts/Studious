import {NextFunction, Request, Response} from "express"
import * as adminService from "./admin.service"
import {responseHandler} from "../../helpers/general"
// import { pagination } from "../../middlewares/pagination"

export const signupAdmin = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await adminService.signUpAdmin(req.body)
        
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const signinAdmin = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await adminService.signInAdmin(req.body)
        
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const forgetpasswrd = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await adminService.forgetPassword(req.body)
        
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const enterverificationCode = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await adminService.enterPasswordVerificationCode(req.body)
        
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const resendPasswrdverificationCode = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await adminService.resendverifiCationCode()
        
        return res.json(responseHandler(response))
    } catch (err) {
       return res.json(err)
       next(err)
    }
   
}

export const resetpassword = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await adminService.resetPassword(req.body, req.params.adminId)
        
         res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await adminService.changepassword(req.body, req.params.adminId)
        
         res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const getAuthors = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const {paginate} = res.locals

        const response = await adminService.getAuthors(paginate.startIndex, paginate.limit,paginate.endIndex, paginate.next, paginate.prev)
        
         res.json(responseHandler(response))
    } catch (err) { 
        res.json(err)
        next(err)
    }
   
}

export const getauthor = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await adminService.getAuthor(req.params.authorId)
        
         res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}