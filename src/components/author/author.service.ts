import Author from "./author.model"
import { generateToken } from "../../utils/auth"
import {adminstatusENUM, bookStatusENUM} from "../../helpers/custom"
import authorAccess from "../authModel/auth.author.model"
import { hashpassword, checkHash } from "../../helpers/general"
import { authorizationError, notFoundError, badRequestError } from "../../helpers/errors"
import { signUpAuthorValidation, signInAuthorValidation } from "./author.validation"
import book from "../../model/books.model"


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

export const signinAuthor = async (payload: { [key:string] : any}) => {
    const {email, password} = signInAuthorValidation(payload)
    const authorExist  = await Author.findOne({email})
    if (!authorExist) {
        throw new notFoundError("invalid email or passsword")
    }

    const auhthorAccess = await authorAccess.findOne({author : authorExist._id})
    if (!auhthorAccess) {
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

// author one addbook
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