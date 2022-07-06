import Author from "./author.model"
import { generateToken } from "../../utils/auth"
import {adminstatusENUM, bookStatusENUM} from "../../helpers/custom"
import authorAccess from "../authModel/auth.author.model"
import { hashpassword, checkHash } from "../../helpers/general"
import { 
        authorizationError, 
        notFoundError, 
        badRequestError,
        conflictError
    } from "../../helpers/errors"
import { 
        signUpAuthorValidation,
        signInAuthorValidation,
        passwordVerificationEmailValidation,
        passwordVerificationCodelValidation,
        resetpasswordValidation,
        changePasswordValidation
    } from "./author.validation"
import book from "../../model/books.model"
import { consecutivefailedPassword } from "../../middlewares/ratelimiter"
import {generateVerificationCode} from "../../helpers/general"
import {SETEX, GET, DEL} from "../../utils/redis"

import { Request, Response } from "express"


export const signupAuthor = async(
    payload: { [ key : string ]: any }
) => {
        
   const {firstName, lastName, gender, email, status,
    aboutAuthor, country, state, city, localGovt, postalCode, password} = signUpAuthorValidation(payload)

    try {
        const authorExist = await Author.findOne( { email: payload.email
        })  
          
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
            status: adminstatusENUM.ACTIVE,
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
            role : ["author"]
        }).save() 

        //send signUp mail
        // mailer(newauthor.email)
        return newauthor
    } catch (err) {
        return err
    }
}

export const signinAuthor = async (payload: { [key:string] : any}, res: Response) => {
    const {email, password} = signInAuthorValidation(payload)
    
    const authorExist  = await Author.findOne({email})
    if (!authorExist) {
        throw new notFoundError("invalid email or passsword")
    }

    const authorSecret =( await authorAccess.findOne({ author : authorExist._id}) )

    // console.log(authorSecret)
    const comparePassword = checkHash(password, authorSecret.password)
    

    const isLoggedIn = authorSecret.isLoggedIn

    // //use this for now
    // if (comparePassword) {
    //     await authorAccess.updateOne({password: authorSecret.password}, {isLoggedIn: true})
    // }
    // //use this for now
    // if(!comparePassword) {
    //     throw new notFoundError("invalid email or passsword")
    // }
    // console.log(`consecutive failed password in authorService without () ${consecutivefailedPassword}`)

    // console.log(`consecutive failed password in authorService with () ${consecutivefailedPassword}`)

    // const getConsumedPoint = await consecutivefailedPassword.get(`${password}`)
    // const getConsumedPoint = await consecutivefailedPassword(`${password}`)
    // console.log(`get consumed point here${getConsumedPoint}`)

    // if (comparePassword) {
    //     await authorAccess.updateOne({password: authorSecret.password, isLoggedIn: true})

    //     if (getConsumedPoint !== null && getConsumedPoint.consumedPoints > 0) {
    //         // Reset on successful authorisation console.log(`consecutive failed password in authorService without () ${consecutivefailedPassword}`)
    //         await consecutivefailedPassword.delete(password);

    //      }
    //     console.log("you have logged in successfully!")
    // }

    // if(!comparePassword) {
        
    //     consecutivefailedPassword.consume(password, 1)
    //     .then( val => {
    //         // console.log(val)
    //         // console.log(getConsumedPoint.consumedPoints)
    //         throw new notFoundError("invalid email or passsword")
    //     //    return val
    //     })
    //     .catch( err => {
            
    //         // console.log(err)
    //         if (err instanceof Error) {
    //             console.log(err)
    //            return 
               
    //         } else {
                
    //             res.set('Retry-After', String( Math.round(err.msBeforeNext / 1000) ) || "1");
                
    //            return res.status(429).send('Too Many Requests');
    //         }
           
    //     })
    // } 

    
    if (!authorSecret) {
        throw new notFoundError("invalid email or passsword")
    } 
 
    if (authorExist.status !== adminstatusENUM.ACTIVE) {
        throw new badRequestError("account is disabled, suspended or inactive")   
    }  

    const Token = generateToken({email:authorExist.email, status :authorExist.status})

    return {
        name : authorExist.firstName + " " + authorExist.lastName,
        token: Token
    }

}

//unprotected routes
//forgot password
//verify email route
export const passwordVerificationEmail = async ( payload: { [key: string]: any} ) => {
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
export const enterPasswordVerificationCode = async (payload: { [key: string]: any}) => {

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
export const resetPassword = async (payload: {[key: string] : any}, authorId: string) => {
    const {code, newPassword, confirmPassword} = resetpasswordValidation(payload)

    if ( newPassword !== confirmPassword) {
        throw new badRequestError("password must be the same")
    }

   const author = await Author.findOne({_id : payload.adminId})

   if (!author){
    throw new conflictError("there is a problem, pls try again")
   }

   const authoraccess = await authorAccess.updateOne({author: authorId}, {password : newPassword}, async (err, newPwd) => {

    if (err) return err ;

    await DEL(`verificationcode${code}`)
    return "password has been updated"
   })

}

//protected route continues
//change password while online
export const changePassword = async (payload : {[key: string] : any}, authorId) => {
    const {oldPassword, newPassword, confirmPassword} = resetpasswordValidation(payload)

    const author = await authorAccess.findOne({ _id: authorId })

   if (!author){
        throw new conflictError("there is a problem, pls try again")
   }

   const comparePassword = checkHash(oldPassword, author.password)

   if (!comparePassword) {
    throw new authorizationError("author does not exist")
   }

    if ( newPassword !== confirmPassword) {
        throw new badRequestError("password must be the same")
    }

   const authoraccess = await authorAccess.updateOne({author: payload._id}, {password : newPassword}, (err, newPwd) => {

    if (err) return err ;
    return "password has been updated"
   })
}


// author add one book
export const addbook  = async (payload: {[key: string] : any}, authorid: string) => {
    const bookExist = await book.findOne({bookTitle: payload.bookTitle, authorId: authorid})

    if (bookExist) {
        throw new authorizationError("book already exist")
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
        status: bookStatusENUM.AVAILABLE,
        img: payload.img,
        categoryType : payload.categoryType
    })
}

//add multiple books at once in csv file
//go to next page
//add ratings by swot on books
//rate limiting and session to login