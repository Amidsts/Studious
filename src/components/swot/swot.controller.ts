import {NextFunction, Request, Response} from "express"
import * as SwotService from "./swot.service"
import {responseHandler} from "../../helpers/general"
// import { pagination } from "../../middlewares/pagination"

export const signupSwot = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await SwotService.signUpSwot(req.body)
        
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const signinSwot = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await SwotService.signInSwot(req.body)
        
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const forgetpasswrd = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await SwotService.forgetPassword(req.body)
        
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const enterverificationCode = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await SwotService.enterPasswordVerificationCode(req.body)
        
        return res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const resendPasswrdverificationCode = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await SwotService.resendverifiCationCode()
        
        return res.json(responseHandler(response))
    } catch (err) {
       return res.json(err)
       next(err)
    }
   
}

export const resetpassword = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await SwotService.resetPassword(req.body, req.params.SwotId)
        
         res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await SwotService.changepassword(req.body, req.params.SwotId)
        
         res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const getbooks = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const {paginate} = res.locals

        const response = await SwotService.getBooks(paginate.startIndex, paginate.limit,paginate.endIndex, paginate.next, paginate.prev)
        
         res.json(responseHandler(response))
    } catch (err) { 
        res.json(err)
        next(err)
    }
   
}

export const getbook = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const response = await SwotService.getBook(req.params.bookId)
        
         res.json(responseHandler(response))
    } catch (err) {
        res.json(err)
        next(err)
    }
   
}

export const getbooksBycategory = async (req: Request, res: Response, next: NextFunction) => {

    try { 
        const {paginate} = res.locals

        const response = await SwotService.getBooksByCategory(req.params.Category ,paginate.startIndex, paginate.limit,paginate.endIndex, paginate.next, paginate.prev)
        
         res.json(responseHandler(response))
    } catch (err) { 
        res.json(err)
        next(err)
    }
   
}