/* eslint-disable @typescript-eslint/no-explicit-any */

import Author from "./author.model"
import { generateToken } from "../../utils/auth"
// import {adminstatusENUM, bookStatusENUM} from "../../helpers/custom"
import authorAccess from "../authModel/auth.author.model"
import { hashpassword, checkHash } from "../../helpers/general"
import {
        authorizationError, 
        notFoundError, 
        badRequestError,
        conflictError,
        expectationFailedError
    } from "../../helpers/errors"
import { 
        signUpAuthorValidation,
        signInAuthorValidation,
        passwordVerificationEmailValidation,
        passwordVerificationCodelValidation,
        resetpasswordValidation,
        changePasswordValidation
    } from "./author.validation"
import book from "../books/books.model"
import {generateVerificationCode} from "../../utils/general"
import {SETEX, GET, DEL} from "../../utils/redis"
import {uploader} from "../../config/cloudinary.config"
import {UploadedFile} from "express-fileupload"


//include log out api, for log out, access token has to be stored on redis, so we can delete it when a user log out of the website
export const signupAuthor = async(
    payload: Record<string, string | number>
) => {
        
   const {firstName, lastName, gender, email,
    aboutAuthor, country, state, city, localGovt, postalCode, password} = signUpAuthorValidation(payload)

    try {
        const authorExist = await Author.findOne( { email })  
        
        if (authorExist) {
           throw new authorizationError("Author already exist")
            return
        } 
        
        const hashedPassword = hashpassword(password)
        const newauthor = await new Author({
            firstName,
            lastName,
            gender,
            email,
            status: "active",
            aboutAuthor,
            address: {
                country,
                state, 
                city,
                localGovt,
                postalCode
            } 
        }).save() ;

         await new authorAccess({
            author: newauthor._id,
            password: hashedPassword,
            lastLogin: (new Date()).toUTCString(),
            role : "author"
        }).save() 

        //send signUp mail
        // mailer(newauthor.email)
        return newauthor
    } catch (err) {
        return err
    }
}

export const signinAuthor = async (
    payload: Record<string, string | number>) => {
    const {email, password} = signInAuthorValidation(payload)
    
    const authorExist  = await Author.findOne({email})
    if (!authorExist) {
        throw new notFoundError("invalid email or passsword")
    }

    const authorSecret = await authorAccess.findOne({ author : authorExist._id}) 

    const comparePassword = checkHash(password, authorSecret.password)

    // const isLoggedIn = authorSecret.isLoggedIn

    //use this for now
    if (comparePassword) {
        await authorAccess.updateOne({password: authorSecret.password}, {isLoggedIn: true})
    }
    //use this for now
    if(!comparePassword) {
        throw new notFoundError("invalid email or passsword")
    }

    if (!authorSecret) {
        throw new notFoundError("invalid email or passsword")
    } 
 
    if (authorExist.status !== "active") {
        throw new badRequestError("account is disabled, suspended or inactive")   
    }  

    const Token = generateToken({id:authorExist._id, status :authorExist.status, role: authorSecret.role})

    return {  
        id: authorExist._id,
        name : authorExist.firstName + " " + authorExist.lastName,
        token: Token
    }

}

//unprotected routes
//forgot password
//verify email route
export const passwordVerificationEmail = async ( payload: Record<string, string | number> ) => {
    const {email} = passwordVerificationEmailValidation(payload)
    const emailExist = await Author.findOne({ email})
    if (!emailExist) {
        throw new notFoundError("invalid credential")
    }

//generate verificattion code
    const code = generateVerificationCode() 

    //save verification code
    await SETEX(`authorVerificationcode_${code}`, code)

    //send verification code to user's mail
    return code
} 

//supply verificattion code and verify verificattion code
export const enterPasswordVerificationCode = async (payload: Record<string, string | number>) => {

    const {code} = passwordVerificationCodelValidation(payload)

    const codeExist = await GET(`authorVerificationcode_${code}`)
    if (!codeExist) {
         throw new notFoundError("verification code is invalid or has expired")
    }

    return "codeExist"
}

//resend verificattion code
export const resendVerificationCode = async () => {
    const code = generateVerificationCode()

    await SETEX(`authorVerificationcode_${code}`, code)
    //send verification code to user's mail
    return code
}

//reset password
export const resetPassword = async (payload: Record<string, string | number>) => {
    const {email,code, newPassword, confirmPassword} = resetpasswordValidation(payload)

    if ( newPassword !== confirmPassword) {
        throw new badRequestError("password must be the same")
    }

   const author = await Author.findOne({email})

   if (!author){ 
    throw new conflictError("there is a problem, pls try again")
   }

   const authoraccess = await authorAccess.updateOne({author: author._id} , {password : newPassword})

    if (!authoraccess) {
        throw new expectationFailedError("unable to update password for some reason, pls try again")
    }

    await DEL(`authorVerificationcode_${code}`) 

    return "password has been updated"

}

