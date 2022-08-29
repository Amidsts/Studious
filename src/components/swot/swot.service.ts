/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    authorizationError, conflictError, notFoundError,expectationFailedError, badRequestError
} from "../../helpers/errors"
import Swot from "./swot.model"
import swotAccess from "../authModel/auth.swot.model"
import {  
    signUpswotValidate,
    signInswotValidate,
    swotForgetPasswordValidate,
    swotForgetPasswordCodeValidate,
    swotresetPasswordValidate,
    swotchangePasswordValidate
} from "./swot.validate"
import { checkHash, hashpassword } from "../../helpers/general"
import { generateToken } from "../../utils/auth"
import { generateVerificationCode } from "../../utils/general"
import { DEL, GET, SETEX } from "../../utils/redis"
import book from "../books/books.model"
import cart from "../../model/cart.model"


export const signUpSwot = async(
    payload: { [ key : string ]: any }
) => {

    const {firstName, lastName, phone, email, password} = signUpswotValidate(payload)

    const SwotExist = await Swot.findOne( { email })

    if (SwotExist) {
        throw new authorizationError( "credentials already exists" )
    } 

    const newSwot = await new Swot({
        firstName,
        lastName,
        phone,
        email,
        status: "active"
    }).save() 

    const hashedPassword = hashpassword( password )

     await new swotAccess({
        SwotId: newSwot._id,
        password:  hashedPassword,
        lastLoggedIn: (new Date()).toUTCString()
    }).save()

    //send signUp mail
    // mailer(newSwot.email)
    return newSwot
}

export const signInSwot = async (payload: { [ key : string ]: any }) => {
    const { email, password } = signInswotValidate(payload)

    const SwotExists = await Swot.findOne({ email })

    if (!SwotExists) {
        throw new authorizationError("invalid credential")
    }
    const SwotSecret = await swotAccess.findOne({ SwotId: SwotExists._id})
    if ( !SwotSecret) {
        throw new notFoundError("there is a problem try again")
    }
    const comparePassword = checkHash(password,SwotSecret.password )

    if (!comparePassword) {
        throw new authorizationError("invalid credential")
    }

    //generateToken 
    const token = generateToken( {id:SwotExists._id} )

    await swotAccess.updateOne({
        lastLoggedIn : ( new Date() ).toUTCString()
    }) // update Swot last logged in date

    return {
        SwotExists,
        Token : token
    }
}

export const forgetPassword = async ( payload: {[ key : string ]: any} ) => {
    const { email } = swotForgetPasswordValidate(payload)

    const SwotExists = await Swot.findOne({ email })
    if (!SwotExists) {
        throw new authorizationError("invalid credential")
    }

    const Code = generateVerificationCode()
    await SETEX(`Swot password resetCode is: ${Code}`, Code)
    return {
        code: Code
    }
}

//supply verificationCode
export const enterPasswordVerificationCode = async (payload: {[ key : string ]: any}) => {
    const {code} = swotForgetPasswordCodeValidate(payload)

    const getCode = await GET(`Swot password resetCode is: ${code}`)

    if (!getCode) {
        throw new notFoundError("verification code is invalid or has expired")
    }
    return getCode
}

export const resendverifiCationCode = async () => {
    const Code = generateVerificationCode() 
    await SETEX(`Swot password resetCode is: ${Code}`, Code)
    return Code
}

export const resetPassword = async ( payload: {[ key : string ]: any}, SwotId ) => {
   const {code, newPassword, confirmPassword} = swotresetPasswordValidate(payload)

   if (newPassword !== confirmPassword) {
       throw new conflictError("password must be same")
   }
    const getSwot = await Swot.findOne({_id: SwotId})
    if (!getSwot) {
        throw new notFoundError("there is a problem please try again")
    }

    const hashedPassword = hashpassword(confirmPassword)

    const resetpassword = await swotAccess.updateOne({SwotId: SwotId}, {password: hashedPassword})
    if (!resetpassword) {
        throw new expectationFailedError("unable to update password for some reason, pls try again")
    }

    DEL(`Swot password resetCode is: ${code}`)

    return "password has been updated"
}

