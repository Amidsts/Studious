import {NextFunction, Request, Response} from "express"
import fileUpload, { UploadedFile } from "express-fileupload"
import path from "path"

import * as adminService from "../author/author.service"
import {responseHandler} from "../../helpers/general"
import { uploader } from "../../config/cloudinary.config"
// import {limitWrongPassword} from "../../middlewares/ratelimiter"
// import dataUri from "datauri"

// import fs from "fs"
// import {Readable} from "stream"

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
        // limitWrongPassword(req, res) 
        const response = await adminService.signinAuthor(req.body, res)
        
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const forgotPasswordEmail = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const response = await adminService.passwordVerificationEmail(req.body.email)
        
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const passwordVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const response = await adminService.enterPasswordVerificationCode(req.body)
         
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const resendPasswordVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const response = await adminService.resendVerificationCode()
         
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const resetpassword = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const response = await adminService.resetPassword(req.body, req.params.authorId)
         
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const changepassword = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const response = await adminService.changePassword(req.body, req.params.authorId)
         
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const uploadImage = async (req: Request, res, next: NextFunction) => {

    try {

        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
            
          }
        const image  = (req.files.img) as UploadedFile
        const Path = path.join(__dirname, `../../upload/${image.name}`)
        
        uploader.upload(image.tempFilePath).then((result) => {
            res.json(result)
        }).catch(error => {
            console.log(`some ${error}`)
        })
   
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
} 