//protected route continues
//change password while online
export const changePassword = async (payload : Record<string, string | number>, authorId) => {
    const {oldPassword, newPassword, confirmPassword} = changePasswordValidation(payload)

    const authoraccessCheck = await authorAccess.findOne({ author: authorId })
    
   if (!authoraccessCheck){
        throw new conflictError("there is a problem, pls try again")
   }

   const comparePassword = checkHash(oldPassword, authoraccessCheck.password)

   if (!comparePassword) {
    throw new authorizationError("password does not exist") 
   }

    if ( newPassword !== confirmPassword) {
        throw new badRequestError("password must be the same")
    }

    const hashedPassword = hashpassword(newPassword)

   const authoraccess = await authorAccess.updateOne({author: authorId}, {password : hashedPassword})

   if (!authoraccess) {
       throw new conflictError("unable to update password")
   }

   return "password has been updated successfully!"
}


//book
// author add one book
export const addbook  = async (payload: Record<string, string | number>, authorid: string) => {

    const bookExist = await book.findOne({bookTitle: payload.bookTitle, authorId: authorid})

    if (bookExist) {
        throw new conflictError("book already exist")
    }  

    // if (bookExist.authorId.status)

    const newBook = await new book({
        authorId : authorid,
        bookTitle: payload.bookTitle,
        description:payload.description,
        category: payload.category,
        currency: payload.currency,
        price : payload.price,
        discountPrice:payload.discountPrice,
        bookSwot: payload.bookSwot,
        status: "available",
        categoryType : payload.categoryType
    }).save()

    return newBook

}

//add book image
export const addImage = async (imgFile, bookId) => {
    // const Path = path.join(__dirname, `../../upload/${image.name}`)
    const imageExist = await book.findOne({_id: bookId})

    const image  = (imgFile) as UploadedFile

    async function updateImage(imgId, imgUrl) {

        try {
            const updateBook = await book.findOneAndUpdate({_id: bookId}, {"img.imgId": imgId,"img.imgLink": imgUrl})
            if (!updateBook) {
                throw new expectationFailedError("book not found") 
            } 
            console.log(updateBook)
            return updateBook
            
        } catch (err) {
            console.log(err)
            return err
        }
        
    }
    
    try {
       
        if (imageExist.img.imgId !== "" || imageExist.img.imgLink !== "") {
    
            const uploadedImg = await uploader.upload( image.tempFilePath, {public_id:  imageExist.img.imgId} )
            
           return await updateImage(uploadedImg.public_id ,uploadedImg.url)
        } else {
            const uploadedImg = await uploader.upload( image.tempFilePath )
            
            return await updateImage( uploadedImg.public_id, uploadedImg.url )
        }
    
    } catch (err) {
         throw new conflictError(`unable to upload image, ${err.message}`)
    }

}

//add multiple books at once using csv file
export const bulkBookUpload = async (authorid: string, payload: {[key: string]: any}[] ) => {

    try {
        
        const allDocuments = [] 

        for ( let i = 0; i < payload.length; i++) {
            const document = payload[i]

            const bookExist = await book.findOne({bookTitle: document.bookTitle, authorId: authorid})

            if ( bookExist ) {

                throw new conflictError(`book named ${document.bookTitle} already exists`)
            }

            allDocuments.push({
                authorId: authorid,
                bookTitle: document.bookTitle,
                description: document.description,
                category: document.category,
                currency: "#",
                price: parseFloat(document.price),
                discountPrice: parseFloat(document.discountPrice || 0),
                status: document.status,
                recommended: Boolean( document.recommended ) ,
                categoryType: document.categoryType
            })
        }

        const addBooks = await book.insertMany(allDocuments)

        return addBooks
    } catch (err) {
        return err
    }
}


//get plenty books
export const books = async (offset: number, Limit: number, endIndex: number, next?:  Record<string, string | number> , previous?: { [key: string]: any }) => {

    const results : { [key: string]: any } =  {}

   //count the number of books in the collection
    const booksCount = await book.find().count()

     //get books in ascending order, skip n documents, determine the number documents to return
     const Books = await book.find().sort({_id : -1}).skip( offset ).limit(Limit).exec()

    //if offset is less than or equal to zero, there should be no prvious page
    if ( offset > 0 ) {
        results.previousPage = previous
    }

    //check if the endIndex is not greater than the documents number
    if ( endIndex < booksCount ) {
        results.nextPage = next
    }  
 
    results.Books = Books 

    return results
} 


//Author
export const findAuthor = async (id: string) => {
    try {
       const author = await Author.findById(id)
       if (!author) {
        throw new notFoundError("author does not exist")
       }
       return author
    } catch (err) {
        return err
    }
}

//get one book and 
//comment my code
//upload project to production, heroku and aws
//add ratings by swot on books
//password rate limiting and session to login on multiple devices