//protected route cont'd
//change password while online
export const changepassword = async ( payload: {[ key : string ]: any}, SwotId ) => {

     //collect Swot Id from jwtToken
   const SwotSecret = await swotAccess.findOne({SwotId: SwotId})

   if (!SwotSecret) {
       throw new authorizationError("you are not authorized")
   }
    const { oldPassword, newPassword, confirmPassword} = swotchangePasswordValidate(payload)

    // const oldPwdExist = await 
    const comparePassword = checkHash(oldPassword, SwotSecret.password)
    
    if ( !comparePassword ) {
        throw new badRequestError("incorrect password")
    }

    if (newPassword !== confirmPassword) {
        throw new conflictError("new password and confirmPasswoord must be same")
    }

    const changedPwd = hashpassword(confirmPassword)
    await swotAccess.updateOne({SwotId: SwotId}, {password: changedPwd})
    return "password has been changed successfully"
}

export const getBooks = async (page: number, Limit:number, endIndex: number, next: { [key: string] : any }, prev: { [key: string] : any }) => {
    const result : { [key: string] : any } = {} ;

    const books =  await book.find().sort({_id: -1}).skip(page).limit(Limit).exec()

    if (page > 0 ) {
        result.previousPage = prev
    }
    if ( endIndex < await book.find().count() ) {
        result.nextPage = next
    }

    result.Books = books
    // let result

    return {
        result
    }
}

export const getBook = async (bookId) => {
    const Book =  await book.findOne({_id: bookId})
    return Book
}

export const getBooksByCategory = async (Category, page: number, Limit:number, endIndex: number, next: { [key: string] : any }, prev: { [key: string] : any }) => {
    const result : { [key: string] : any } = {} ;

    const books =  await book.find({category : Category}).sort({_id: -1}).skip(page).limit(Limit).exec()

    if (page > 0 ) {
        result.previousPage = prev
    }
    if ( endIndex < await book.find().count() ) {
        result.nextPage = next
    }

    result.Books = books
    // let resul

    return {
        result
    }
}


export const createCart = async(
        swotId,
        {   adminId,
            bookId,
            quantity
        }:{ 
            adminId: string, 
            bookId:string,
            quantity: number
        } 
    ) => {

        try {
            const findBook = await book.findOne({ _id: bookId })

            if ( !findBook || findBook.status !== "available" ) {
                throw new notFoundError(
                    `${findBook.bookTitle} is not available`
                )
            } else {
                 const Cart = await cart.findOne({ swotId: swotId })
                 const bookPrice = quantity * findBook.price

                if ( Cart ) {
                    const bookIndex = Cart.cartItems.findIndex( book => book.bookId === bookId )

                    if ( bookIndex > -1 ) {
                        await cart.updateOne(
                            { "cartItems.bookId" : bookId },
                            {$set : {
                                    quantity,
                                    price: bookPrice
                            } }
                        )
                    } else {
                        await cart.updateOne(
                            { "cartItems": 1 },
                            { $push: {
                             
                                bookId,
                                quantity,
                                price: findBook.price
                            
                            },
                            $set: {
                                totalPrice : 
                            } }
                        )
                    }
                } else {
                    const newCart = new cart({
                        adminId,
                        swotId: swotId,
                        cartItems: [{
                            bookId,
                            quantity,
                            price: findBook.price
                        }],
                        totalPrice: ,
                        modifiedAt: Date.now
                    })
                }
                
            }

        }  catch (e) {
            return e
        }

        
        

        // const Cart = await cart.findOne({ swotId: swotId })

        // if ( Cart ) {
        //    const bookIndex = Cart.cartItems.findIndex( book => book.bookId === bookId )

        //    if ( bookIndex > -1 ) {
        //         const cartBook = Cart.cartItems[ bookIndex ]

        //         cartBook.quantity = quantity
        //         Cart.cartItems[bookIndex] = cartBook
        //    } else {
            
        //         Cart.push({ quantity, adminId, bookId, price: findBook.price })
        //    }
        // }
        }

//Swot get authors, get author , get swots, get swot

// 1) how to use eslint in nodejs, 2) how to use mongoose middleware 3)how does app.use and app.set() works in express