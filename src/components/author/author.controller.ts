import {NextFunction, request, Request, Response} from "express"
import {UploadedFile} from "express-fileupload"
import fs from "fs" ;
import csv from "csv-parser"

// import { csvParser } from "../../utils/files"
import * as authorService from "../author/author.service"
import {responseHandler} from "../../helpers/general"
import { expectationFailedError } from "../../helpers/errors"


export const signUpAuthor = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const response = await authorService.signupAuthor(req.body)
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error)
        next(error)
    }
   
}
export const signInAuthor = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        // limitWrongPassword(req, res) 
        const response = await authorService.signinAuthor(req.body, res)
        
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const forgotPasswordEmail = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const response = await authorService.passwordVerificationEmail(req.body)
        
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const passwordVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const response = await authorService.enterPasswordVerificationCode(req.body)
         
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const resendPasswordVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const response = await authorService.resendVerificationCode()
         
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const resetpassword = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const response = await authorService.resetPassword(req.body, req.params.authorId)
         
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const changepassword = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const response = await authorService.changePassword(req.body, req.params.authorId)
         
         res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
}

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const response = await authorService.addbook(req.body, req.params.authorid)
        res.json(responseHandler(response))
    } catch (error) {
        res.json(error) 
        next(error)
    }
}

export const uploadImage = async (req: Request, res, next: NextFunction) => { 

    try {
        if (!req.files) {
            throw new expectationFailedError("select a file")
            // return
            
        }
        const response =await authorService.addImage(req.files.img, req.params.bookId)

        res.json(responseHandler(response)) 
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
} 


export const bulkBooksUpload = async (req: Request, res, next: NextFunction) => { 

    try {

        const results = []
    //upload csv file to temporary file path and get file path
    let filepath = ( (req.files.csvfile) as UploadedFile).tempFilePath
    //read csv file in bit/chunk and pass the content to a writeable csv()
    let readFile = fs.createReadStream(filepath).pipe(csv())
    .on("data", (data) => {
        results.push(data)
    })
    .on("end", async () => {
        const response = await authorService.bulkBookUpload(req.params.authorId, results)
        return res.json(responseHandler(response))
    })
    } catch (error) {
        res.json(error) 
        next(error)
    }
   
} 

//get books

export const getBooks = async (req: Request, res, next: NextFunction) => { 

    try {
        let {paginate} = res.locals

        const response = await authorService.books(paginate.startIndex, paginate.limit, paginate.endIndex, paginate.next, paginate.previous)

        return res.json(responseHandler(response))

    } catch (error) {
        res.json(error)  
        next(error) 
    }
   
}  